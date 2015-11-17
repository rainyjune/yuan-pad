(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var CommentBox = React.createClass({
  displayName: "CommentBox",

  getInitialState: function () {
    return {
      comments: [],
      pagenum: 0,
      total: 0,
      current_page: 1
    };
  },
  handleCommentSubmit: function (comment) {
    comment.ajax = true;
    yuanjs.ajax({
      type: "POST",
      url: "./index.php?controller=post&action=create",
      data: comment,
      success: (function (data) {
        debugger;
      }).bind(this),
      error: (function (xhr, status, err) {
        debugger;
      }).bind(this)
    });
  },
  loadCommentsFromServer: function () {
    yuanjs.ajax({
      url: this.props.url,
      dataType: 'json',
      method: 'GET',
      cache: false,
      data: { "ajax": true, pid: 1 },
      success: (function (data) {
        this.setState({
          comments: data.messages,
          pagenum: data.pagenum,
          total: data.total,
          current_page: data.current_page
        });
      }).bind(this),
      error: (function (xhr, status, err) {
        debugger;
      }).bind(this)
    });
  },
  componentDidMount: function () {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render: function () {
    return React.createElement(
      "div",
      { className: "commentBox" },
      React.createElement(
        "h1",
        null,
        "Welcome"
      ),
      React.createElement(CommentStatistics, { current_page: this.state.current_page, total: this.state.total, pagenum: this.state.pagenum }),
      React.createElement(CommentList, { data: this.state.comments }),
      React.createElement(CommentForm, { onCommentSubmit: this.handleCommentSubmit })
    );
  }
});

var CommentStatistics = React.createClass({
  displayName: "CommentStatistics",

  render: function () {
    return React.createElement(
      "div",
      { className: "statistics" },
      this.props.total
    );
  }
});

var CommentList = React.createClass({
  displayName: "CommentList",

  render: function () {
    var commentNodes = this.props.data.map(function (comment) {
      return React.createElement(
        Comment,
        { author: comment.uname, key: comment.id, time: comment.time },
        comment.post_content
      );
    });
    return React.createElement(
      "div",
      { className: "commentList" },
      commentNodes
    );
  }
});

var Comment = React.createClass({
  displayName: "Comment",

  rawMarkup: function () {
    return { __html: this.props.children.toString() };
  },
  render: function () {
    return React.createElement(
      "div",
      { className: "comment" },
      React.createElement(
        "span",
        { className: "commentAuthor" },
        this.props.author
      ),
      React.createElement(
        "span",
        { className: "commentDate" },
        this.props.time
      ),
      React.createElement("div", { className: "commentText", dangerouslySetInnerHTML: this.rawMarkup() })
    );
  }
});

var CommentForm = React.createClass({
  displayName: "CommentForm",

  handleSubmit: function (e) {
    e.preventDefault();
    var author = this.refs.user.value.trim();
    var text = this.refs.content.value.trim();
    if (!author || !text) return;

    // TODO: Send request to the server.
    this.props.onCommentSubmit({ user: author, content: text });

    this.refs.user.value = '';
    this.refs.content.value = '';
    return false;
  },
  render: function () {
    return React.createElement(
      "form",
      { onSubmit: this.handleSubmit, className: "commentForm" },
      React.createElement("input", { ref: "user", type: "text", placeholder: "Your name" }),
      React.createElement("input", { ref: "content", type: "text", placeholder: "Say something.." }),
      React.createElement("input", { type: "submit", value: "Post" })
    );
  }
});

ReactDOM.render(React.createElement(CommentBox, { url: "index.php", pollInterval: 2000 }), document.getElementById('content'));

},{}]},{},[1]);
