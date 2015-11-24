var App = React.createClass({
  getInitialState: function() {
    return {
      currentUser: {},
      translations: {},
      commentsData: {
        comments: [],
        pagenum: 0,
        total: 0,
        current_page: 1
      }
    };
  },
  getUserInfo: function() {
    yuanjs.ajax({
      type: "GET",
      url: 'index.php?controller=user&action=getUserInfo',
      dataType: 'json',
      cache: false,
      dataType: "json",
      success: function(data){
        console.log('user info:', data);
        this.setState({currentUser: data});
        this.loadCommentsFromServer();
      }.bind(this),
      error: function(){
      }.bind(this) 
    });
  },
  getAppConfig: function(successCallback) {
    
    yuanjs.ajax({
      type: "GET",
      url: 'index.php',
      data: {action: "getSysJSON",t:Date.now()},
      dataType: 'json',
      cache: false,
      dataType: "json",
      success: successCallback.bind(this),
      error: function(){
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
        this.setState({
          commentsData: {
            comments: data.messages,
            pagenum: data.pagenum,
            total: data.total,
            current_page: data.current_page 
          }
        });
      }.bind(this),
      error: function(xhr, status, err) {
        debugger;
      }.bind(this)
    });
  },
  componentDidMount: function() {
    this.getAppConfig(function(data){
      this.setState({translations: data});
      var sessionId = Cookies.get('PHPSESSID');;
      if (sessionId) {
        this.getUserInfo(sessionId);
        debugger;
      } else {
        debugger;
      }
      
    });
  },
  render: function() {
    return (
      <div id="appbox">
        <Header user={this.state.currentUser} />
        <CommentBox url="index.php" lang={this.state.translations} comments={this.state.commentsData}  />
        <SearchBar />
      </div>
    );
  }
});

var Header = React.createClass({
  render: function() {
    
    var loginButton;
    if (this.props.user.admin || this.props.user.user) {
      loginButton = <LogoutButton />;
    } else {
      loginButton = <LoginButton />;
    }

    return (
      <div className="header">
        {loginButton}
      </div>
    );
  }
});

var LogoutButton = React.createClass({
  render: function() {
    return (
      <a href='index.php?controller=user&amp;action=logout'>LOGOUT</a>
    );
  }
});


var LoginButton = React.createClass({
  render: function() {
    return (
      <div>
        <a href='index.php?controller=user&amp;action=create&amp;width=630&amp;height=45%'>REGISTER</a>
        <a href='index.php?controller=user&amp;action=login'>LOGIN</a>
      </div>
    );
  }
});


var SearchBar = React.createClass({
  render: function() {
    return (
      <div className="searchbar">
        This is a search bar.
      </div>
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

ReactDOM.render(
  <App url="index.php" />,
  document.getElementById('content')
);
