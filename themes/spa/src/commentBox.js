var React = require('react');
    
var CloseSearchButton = React.createClass({
  render: function() {
    return (
      <a href="javascript:void(0)" onClick={this.props.onCloseSearch}>Close</a>
    );
  }
});

var PaginationItem = React.createClass({
  handleClick: function(e) {
    e.preventDefault();
    var pageNumber = e.target.getAttribute("data-pagenumber");
    console.log("You chosed the page number: ", pageNumber);
    if (parseInt(pageNumber) == this.props.currentPage) {
      console.log('The same page , we do nothing...');
      return false;
    }
    this.props.onPageChanged(pageNumber);
    return false;
  },
  render: function() {
    return (
      <a 
        className={(() => { if (this.props.currentPage === this.props.pageNumber) { return "pagination-item currentPage" } else { return "pagination-item"}})()} 
        href="javascript:void(0);" 
        data-pagenumber={this.props.pageNumber}
        onClick = {this.handleClick}
        >{this.props.text}</a>
    );
  }
});

var Pagination = React.createClass({
  render: function() {
    if(!this.props.appConfig.page_on || this.props.commentListType !== 1) {
      return null;
    }
    var items = [];
    for (var i = 0; i < this.props.total; i++) {
      items.push(<PaginationItem onPageChanged={this.props.onPageChanged} currentPage={this.props.currentPage} pageNumber={i} text={i+1} key={i} />);
    }
    return (
      <div className="pagination">
        {items}
      </div>
    );
  }
});

