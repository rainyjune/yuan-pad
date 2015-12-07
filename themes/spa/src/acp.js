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
    this.getAppConfig(function(data){
      if (this.isMounted()) {
        this.setState({translations: data.translations});
        // TODO Duplicate data.
        this.setState({appConfig: data});
      }
      this.getUserInfo();
      dataProvider.getACPData(function(data){
        this.setState({
          acpData: data
        });
      }.bind(this));
    });
  },
  // TODO Reuse
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
  // TODO Reuse
  handleLogout: function() {
    yuanjs.ajax({
      type: "GET",
      url: 'api.php',
      data: {controller: 'user', action: "logout"},
      cache: false,
      //dataType: "json",
      success: function(data){
        if (this.isMounted()) {
          this.setState({ currentUser: {} });
        }
      }.bind(this),
      error: function(){
        debugger;
      }.bind(this) 
    });
  },
  // TODO reuse.
  getUserInfo: function() {
    yuanjs.ajax({
      type: "GET",
      url: 'index.php?controller=user&action=getUserInfo',
      dataType: 'json',
      cache: false,
      dataType: "json",
      success: function(data){
        console.log('user info:', data);
        if (Object.prototype.toString.call(data) === "[object Array]") {
          data = {};
        }
        if (this.isMounted()) {
          this.setState({currentUser: data}, function(){
            //this.loadCommentsFromServer();
          });
        }
      }.bind(this),
      error: function(){
      }.bind(this) 
    });
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