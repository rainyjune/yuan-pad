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
      appConfig: {},
      comments: [],
      commentsTotalNumber: 0, // The total number of all comments or filtered comments.
      commentListType: 1, // 1: Default list. 2: Search Result list
      currentPage: 0,
      currentUser: {},
      searchText: '', // The search keyword
      translations: {}
    };
  },
  loadUserDataFromServer: function(uid) {
    dataProvider.loadUserDataFromServer(uid, function(data){
        console.log('user info from server:', data);
        if (this.isMounted()) {
          this.setState({currentUser: data});
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
        if (data.uid) {
          this.loadUserDataFromServer(data.uid)
        } else {
          this.setState({currentUser: data});
        }
        this.loadCommentsFromServer();
      }
    }.bind(this), function(){
    }.bind(this));
  },
  handleLogout: function() {
    if (this.isMounted()) {
      this.setState({ currentUser: {} });
    }
  },
  handleUserUpdated: function() {
    if (this.state.currentUser && this.state.currentUser.uid) {
      this.loadUserDataFromServer(this.state.currentUser.uid);
    }
  },
  loadCommentsFromServer: function() {
    dataProvider.loadCommentsFromServer(this.state.currentPage, function(data) {
        if (this.isMounted()) {
          this.setState({
            comments: data.messages,
            commentsTotalNumber: data.total,
            commentListType: 1
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
            comments: data.messages,
            commentsTotalNumber: data.nums,
            commentListType: 2
          });
        }
      }.bind(this),
      function(xhr, status, err) {
        debugger;
      }.bind(this)
    );
  },
  componentDidMount: function() {
    dataProvider.getAppConfig(function(data){
      if (this.isMounted()) {
        this.setState({translations: data.translations});
        // TODO Duplicate data.
        this.setState({appConfig: data});
      }
      this.getUserInfo();
    }.bind(this));
  },
  handleCommentSubmit: function(comment) {
    var comments = this.state.comments;
    var newComment = {
      id: Date.now(),
      user: comment.user,
      time: '12-05 16:50',
      post_content: comment.content,
    };

    var commentArr = comments.concat([]);
    commentArr.unshift(newComment);
    if (this.state.appConfig.page_on) {
      commentArr.pop();
    }
    this.setState({
      comments: commentArr,
      commentsTotalNumber: this.state.commentsTotalNumber + 1,
      commentListType: 1
    });
    dataProvider.createPost(comment, function(data) {
        this.loadCommentsFromServer();
      }.bind(this),
      function(xhr, status, err) {
        this.setState({comments: comments});
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
  handleUserSignedIn: function(signedInUser) {
    if (signedInUser.admin) {
      this.setState({currentUser: signedInUser});
    } else if (signedInUser.uid) {
      this.loadUserDataFromServer(signedInUser.uid);
    }
  },
  handleSignedUp: function(userData) {
    if (userData.uid) {
      this.loadUserDataFromServer(userData.uid);
    }
  },
  render: function() {
    return (
      <div id="appbox">
        <Header 
          onSignedUp={this.handleSignedUp} 
          onUserUpdated={this.handleUserUpdated} 
          onUserLogout={this.handleLogout} 
          onUserSignedIn={this.handleUserSignedIn}
          user={this.state.currentUser} 
          appConfig={this.state.appConfig}
          lang={this.state.translations}
        />
        <CommentBox 
          onCommentSubmit={this.handleCommentSubmit}
          onCloseSearch={this.loadCommentsFromServer}
          onPageChanged={this.handlePageChange}
          user={this.state.currentUser} 
          lang={this.state.translations} 
          currentPage = {this.state.currentPage}
          appConfig={this.state.appConfig}
          commentListType={this.state.commentListType} 
          comments={this.state.comments} 
          commentsTotalNumber={this.state.commentsTotalNumber}
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
          user={this.state.currentUser} 
        />
      </div>
    );
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('content')
);