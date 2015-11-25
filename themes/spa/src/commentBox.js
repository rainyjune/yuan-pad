var React = require('react'),
    ReactDOM = require('react-dom');

var CommentStatistics = React.createClass({
  rawMarkup: function() {
    var pagenavText = this.props.lang.PAGE_NAV;
    var text = pagenavText ? pagenavText.replace('{num_of_post}', this.props.total).replace('{num_of_page}', this.props.pagenum) : '';
    return { __html: text };
  },
  render: function() {
    return (
      <div className="statistics">
        <p dangerouslySetInnerHTML={this.rawMarkup()} />
      </div>
    );
  }
});

var CommentList = React.createClass({
  render: function() {
    var commentNodes = this.props.data.map(function(comment) {
      return (
        <Comment author={comment.uname} key={comment.id} time={comment.time}>
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

var Comment = React.createClass({
  rawMarkup: function() {
    return { __html: this.props.children.toString() };
  },
  render: function() {
    return (
      <div className="comment">
        <span className="commentAuthor">
          {this.props.author}
        </span> 
        <span className="commentDate">{this.props.time}</span>
        <div className="commentText" dangerouslySetInnerHTML={this.rawMarkup()} />
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
    comment.ajax = true;
    yuanjs.ajax({
      type: "POST",
      url: "./index.php?controller=post&action=create",
      data: comment,
      success: function(data) {
      }.bind(this),
      error: function(xhr, status, err) {
        debugger;
      }.bind(this)
    });
  },
  render: function() {
    return (
      <div className="commentBox">
        <h1>Welcome</h1>
        <CommentStatistics lang={this.props.lang} current_page={this.props.comments.current_page} total={this.props.comments.total} pagenum={this.props.comments.pagenum} /> 
        <CommentList data={this.props.comments.comments} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit}/>
      </div>
    );
  }
});

module.exports = CommentBox;