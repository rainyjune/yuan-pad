var React = require('react'),
    ReactDOM = require('react-dom');
var Modal = require('react-modal');

var ACPLogin = require('./acp-login.js');
var ACPHeader = require('./acp-header.js');
var ACPTabHeader = require('./acp-tabHeader.js');
var ACPTabContent = require('./acp-tabContent.js');
var ACPFooter = require('./acp-footer.js');
var dataProvider = require('./dataProvider.js');

var ACPBox = React.createClass({
  getInitialState: function() {
    return {
      systemInformation: {}, // System information
      activeTab: 'overview',
      appConfig: {}, // App config, including filter words.
      currentUser: {},
      translations: {}
    };
  },
  /**
   * Tested 1.
   */
  // When the component is rendered, load the site configuration from server, and then try to indentify current user.
  // If this is not the admin user, show the login modal.
  componentDidMount: function() {
    dataProvider.getAppConfigACP(function(res){
      if (res.statusCode === 200) {
        var siteConfig = res.response;
        dataProvider.getTranslations(function(res){
          if (this.isMounted()) {
            this.setState({translations: res.response, appConfig: siteConfig});
          }
          this.getUserInfo(function(){
            if (this.state.currentUser.admin) {
              this.loadSystemInformation();
            }
          }.bind(this));
        }.bind(this));
      } else {
        // TODO Tell the user what's wrong.
        alert(res.statusText);
      }
    }.bind(this));
  },
  /**
   * Tested 1.
   */
  loadSystemInformation: function() {
    dataProvider.getSystemInformation(function(res){
        if (res.statusCode !== 200) {
          return;
        }
        this.setState({
          systemInformation: res.response
        });
      }.bind(this));
  },
  // TODO
  // Reload site configuration after being updated by admin user.
  handleConfigUpdate: function() {
    dataProvider.getAppConfigACP(function(data){
      if (this.isMounted()) {
        this.setState({translations: data.translations, appConfig: data});

        dataProvider.getACPData(function(data){
          this.setState({
            systemInformation: data
          });
        }.bind(this));
      }
    }.bind(this));
  },
  // Update the `currentUser` state to default value.
  handleLogout: function() {
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
  getUserInfo: function(successCallback) {
    dataProvider.getUserInfo(function(res){
      console.log('user info:', res);
      if (res.statusCode !== 200) {
        return ;
      }
      if (Object.prototype.toString.call(res.response) === "[object Array]") {
        res.response = {};
      }
      if (this.isMounted()) {
        if (res.response.admin) {
          this.setState({currentUser: res.response}, successCallback);
        }
      }
    }.bind(this), function(){
    }.bind(this));
  },
  /**
   * Tested 1.
   */
  updateActiveTab: function(newTabName) {
    this.setState({activeTab: newTabName});
  },
  // Update the `currentUser` state after a user signed in.
  handleUserSignedIn: function(signedInUser) {
    if (signedInUser.admin) {
      this.setState({currentUser: signedInUser}, function(){
        dataProvider.getSystemInformation(function(res){
          this.setState({
            systemInformation: res.response
          });
        }.bind(this));
      }.bind(this));
    } else if (signedInUser.uid) {
      window.location = "index.php";
    }
  },
  handleCommentDeleted: function() {
    dataProvider.getACPData(function(data){
      this.setState({
        systemInformation: data
      });
    }.bind(this));
  },
  render: function() {
    var tabs = [
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