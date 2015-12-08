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
      acpData: {},
      activeTab: 'overview',
      appConfig: {},
      currentUser: {},
      translations: {}
    };
  },
  // When the component is rendered, load the site configuration from server, and then try to indentify current user.
  // If this is not the admin user, show the login modal.
  componentDidMount: function() {
    dataProvider.getAppConfig(function(data){
      if (this.isMounted()) {
        this.setState({translations: data.translations, appConfig: data});
      }
      this.getUserInfo(function() {
        if (this.state.currentUser.admin) {
          dataProvider.getACPData(function(data){
            this.setState({
              acpData: data
            });
          }.bind(this));
        }
      }.bind(this));
    }.bind(this));
  },
  // Update the `currentUser` state to default value.
  handleLogout: function() {
    if (this.isMounted()) {
      this.setState({ currentUser: {} });
    }
  },
  // Get current user identity from server.
  getUserInfo: function(successCallback) {
    dataProvider.getUserInfo(function(data){
        console.log('user info:', data);
        if (Object.prototype.toString.call(data) === "[object Array]") {
          data = {};
        }
        if (this.isMounted()) {
          this.setState({currentUser: data}, successCallback);
        }
      }.bind(this),
      function(){
      }.bind(this) 
    );
  },
  updateActiveTab: function(newTabName) {
    this.setState({activeTab: newTabName});
  },
  // Update the `currentUser` state after a user signed in.
  handleUserSignedIn: function(signedInUser) {
    if (signedInUser.admin) {
      this.setState({currentUser: signedInUser}, function(){
        dataProvider.getACPData(function(data){
          this.setState({
            acpData: data
          });
        }.bind(this));
      }.bind(this));
    } else if (signedInUser.uid) {
      window.location = "index.php";
    }
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
          acpData={this.state.acpData}
          appConfig={this.state.appConfig}
          user={this.state.currentUser}
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