let React = require('react'),
    ReactDOM = require('react-dom');
let Modal = require('react-modal');

let ACPLogin = require('./acp-login.js'),
    ACPHeader = require('./acp-header.js'),
    ACPTabHeader = require('./acp-tabHeader.js'),
    ACPTabContent = require('./acp-tabContent.js'),
    ACPFooter = require('./acp-footer.js'),
    dataProvider = require('./dataProvider.js');

let ACPBox = React.createClass({
  getInitialState() {
    return {
      systemInformation: {}, // System information
      activeTab: 'overview',
      appConfig: {}, // App config, including filter words.
      currentUser: {},
      translations: {}
    };
  },
  /**
   * Tested 1. Load application data after we verified the root user.
   */
  componentDidMount() {
    this.getUserInfo(this.loadApplicationConfiguration);
  },

  loadApplicationConfiguration(successCallback) {
    dataProvider.getAppConfigACP(res => {
      //debugger;
      if (res.statusCode !== 200) {
        return ;
      }
      this.setState({appConfig: res.response}, successCallback || this.loadApplicationTranslation);
    });
  },
  loadApplicationTranslation(successCallback) {
    dataProvider.getTranslations(res => {
      //debugger;
      if (res.statusCode === 200) {
        this.setState({translations: res.response}, successCallback || this.loadApplicationSystemInformation);
      }
    });
  },
  loadApplicationSystemInformation(successCallback) {
    dataProvider.getSystemInformation(res => {
      if (res.statusCode === 200) {
        this.setState({systemInformation: res.response}, successCallback);
      }
    });
  },
  
  /**
   * Tested 1.
   */
  // Reload site configuration after being updated by admin user.
  handleConfigUpdate() {
    this.loadApplicationConfiguration();
  },
  /**
   * Tested 1.
   */
  // Update the `currentUser` state to default value.
  handleLogout() {
    if (this.isMounted()) {
      // Navigates to the index.php page after signed out.
      this.setState({ currentUser: {} }, function(){
        window.location = "index.php";
      });
    }
  },
  /**
   * Tested 1.
   */
  // Get current user identity from server.
  getUserInfo(successCallback) {
    dataProvider.getUserInfo(res => {
      console.log('user info:', res);
      if (res.statusCode !== 200) {
        return ;
      }
      if (this.isMounted()) {
        if (res.response.user_type === "admin") {
          this.setState({currentUser: res.response}, successCallback);
        }
      }
    }, function(){
    }.bind(this));
  },
  /**
   * Tested 1.
   */
  updateActiveTab(newTabName) {
    this.setState({activeTab: newTabName});
  },
  /**
   * Tested 1
   */
  // Update the `currentUser` state after a user signed in.
  handleUserSignedIn(signedInUser) {
    if (signedInUser.admin) {
      this.setState({currentUser: signedInUser}, this.loadApplicationConfiguration);
    } else if (signedInUser.uid) {
      window.location = "index.php";
    }
  },
  handleCommentDeleted() {
    this.loadApplicationSystemInformation();
  },
  render() {
    let tabs = [
      {text: this.state.translations.ACP_OVERVIEW,value: "overview"},
      {text: this.state.translations.ACP_CONFSET,value: "siteset"},
      {text: this.state.translations.ACP_MANAGE_POST,value: "message"},
      {text: this.state.translations.ACP_MANAGE_IP,value: "ban_ip"},
      {text: this.state.translations.USER_ADMIN,value: "user"}
    ];
    return (
      <div id="acpBox">
        <ACPLogin
          lang={this.state.translations}
          user={this.state.currentUser}
          onUserSignedIn={this.handleUserSignedIn}
        />
        <ACPHeader
          lang={this.state.translations}
          user={this.state.currentUser}
          onUserLogout={this.handleLogout}
        />
        <ACPTabHeader
          activeTab={this.state.activeTab}
          user={this.state.currentUser}
          tabs={tabs}
          onTabSelected={this.updateActiveTab}
        />
        <ACPTabContent
          lang={this.state.translations}
          activeTab={this.state.activeTab}
          systemInformation={this.state.systemInformation}
          appConfig={this.state.appConfig}
          user={this.state.currentUser}
          onActiveTabChanged={this.updateActiveTab}
          onConfigUpdated={this.handleConfigUpdate}
          onCommentDeleted={this.handleCommentDeleted}
        />
        <ACPFooter
          user={this.state.currentUser}
        />
      </div>
    );
  }
});

ReactDOM.render(
  <ACPBox />,
  document.getElementById('content')
);