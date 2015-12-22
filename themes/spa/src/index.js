var React = require('react'),
    ReactDOM = require('react-dom');
    
var SearchBar = require('./searchBar.js');
var CommentBox = require('./commentBox.js');
var Header = require('./header.js');
var Footer = require('./footer.js');
var dataProvider = require('./dataProvider.js');

var App = React.createClass({
  getInitialState() {
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
  /**
   * Tested 1.
   */
  // Get a regular user profile by uid.
  loadUserDataFromServer(uid) {
    dataProvider.loadUserDataFromServer(uid, res => {
        console.log('user info from server:', res);
        if (res.statusCode !== 200) {
          return;
        }
        if (this.isMounted()) {
          this.setState({currentUser: res.response});
        }
      }, function(){
      }.bind(this));
  },
  /**
   * Tested 1.
   *
   */
  // Get current user identity from server.
  getUserInfo() {
    dataProvider.getUserInfo(res => {
      console.log('user info:', res);
      if (res.statusCode !== 200) {
        return ;
      }
      if (this.isMounted()) {
        this.setState({currentUser: res.response});
        this.loadCommentsFromServer();
      }
    }, function(){
    }.bind(this));
  },
  /**
   * Tested 1.
   */
  // Update the `currentUser` state to default value.
  handleLogout() {
    if (this.isMounted()) {
      this.setState({ currentUser: {} });
    }
  },
  /**
   * Tested 1.
   */
  // Reload user profile from server by uid.
  handleUserUpdated() {
    if (this.state.currentUser && this.state.currentUser.uid) {
      this.loadUserDataFromServer(this.state.currentUser.uid);
    }
  },
  /**
   * Test 1
   */
  // Load comments to be displayed on page by page number.
  loadCommentsFromServer() {
    dataProvider.loadCommentsFromServer(this.state.currentPage, res => {
        if (res.statusCode === 200) {
          //code
        } else if (res.statusCode === 404) {
          // No comments found.
        }
        if (this.isMounted()) {
          this.setState({
            comments: res.response.comments,
            commentsTotalNumber: res.response.total,
            commentListType: 1
          });
        }
      },
      function(xhr, status, err) {
        debugger;
      }.bind(this)
    );
  },
  /**
   * Tested 1.
   *
   */
  // Get comments from server according to the keyword user has entered.
  handleSearch(keyword) {
    dataProvider.search(keyword, res => {
        console.log('search result:', res);
        if (this.isMounted()) {
          this.setState({
            comments: res.response.comments,
            commentsTotalNumber: res.response.total,
            commentListType: 2
          });
        }
      },
      function(xhr, status, err) {
        debugger;
      }.bind(this)
    );
  },
  /**
   * Tested 1.
   */
  // When the component is rendered, load the site configuration from server, and then try to indentify current user.
  componentDidMount() {
    dataProvider.getAppConfig(res => {
      if (res.statusCode === 200) {
        var siteConfig = res.response;
        dataProvider.getTranslations(res => {
          if (this.isMounted()) {
            this.setState({translations: res.response, appConfig: siteConfig});
          }
          this.getUserInfo();
        });
      } else {
        // TODO Tell the user what's wrong.
        alert(res.statusText);
      }
    });
  },
  /**
   * Tested 1.
   */
  // Save comment to the server, reload comments after saved sucessfully.
  handleCommentSubmit(comment) {
    dataProvider.createPost(comment, res => {
        if (res.statusCode !== 200) {
          alert(res.response);
          return;
        }
        // Clear the text in the textarea.
        this.refs.commentBox.refs.commentForm.setState({text:''});
        this.loadCommentsFromServer();
      },
      function(xhr, status, err) {
        console.log("error", xhr, status, err);
      }.bind(this)
    );
  },
  /**
   * Tested 1.
   */
  // Reload comments from server if the `currentPage` state changed.
  handlePageChange(pageNumber) {
    pageNumber = parseInt(pageNumber);
    this.setState({currentPage: pageNumber}, () => this.loadCommentsFromServer());
  },
  /**
   * Tested 1.
   */
  // Update the `searchText` state.
  handleKeywordInput(searchText) {
    this.setState({
      searchText: searchText
    });
  },
  /**
   * Tested 1.
   */
  // Update the `currentUser` state after a user signed in.
  handleUserSignedIn(signedInUser) {
    if (signedInUser.admin) {
      this.setState({currentUser: signedInUser});
    } else if (signedInUser.uid) {
      this.loadUserDataFromServer(signedInUser.uid);
    }
  },
  /**
   * Tested 1.
   */
  // Reload a regular user profile from server after the user signed up successfully.
  handleSignedUp(userData) {
    if (userData.uid) {
      this.loadUserDataFromServer(userData.uid);
    }
  },
  render() {
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
          ref="commentBox"
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