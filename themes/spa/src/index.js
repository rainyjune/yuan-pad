let React = require('react'),
    ReactDOM = require('react-dom');
    
let SearchBar = require('./searchBar.js'),
    CommentBox = require('./commentBox.js'),
    Header = require('./header.js'),
    Footer = require('./footer.js'),
    dataProvider = require('./dataProvider.js');

let App = React.createClass({
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
   * Test 1
   */
  // Load comments to be displayed on page by page number.
  loadCommentsFromServer() {
    dataProvider.loadCommentsFromServer(this.state.currentPage, res => {
        if (this.isMounted()) {
          this.setState({
            comments: res.response.comments,
            commentsTotalNumber: res.response.total,
            commentListType: 1
          });
        }
    });
  },
  /**
   * Tested 1.
   *
   */
  // Get comments from server according to the keyword user has entered.
  handleSearch(keyword) {
    dataProvider.search(keyword, res => {
        if (this.isMounted()) {
          this.setState({
            comments: res.response.comments,
            commentsTotalNumber: res.response.total,
            commentListType: 2
          });
        }
    });
  },
  /**
   * Tested 1.
   */
  // When the component is rendered, load the site configuration from server, and then try to indentify current user.
  componentDidMount() {
    dataProvider.getAppConfig(res => {
      if (res.statusCode === 200) {
        let siteConfig = res.response;
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
  // Reload comments from server if the `currentPage` state changed.
  handlePageChange(pageNumber) {
    pageNumber = parseInt(pageNumber);
    this.setState({currentPage: pageNumber}, this.loadCommentsFromServer);
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
  setCurrentUser(userData) {
    this.setState({currentUser: userData});
  },
  render() {
    let state = this.state;
    let props = {
      user: state.currentUser,
      appConfig: state.appConfig,
      lang: state.translations
    };
    return (
      <div id="appbox">
        <Header
          {...props}
          onCurrentUserUpdated={this.setCurrentUser}
        />
        <CommentBox
          ref="commentBox"
          {...props}
          onCommentCreated={this.loadCommentsFromServer}
          onCloseSearch={this.loadCommentsFromServer}
          onPageChanged={this.handlePageChange}
          currentPage = {state.currentPage}
          commentListType={state.commentListType} 
          comments={state.comments} 
          commentsTotalNumber={state.commentsTotalNumber}
          searchText={state.searchText}
        />
        <SearchBar 
          onSubmit={this.handleSearch} 
          onUserInput={this.handleKeywordInput}
          searchText={state.searchText}
        />
        <Footer
          {...props}
        />
      </div>
    );
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('content')
);