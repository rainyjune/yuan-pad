var React = require('react'),
    ReactDOM = require('react-dom');
var SearchBar = require('./searchBar.js');
var CommentBox = require('./commentBox.js');
var Header = require('./header.js');
var Footer = require('./footer.js');
var dataProvider = require('./dataProvider.js');

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
      searchText: '', // The search keyword
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
    dataProvider.login(loginData, function(data){
      if (this.isMounted()) {
        if (data.error) {
          this.setState({loginErrorMsg: data.error_detail});
        } else {
          this.setState({loginErrorMsg: '', currentUser: data}, function() {
            if (data.uid) {
              this.loadUserDataFromServer(data.uid);
            }
          });
        }
      }
    }.bind(this), function(){
      debugger;
    }.bind(this));
  },
  loadUserDataFromServer: function(uid) {
    dataProvider.loadUserDataFromServer(uid, function(data){
        console.log('user info from server:', data);
        if (this.isMounted()) {
          this.setState({userDetailedData: data});
        }
      }.bind(this), function(){
      }.bind(this));
  },
  getUserInfo: function() {
    dataProvider.getUserInfo(function(data){
      console.log('user info:', data);
      if (Object.prototype.toString.call(data) === "[object Array]") {
        data = {};
      }
      if (this.isMounted()) {
        this.setState({currentUser: data}, function(){
          this.loadCommentsFromServer();
          if (data.uid) {
            this.loadUserDataFromServer(data.uid);
          }
        });
      }
    }.bind(this), function(){
    }.bind(this));
  },
  getAppConfig: function(successCallback) {
    dataProvider.getAppConfig(successCallback.bind(this), function(){
      debugger;
    }.bind(this));
  },
  handleLogout: function() {
    dataProvider.logout(function(data){
      if (this.isMounted()) {
        this.setState({ currentUser: {} });
      }
    }.bind(this), function(){
      debugger;
    }.bind(this)); 
  },
  handleUserUpdate: function(userData) {
    dataProvider.updateUser(userData, function(data) {
        console.log('update user result:', data, userData);
        if (data.error) {
          if (this.isMounted()) {
            this.setState({userUpdateErrorMsg: data.error_detail});
          }
        } else {
          if (this.isMounted()) {
            this.setState({userUpdateErrorMsg: '', currentUser: userData});
          }
        }
      }.bind(this),
      function(xhr, status, err) {
        debugger;
      }.bind(this));
  },
  handleRegister: function(userData) {
    dataProvider.signUp(userData,function(data) {
        console.log('create user result:', data);
        if (data.error) {
          if (this.isMounted()) {
            this.setState({registerErrorMsg: data.error_detail});
          }
        } else {
          if (this.isMounted()) {
            this.setState({registerErrorMsg: '', currentUser: data});
          }
          this.loadUserDataFromServer(data.uid); // Load user profile from server.
        }
      }.bind(this),
      function(xhr, status, err) {
        debugger;
      }.bind(this)
    );
  },
  loadCommentsFromServer: function() {
    dataProvider.loadCommentsFromServer(this.state.currentPage, function(data) {
        if (this.isMounted()) {
          this.setState({
            commentsDataType: 1,
            commentsData: {
              comments: data.messages,
              pagenum: data.pagenum,
              total: data.total,
              current_page: data.current_page 
            }
          });
        }
      }.bind(this),
      function(xhr, status, err) {
        debugger;
      }.bind(this)
    );
  },
  handleSearch: function(keyword) {
    dataProvider.search(keyword, function(data) {
        console.log('search result:', data);
        if (this.isMounted()) {
          this.setState({
            commentsDataType: 2,
            commentsData:{
              comments: data.messages,
              pagenum: 1,
              total: data.nums,
              current_page: 1
            }
          });
        }
      }.bind(this),
      function(xhr, status, err) {
        debugger;
      }.bind(this)
    );
  },
  componentDidMount: function() {
    this.getAppConfig(function(data){
      if (this.isMounted()) {
        this.setState({translations: data.translations});
        // TODO Duplicate data.
        this.setState({appConfig: data});
      }
      this.getUserInfo();
    });
  },
  handleCommentSubmit: function(comment) {
    var comments = this.state.commentsData;
    var CommentData = {
      id: Date.now(),
      user: comment.user,
      time: '12-05 16:50',
      post_content: comment.content,
    };

    var commentArr = comments.comments.concat([]);
    commentArr.unshift(CommentData);
    if (this.state.appConfig.page_on) {
      commentArr.pop();
    }
    var newComments = {
      comments: commentArr,
      pagenum: comments.pagenum, // TODO
      total: comments.total + 1,
      current_page: 0
    };
    this.setState({commentsData: newComments});
    dataProvider.createPost(comment, function(data) {
        this.loadCommentsFromServer();
      }.bind(this),
      function(xhr, status, err) {
        this.setState({commentsData: comments});
        console.log("error", xhr, status, err);
      }.bind(this)
    );
  },
  handlePageChange: function(pageNumber) {
    pageNumber = parseInt(pageNumber);
    this.setState({currentPage: pageNumber}, function(){
      this.loadCommentsFromServer();
    });
  },
  handleKeywordInput: function(searchText) {
    this.setState({
      searchText: searchText
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
          onCloseSearch={this.loadCommentsFromServer}
          onPageChanged={this.handlePageChange}
          user={this.state.currentUser} 
          lang={this.state.translations} 
          currentPage = {this.state.currentPage}
          appConfig={this.state.appConfig}
          commentsDataType={this.state.commentsDataType} 
          comments={this.state.commentsData}  
          searchText={this.state.searchText}
        />
        <SearchBar 
          onSubmit={this.handleSearch} 
          onUserInput={this.handleKeywordInput}
          searchText={this.state.searchText}
        />
        <Footer
          lang={this.state.translations} 
          appConfig={this.state.appConfig}
          user={this.state.currentUser} />
      </div>
    );
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('content')
);