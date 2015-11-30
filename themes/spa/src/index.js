var React = require('react'),
    ReactDOM = require('react-dom');
var SearchBar = require('./searchBar.js');
var CommentBox = require('./commentBox.js');
var Header = require('./header.js');

var App = React.createClass({
  getInitialState: function() {
    return {
      currentUser: {},
      userDetailedData: {},
      loginErrorMsg: '',
      userUpdateErrorMsg: '',
      registerErrorMsg: '',
      translations: {},
      appConfig: {},
      currentPage: 0,
      commentsDataType: 1, // 1: Default list. 2: Search Result list
      commentsData: {
        comments: [],
        pagenum: 0,
        total: 0,
        current_page: 1
      }
    };
  },
  handleLoginSubmit: function(loginData) {
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
  loadUserDataFromServer: function(uid) {
    yuanjs.ajax({
      type: "GET",
      url: 'api.php?controller=user&action=update&uid=' + uid,
      dataType: 'json',
      cache: false,
      success: function(data){
        console.log('user info from server:', data);
        this.setState({userDetailedData: data});
      }.bind(this),
      error: function(){
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
        if (data.uid) {
          this.loadUserDataFromServer(data.uid);
        }
      }.bind(this),
      error: function(){
      }.bind(this) 
    });
  },
  getAppConfig: function(successCallback) {
    yuanjs.ajax({
      type: "GET",
      url: 'index.php',
      data: {action: "getAppConfig",t:Date.now()},
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
  handleUserUpdate: function(userData) {
    yuanjs.ajax({
      type: "POST",
      url: "api.php?controller=user&action=update&uid=" + userData.uid,
      data: userData,
      dataType: 'json',
      success: function(data) {
        console.log('update user result:', data, userData);
        if (data.error) {
          this.setState({userUpdateErrorMsg: data.error_detail});
        } else {
          this.setState({userUpdateErrorMsg: '', currentUser: userData});
        }
      }.bind(this),
      error: function(xhr, status, err) {
        debugger;
      }.bind(this)
    });
  },
  handleRegister: function(userData) {
    yuanjs.ajax({
      type: "POST",
      url: "api.php?controller=user&action=create",
      data: userData,
      dataType: 'json',
      success: function(data) {
        console.log('create user result:', data);
        if (data.error) {
          this.setState({registerErrorMsg: data.error_detail});
        } else {
          this.setState({registerErrorMsg: '', currentUser: data});
          this.loadUserDataFromServer(data.uid); // Load user profile from server.
        }
      }.bind(this),
      error: function(xhr, status, err) {
        debugger;
      }.bind(this)
    });
  },
  loadCommentsFromServer: function() {
    console.log("Ready to load data from server, page:", this.state.currentPage);
    yuanjs.ajax({
      url: this.props.url,
      dataType: 'json',
      method: 'GET',
      cache: false,
      data: {"ajax": true, pid: this.state.currentPage},
      success: function(data) {
        this.setState({
          commentsDataType: 1,
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
  handleSearch: function(keyword) {
    yuanjs.ajax({
      type: "POST",
      url: "api.php?controller=search",
      data: {s:keyword},
      dataType: 'json',
      success: function(data) {
        console.log('search result:', data);
        this.setState({
          commentsDataType: 2,
          commentsData:{
            comments: data.messages,
            pagenum: 1,
            total: data.nums,
            current_page: 1
          }
        });
      }.bind(this),
      error: function(xhr, status, err) {
        debugger;
      }.bind(this)
    });
  },
  handleCloseSearch: function() {
    this.loadCommentsFromServer();
  },
  componentDidMount: function() {
    this.getAppConfig(function(data){
      this.setState({translations: data.translations});
      // TODO Duplicate data.
      this.setState({appConfig: data});
      this.getUserInfo();
    });
  },
  handleCommentSubmit: function(comment) {
    comment.ajax = true;
    yuanjs.ajax({
      type: "POST",
      url: "./index.php?controller=post&action=create",
      data: comment,
      success: function(data) {
        this.loadCommentsFromServer();
      }.bind(this),
      error: function(xhr, status, err) {
        debugger;
      }.bind(this)
    });
  },
  handlePageChange: function(pageNumber) {
    pageNumber = parseInt(pageNumber);
    this.setState({currentPage: pageNumber}, function(){
      this.loadCommentsFromServer();
    });
  },
  render: function() {
    return (
      <div id="appbox">
        <Header 
          onRegisterSubmit={this.handleRegister} 
          onUserUpdate={this.handleUserUpdate} 
          onUserLogout={this.handleLogout} 
          onLoginSubmit={this.handleLoginSubmit}
          registerErrorMsg={this.state.registerErrorMsg} 
          loginErrorMsg={this.state.loginErrorMsg} 
          user={this.state.currentUser} 
          userDetailedData = {this.state.userDetailedData}
          appConfig={this.state.appConfig}
          lang={this.state.translations} />
        <CommentBox 
          onCommentSubmit={this.handleCommentSubmit}
          onCloseSearch={this.handleCloseSearch}
          onPageChanged={this.handlePageChange}
          url="index.php" 
          user={this.state.currentUser} 
          lang={this.state.translations} 
          currentPage = {this.state.currentPage}
          appConfig={this.state.appConfig}
          commentsDataType={this.state.commentsDataType} 
          comments={this.state.commentsData}  />
        <SearchBar onSubmit={this.handleSearch} />
      </div>
    );
  }
});

ReactDOM.render(
  <App url="index.php" />,
  document.getElementById('content')
);