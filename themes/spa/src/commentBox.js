let React = require('react');
let dataProvider = require('./dataProvider.js');

let Pagination = React.createClass({
  handleClick(e) {
    e.preventDefault();
    let pageNumber = e.target.getAttribute("data-pagenumber");
    if (parseInt(pageNumber) == this.props.currentPage) {
      return false;
    }
    this.props.onPageChanged(pageNumber);
  },
  render() {
    return (
      <div className="pagination">
        {(()=> {
          let items = [];
          for (let i = 0; i < this.props.total; i++) {
            let className = (this.props.currentPage === i) ? "pagination-item currentPage" : "pagination-item";
            items.push(<a
              key={i}
              className={className} 
              href="#" 
              data-pagenumber={i}
              onClick = {this.handleClick}
              >{i+1}</a>
            );
          }
          return items;
        })()}
      </div>
    );
  }
});

let CommentStatistics = React.createClass({
  rawMarkup() {
    let pagenavText, text;
    if (this.props.commentListType === 1) {
      pagenavText = this.props.lang.PAGE_NAV;
      text = pagenavText ? pagenavText.replace('{num_of_post}', this.props.total).replace('{num_of_page}', this.props.pagenum) : '';
    } else if (this.props.commentListType === 2) {
      if ( this.props.total ) {
        pagenavText = this.props.lang.SEARCH_FOUND;
        text = pagenavText ? pagenavText.replace('{result_num}', this.props.total) : '';
      } else {
        text = this.props.lang.SEARCH_NOTFOUND;
      }
    }
    return { __html: text };
  },
  render() {
    return (
      <div className="statistics">
        {(this.props.commentListType === 2) ? <a href="javascript:void(0)" onClick={this.props.onCloseSearch}>Close</a> : ''}
        <p dangerouslySetInnerHTML={this.rawMarkup()} />
        { (!parseInt(this.props.appConfig.page_on) || this.props.commentListType !== 1) ? '' :
          <Pagination 
            onPageChanged={this.props.onPageChanged} 
            currentPage = {this.props.currentPage}  
            appConfig={this.props.appConfig}
            commentListType={this.props.commentListType}
            total={Math.ceil(this.props.total/this.props.appConfig.num_perpage)} 
          />
        }
      </div>
    );
  }
});

let CommentList = React.createClass({
  render() {
    let lang = this.props.lang,
        searchText = this.props.searchText,
        appConfig = this.props.appConfig,
        isSearchResult = this.props.commentListType === 2;

    let createCommentNodes = function(comment) {
      let text = isSearchResult ? comment.post_content.replace(searchText, "<span class='keyword'>" + searchText + "</span>") : comment.post_content;
      return (
        <Comment
          key={comment.id}
          appConfig={appConfig}
          data = {comment}
          lang = {lang}>
          {text}
        </Comment>
      );
    };
    return (
      <div className="commentList">
        {this.props.data.map(createCommentNodes)}
      </div>
    );
  }
});

let Reply = React.createClass({
  rawMarkup() {
    let mapObj = {
      '{admin_name}': this.props.appConfig.admin,
      '{reply_time}': this.props.date,
      '{reply_content}': this.props.content
    };
    return { __html: yuanjs.replaceAll(this.props.lang.ADMIN_REPLIED, mapObj) };
  },
  render() {
    return (<div className="reply" dangerouslySetInnerHTML={this.rawMarkup()}></div>);
  }
});

let Comment = React.createClass({
  rawMarkup() {
    return { __html: this.props.children.toString() };
  },
  rawAuthorMarkup() {
    return { __html: parseInt(this.props.data.uid) ? this.props.data.b_username : this.props.data.uname};
  },
  render() {    
    return (
      <div className="comment">
        <span className="commentAuthor" dangerouslySetInnerHTML={this.rawAuthorMarkup()}></span> 
        <span className="commentDate">{this.props.data.time}</span>
        <div className="commentText">
         <p dangerouslySetInnerHTML={this.rawMarkup()} />
        </div>
        {this.props.data.reply_content ? <Reply
          appConfig={this.props.appConfig}
          lang={this.props.lang}
          content={this.props.data.reply_content}
          date={this.props.data.reply_time}
          /> : null
        }
      </div>
    );
  }
});

