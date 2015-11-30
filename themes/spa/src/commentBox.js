var React = require('react');
    
var CloseSearchButton = React.createClass({
  handleCloseSearch: function(e) {
    e.preventDefault();
    this.props.onCloseSearch();
  },
  render: function() {
    return (
      <a href="javascript:void(0)" onClick={this.handleCloseSearch}>Close</a>
    );
  }
});

var CommentStatistics = React.createClass({
  rawMarkup: function() {
    var pagenavText, text;
    if (this.props.commentsDataType === 1) {
      pagenavText = this.props.lang.PAGE_NAV;
      text = pagenavText ? pagenavText.replace('{num_of_post}', this.props.total).replace('{num_of_page}', this.props.pagenum) : '';
    } else if (this.props.commentsDataType === 2) {
      if ( this.props.total ) {
        pagenavText = this.props.lang.SEARCH_FOUND;
        text = pagenavText ? pagenavText.replace('{result_num}', this.props.total) : '';
      } else {
        text = this.props.lang.SEARCH_NOTFOUND;
      }
    }
    return { __html: text };
  },
  handleCloseSearch: function() {
    this.props.onCloseSearch();
  },
  render: function() {
    var closeSearchBtn = (this.props.commentsDataType === 2) ? <CloseSearchButton onCloseSearch={this.handleCloseSearch} /> : '';
    console.log('closeSearchBtn:', closeSearchBtn);
    return (
      <div className="statistics">
        {closeSearchBtn}
        <p dangerouslySetInnerHTML={this.rawMarkup()} />
      </div>
    );
  }
});

var CommentList = React.createClass({
  render: function() {
    var lang = this.props.lang;
    var commentNodes = this.props.data.map(function(comment) {
      return (
        <Comment 
          author={comment.uname} 
          key={comment.id} 
          reply_content = {comment.reply_content}
          reply_time = {comment.reply_time}
          time={comment.time}
          lang = {lang}>
          {comment.post_content}
        </Comment>
      );
    });
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});

var Reply = React.createClass({
  rawMarkup: function() {
    // TODO: Get the actual admini user name.
    return { __html: this.props.lang.ADMIN_REPLIED.replace('{admin_name}', 'ADMIN')
                      .replace('{reply_time}', this.props.date)
                      .replace('{reply_content}', this.props.content)};
  },
  render: function() {
    return (
      <div className="reply" dangerouslySetInnerHTML={this.rawMarkup()}>
      </div>
    );
  }
});

var Comment = React.createClass({
  rawMarkup: function() {
    return { __html: this.props.children.toString() };
  },
  render: function() {
    var reply = this.props.reply_content ? <Reply lang={this.props.lang} content={this.props.reply_content} date={this.props.reply_time} /> : '';
    return (
      <div className="comment">
        <span className="commentAuthor">
          {this.props.author}
        </span> 
        <span className="commentDate">{this.props.time}</span>
        <div className="commentText" dangerouslySetInnerHTML={this.rawMarkup()} />
        {reply}
      </div>
    );
  }
});

var CommentForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var author = this.refs.user.value.trim();
    var text = this.refs.content.value.trim();
    if (!author || !text) return;
    
    this.props.onCommentSubmit({ user: author, content: text}); 
    
    this.refs.user.value = ''; 
    this.refs.content.value = ''; 
    return false;
  },
  render: function() {
    return (
      <form onSubmit={this.handleSubmit} className="commentForm">
        <input ref="user" type="text" placeholder="Your name" /> 
        <input ref="content" type="text" placeholder="Say something.." /> 
        <input type="submit" value="Post" /> 
      </form>
    );
  }
});
    
var CommentBox = React.createClass({
  handleCommentSubmit: function(comment) {
    this.props.onCommentSubmit(comment);
  },
  handleCloseSearch: function() {
    this.props.onCloseSearch();
  },
  render: function() {
    var commentForm = this.props.commentsDataType === 1 ? <CommentForm onCommentSubmit={this.handleCommentSubmit}/> : '';
    return (
      <div className="commentBox">
        <h1>Welcome</h1>
        <CommentStatistics 
          onCloseSearch={this.handleCloseSearch}
          commentsDataType={this.props.commentsDataType} 
          lang={this.props.lang} 
          current_page={this.props.comments.current_page} 
          total={this.props.comments.total} 
          pagenum={this.props.comments.pagenum} /> 
        <CommentList 
          commentsDataType={this.props.commentsDataType} 
          lang={this.props.lang}
          data={this.props.comments.comments} />
        {commentForm}
      </div>
    );
  }
});
module.exports = CommentBox;