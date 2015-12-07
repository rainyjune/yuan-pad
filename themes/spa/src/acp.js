var React = require('react'),
    ReactDOM = require('react-dom');

var ACPHeader = require('./acp-header.js');
var ACPTabHeader = require('./acp-tabHeader.js');
var ACPTabContent = require('./acp-tabContent.js');
var ACPFooter = require('./acp-footer.js');
var dataProvider = require('./dataProvider.js');

var ACPBox = React.createClass({
  getInitialState: function() {
    return {
      currentUser: {},
      translations: {},
      activeTab: 'overview',
      acpData: {}
    };
  },
  componentDidMount: function() {
    dataProvider.getAppConfig(function(data){
      if (this.isMounted()) {
        this.setState({translations: data.translations, appConfig: data});
      }
      this.getUserInfo();
      dataProvider.getACPData(function(data){
        this.setState({
          acpData: data
        });
      }.bind(this));
    }.bind(this));
  },
  // TODO Reuse
  handleLogout: function() {
    dataProvider.logout(function(data){
        if (this.isMounted()) {
          this.setState({ currentUser: {} });
        }
      }.bind(this),
      function(){
        debugger;
      }.bind(this) 
    );
  },
  getUserInfo: function() {
    dataProvider.getUserInfo(function(data){
        console.log('user info:', data);
        if (Object.prototype.toString.call(data) === "[object Array]") {
          data = {};
        }
        if (this.isMounted()) {
          this.setState({currentUser: data});
        }
      }.bind(this),
      function(){
      }.bind(this) 
    );
  },
  updateActiveTab: function(newTabName) {
    this.setState({activeTab: newTabName});
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
        <ACPHeader
          lang={this.state.translations}
          user={this.state.currentUser}
          onLogout={this.handleLogout}
        />
        <ACPTabHeader
          activeTab={this.state.activeTab}
          tabs={tabs}
          onTabSelected={this.updateActiveTab}
        />
        <ACPTabContent
          lang={this.state.translations}
          activeTab={this.state.activeTab}
          acpData={this.state.acpData}
        />
        <ACPFooter />
      </div>
    );
  }
});

ReactDOM.render(
  <ACPBox />,
  document.getElementById('content')
);