let Captcha = React.createClass({
  refreshCaptch(e) {
    e.preventDefault();
    this.refresh();
  },
  refresh() {
    let img = this.refs.captchaImg;
    let url = img.getAttribute('data-src');
    img.src = url + '&v=' + Math.random();
  },
  render() {
    return (
      <tr>
        <th>{this.props.lang.CAPTCHA}</th>
        <td><input ref="captchaInput" type="text" value={this.props.valid_code} onChange={this.props.onCaptchaChange} />
            <img className="captchaImg" ref="captchaImg" src="index.php?action=captcha" data-src="index.php?action=captcha" onClick={this.refreshCaptch} alt="Captcha" title={this.props.lang.CLICK_TO_REFRESH} />
        </td>
      </tr>
    );
  }
});

let CommentForm = React.createClass({
  getInitialState() {
    return {userInputType: 'text', labelContent: "", username: 'anonymous', text: '', valid_code: ''};
  },
  componentWillReceiveProps(nextProps) {
    let computedState = {};
    let propUser = nextProps.user;
    switch (propUser.user_type) {
      case "admin" :
      case "regular":
        computedState.userInputType = "hidden";
        computedState.username = propUser.username;
        computedState.labelContent = propUser.username;
        break;
      case "guest":
      default:
        computedState.userInputType = "text";
        computedState.username = 'anonymous';
        computedState.labelContent = '';
        break;
    }
    this.setState(computedState);
  },
  handleSubmit(e) {
    e.preventDefault();
    let author = this.state.username.trim(),
        text = this.state.text.trim(),
        valid_code = this.state.valid_code.trim();
    if (!author || !text) return;
    
    this.setState({ valid_code: ''});
    this.refs.captcha && this.refs.captcha.refresh();
    
    dataProvider.createPost({ user: author, content: text, valid_code}, res => {
        if (res.statusCode !== 200) {
          alert(res.response);
          return;
        }
        // Clear the text in the textarea.
        this.setState({text:''});
        this.props.onCommentCreated();
    });
    return false;
  },
  handleUsernameChange(e) {
    this.setState({username: e.target.value});
  },
  handleTextChange(e) {
    this.setState({text: e.target.value});
  },
  handleCaptchaChange(e) {
    this.setState({valid_code: e.target.value});
  },
  render() {
    return (
      <form onSubmit={this.handleSubmit} className="commentForm" role="search">
        <table>
          <tbody>
            <tr>
              <th>{this.props.lang.NICKNAME}</th>
              <td>
                <input 
                  ref="user" 
                  type={this.state.userInputType} 
                  maxLength="10" 
                  value={this.state.username}
                  onChange={this.handleUsernameChange} />
                <label htmlFor="user">{this.state.labelContent}</label>
              </td>
            </tr>
            <tr>
              <th>{this.props.lang.CONTENT}</th>
              <td><textarea ref="content" onChange={this.handleTextChange} value={this.state.text}></textarea></td>
            </tr>
            {
              (this.props.appConfig.valid_code_open == 1) ?
                <Captcha
                  ref="captcha"
                  valid_code={this.state.valid_code}
                  lang={this.props.lang}
                  onCaptchaChange={this.handleCaptchaChange}
                /> : null
            }
            <tr>
              <td>&nbsp;</td>
              <td>
                <input className="btn btn-default" name="submit" type="submit" value={this.props.lang.SUBMIT} />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    );
  }
});
    
let CommentBox = React.createClass({
  render() {
    var props = {
      commentListType: this.props.commentListType,
      lang: this.props.lang,
      appConfig: this.props.appConfig
    }
    return (
      <div className="commentBox">
        <h1>{this.props.lang.WELCOME_POST}</h1>
        <CommentList
          {...props}
          data={this.props.comments}
          searchText={this.props.searchText}
        />
        <CommentStatistics
          {...props}
          onCloseSearch={this.props.onCloseSearch}
          onPageChanged={this.props.onPageChanged}
          total={this.props.commentsTotalNumber} 
          currentPage = {this.props.currentPage}
          pagenum={this.props.appConfig.page_on ? Math.ceil(this.props.commentsTotalNumber/this.props.appConfig.num_perpage) : 1} />
        {
          this.props.commentListType !== 1 ? '' :
          <CommentForm
            {...props}
            ref="commentForm"
            user={this.props.user} 
            onCommentCreated={this.props.onCommentCreated}
          />
        }
        
      </div>
    );
  }
});
module.exports = CommentBox;
