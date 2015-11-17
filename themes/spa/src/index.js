var CommentBox = React.createClass({
  getInitialState: function() {
    return { data: [] };
  },
  handleCommentSubmit: function(comment) {
    comment.ajax = true;
    yuanjs.ajax({
      type: "POST",
      url: "./index.php?controller=post&action=create",
      data: comment,
      success: function(data) {
        debugger;
      }.bind(this),
      error: function(xhr, status, err) {
        debugger;
      }.bind(this)
    });
  },
  loadCommentsFromServer: function() {
    yuanjs.ajax({
      url: this.props.url,
      dataType: 'json',
      method: 'GET',
      cache: false,
      data: {"ajax": true, pid: 1},
      success: function(data) {
        this.setState({data: data.messages});
      }.bind(this),
      error: function(xhr, status, err) {
        debugger;
      }.bind(this)
    });
  },
  componentDidMount: function() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="commentBox">
        <h1>Welcome</h1>
        <CommentList data={this.state.data} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit}/>
      </div>
    );
  }
});

var CommentList = React.createClass({
  render: function() {
    var commentNodes = this.props.data.map(function(comment) {
      return (
        <Comment author={comment.uname} key={comment.id}>
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
  render: function() {
    return (
      <div className="comment">
        <h2 class="commentAuthor">
          {this.props.author}
        </h2> 
        {this.props.children}
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
    
    // TODO: Send request to the server.
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

ReactDOM.render(
  <CommentBox url="index.php" pollInterval={2000} />,
  document.getElementById('content')
);