var CommentStatistics = React.createClass({
  rawMarkup: function() {
    var pagenavText, text;
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
  render: function() {
    var closeSearchBtn = (this.props.commentListType === 2) ? <CloseSearchButton onCloseSearch={this.props.onCloseSearch} /> : '';
    return (
      <div className="statistics">
        {closeSearchBtn}
        <p dangerouslySetInnerHTML={this.rawMarkup()} />
        <Pagination 
          onPageChanged={this.props.onPageChanged} 
          currentPage = {this.props.currentPage}  
          appConfig={this.props.appConfig}
          commentListType={this.props.commentListType}
          total={Math.ceil(this.props.total/this.props.appConfig.num_perpage)} 
        />
      </div>
    );
  }
});

var CommentList = React.createClass({
  render: function() {
    var lang = this.props.lang,
        searchText = this.props.searchText,
        appConfig = this.props.appConfig,
        isSearchResult = this.props.commentListType === 2;

    var createCommentNodes = function(comment) {
      var text = isSearchResult ? comment.post_content.replace(searchText, "<span class='keyword'>" + searchText + "</span>") : comment.post_content;
      return (
        <Comment
          appConfig={appConfig}
          uid={comment.uid}
          b_username={comment.b_username}
          author={comment.uname}
          key={comment.id}
          reply_content = {comment.reply_content}
          reply_time = {comment.reply_time}
          time={comment.time}
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

var Reply = React.createClass({
  rawMarkup: function() {
    // TODO: Get the actual admini user name.
    return { __html: this.props.lang.ADMIN_REPLIED.replace('{admin_name}', this.props.appConfig.admin)
                      .replace('{reply_time}', this.props.date)
                      .replace('{reply_content}', this.props.content)};
  },
  render: function() {
    return this.props.content ? (<div className="reply" dangerouslySetInnerHTML={this.rawMarkup()}></div>) : null;
  }
});

var Comment = React.createClass({
  rawMarkup: function() {
    return { __html: this.props.children.toString() };
  },
  rawAuthorMarkup: function() {
    return { __html: this.props.uid ? this.props.b_username : this.props.author};
  },
  render: function() {    
    return (
      <div className="comment">
        <span className="commentAuthor" dangerouslySetInnerHTML={this.rawAuthorMarkup()}></span> 
        <span className="commentDate">{this.props.time}</span>
        <div className="commentText">
         <p dangerouslySetInnerHTML={this.rawMarkup()} />
        </div>
        <Reply appConfig={this.props.appConfig} lang={this.props.lang} content={this.props.reply_content} date={this.props.reply_time} />
      </div>
    );
  }
});

var Captcha = React.createClass({
  refreshCaptch: function(e) {
    e.preventDefault();
    this.refresh();
  },
  refresh: function() {
    var img = this.refs.captchaImg;
    var url = img.getAttribute('data-src');
    img.src = url + '&v=' + Math.random();
  },
  render: function() {
    return (
      <tr>
        <th>{this.props.lang.CAPTCHA}</th>
        <td><input ref="captchaInput" type="text" value={this.props.valid_code} onChange={this.props.onCaptchaChange} />
            <img ref="captchaImg" src="index.php?action=captcha" data-src="index.php?action=captcha" onClick={this.refreshCaptch} alt="Captcha" title={this.props.lang.CLICK_TO_REFRESH} />
        </td>
      </tr>
    );
  }
});

var CommentForm = React.createClass({
  getInitialState: function() {
    // TODO
    return {userInputType: 'text', labelContent: "", username: 'anonymous', text: '', valid_code: ''};
  },
  componentWillReceiveProps: function(nextProps) {
    var computedState = {};
    var propUser = nextProps.user;
    if (propUser.admin) {
      computedState.userInputType = "hidden";
      computedState.username = propUser.admin;
      computedState.labelContent = propUser.admin;
    } else if (propUser.uid) {
      computedState.userInputType = "hidden";
      computedState.username = propUser.username;
      computedState.labelContent = propUser.username;
    } else {
      computedState.userInputType = "text";
      computedState.username = 'anonymous';
      computedState.labelContent = '';
    }
    this.setState(computedState);
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var author = this.state.username.trim();
    var text = this.state.text.trim();
    var valid_code = this.state.valid_code.trim();
    if (!author || !text) return;
    this.props.onCommentSubmit({ user: author, content: text, valid_code: valid_code}); 
    this.setState({ valid_code: ''});
    this.refs.captcha.refresh();
    return false;
  },
  handleUsernameChange: function(e) {
    this.setState({username: e.target.value});
  },
  handleTextChange: function(e) {
    this.setState({text: e.target.value});
  },
  handleCaptchaChange: function(e) {
    this.setState({valid_code: e.target.value});
  },
  render: function() {
    if(this.props.commentListType !== 1) {
      return null;
    }
    var captcha = this.props.appConfig.valid_code_open ?
            <Captcha
              ref="captcha"
              valid_code={this.state.valid_code}
              lang={this.props.lang}
              onCaptchaChange={this.handleCaptchaChange}
            /> : null;
    return (
      <form onSubmit={this.handleSubmit} className="commentForm">
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
            {captcha}
            <tr>
              <td colSpan="2">
                <input name="submit" type="submit" value={this.props.lang.SUBMIT} />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    );
  }
});
    
var CommentBox = React.createClass({
  render: function() {
    return (
      <div className="commentBox">
        <h1>{this.props.lang.WELCOME_POST}</h1>
        <CommentList
          commentListType={this.props.commentListType}
          lang={this.props.lang}
          appConfig={this.props.appConfig}
          data={this.props.comments}
          searchText={this.props.searchText}
        />
        <CommentStatistics 
          onCloseSearch={this.props.onCloseSearch}
          onPageChanged={this.props.onPageChanged}
          commentListType={this.props.commentListType} 
          lang={this.props.lang} 
          appConfig={this.props.appConfig}
          total={this.props.commentsTotalNumber} 
          currentPage = {this.props.currentPage}
          pagenum={this.props.appConfig.page_on ? Math.ceil(this.props.commentsTotalNumber/this.props.appConfig.num_perpage) : 1} /> 
        <CommentForm
          ref="commentForm"
          appConfig={this.props.appConfig}
          user={this.props.user} 
          lang={this.props.lang} 
          commentListType={this.props.commentListType}
          onCommentSubmit={this.props.onCommentSubmit}
        />
      </div>
    );
  }
});
module.exports = CommentBox;
