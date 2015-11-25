var React = require('react'),
    ReactDOM = require('react-dom');
var Modal = require('react-modal');

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

var App = React.createClass({
  getInitialState: function() {
    return {
      currentUser: {},
      loginErrorMsg: '',
      translations: {},
      commentsData: {
        comments: [],
        pagenum: 0,
        total: 0,
        current_page: 1
      }
    };
  },
  hangleLoginSubmit: function(loginData) {
    yuanjs.ajax({
      type: "POST",
      url: "api.php?controller=user&action=login",
      data: loginData,
      dataType: 'json',
      success: function(data) {
        console.log('data', data);
        if (data.error) {
          this.setState({loginErrorMsg: data.error_detail});
        } else {
          this.setState({loginErrorMsg: '', currentUser: data});
          
        }
      }.bind(this),
      error: function(xhr, status, err) {
        debugger;
      }.bind(this)
    });
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
      cache: false,
      dataType: "json",
      success: successCallback.bind(this),
      error: function(){
        debugger;
      }.bind(this) 
    });
  },
  handleLogout: function() {
    yuanjs.ajax({
      type: "GET",
      url: 'api.php',
      data: {controller: 'user', action: "logout"},
      cache: false,
      //dataType: "json",
      success: function(data){
        this.setState({ currentUser: {} });
      }.bind(this),
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
      this.getUserInfo();
    });
  },
  render: function() {
    return (
      <div id="appbox">
        <Header onUserLogout={this.handleLogout} loginErrorMsg={this.state.loginErrorMsg} user={this.state.currentUser} lang={this.state.translations} onLoginSubmit={this.hangleLoginSubmit} />
        <CommentBox url="index.php" lang={this.state.translations} comments={this.state.commentsData}  />
        <SearchBar />
      </div>
    );
  }
});

var LoginModal = React.createClass({
  closeLoginModal: function() {
    this.props.onRequestClose();
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var user = this.refs.user.value.trim();
    var pwd = this.refs.password.value.trim();
    if (!user || !pwd) return;
    
    this.props.onLoginSubmit({ user: user, password: pwd}); 
    
    this.refs.user.value = ''; 
    this.refs.password.value = ''; 
    return false;
  },
  render: function(){
    return (
      <Modal isOpen={this.props.loginModalIsOpen} onRequestClose={this.closeLoginModal} style={customStyles} >
        <h2>Login</h2>
        <p>{this.props.loginErrorMsg}</p>
        <button onClick={this.closeLoginModal}>close</button>
        <form onSubmit={this.handleSubmit} action="index.php?controller=user&amp;action=login" method="post">
          <table>
            <tbody>
              <tr>
                <td><label>{this.props.lang.USERNAME}</label></td>
                <td><input type="text" ref="user" size="20" /></td>
              </tr>
              <tr>
                <td><label>{this.props.lang.ADMIN_PWD}</label></td>
                <td><input type="password" ref="password" size="20" /></td>
              </tr>
              <tr>
                <td colSpan="2">
                  <input id="submit_button" name="submit" type="submit" value={this.props.lang.SUBMIT} />
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </Modal>
    );
  }
});

var Header = React.createClass({
  handleLogout: function() {
    this.props.onUserLogout();
  },
  hangleLoginSubmit: function(loginData) {
    this.props.onLoginSubmit(loginData);
  },
  render: function() {
    var loginButton;
    if (this.props.user.admin || this.props.user.user) {
      loginButton = <LogoutButton lang={this.props.lang} onUserLogout={this.handleLogout} />;
    } else {
      loginButton = <LoginButton loginErrorMsg={this.props.loginErrorMsg} lang={this.props.lang} onLoginSubmit={this.hangleLoginSubmit} />;
    }

    return (
      <div className="header">
        {loginButton}
      </div>
    );
  }
});

var LogoutButton = React.createClass({
  handleLogout: function(e) {
    e.preventDefault();
    this.props.onUserLogout();
  },
  render: function() {
    return (
      <a href='index.php?controller=user&amp;action=logout' onClick={this.handleLogout}>{this.props.lang.LOGOUT}</a>
    );
  }
});

var LoginButton = React.createClass({
  getInitialState: function() {
    return {
      loginModalIsOpen: false
    };
  },
  openLoginModal: function() {
    this.setState({loginModalIsOpen: true});
  },

  closeLoginModal: function() {
    this.setState({loginModalIsOpen: false});
  },
  hangleLoginSubmit: function(loginData) {
    this.props.onLoginSubmit(loginData);
  },
  render: function() {
    return (
      <div>
        <a href='javascript:void(0);'>{this.props.lang.REGISTER}</a>&nbsp;
        <a href='javascript:void(0);' onClick={this.openLoginModal}>{this.props.lang.LOGIN}</a>
        <LoginModal loginErrorMsg={this.props.loginErrorMsg} onLoginSubmit={this.hangleLoginSubmit} loginModalIsOpen={this.state.loginModalIsOpen} onRequestClose={this.closeLoginModal} lang={this.props.lang} />
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