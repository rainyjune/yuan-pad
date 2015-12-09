var React = require('react');
var ACPOverview = require('./acp-overview.js');
var ACPConfig = require('./acp-config.js');
var ACPMessages = require('./acp-messages.js');
var ACPIpConfig = require('./acp-ipconfig.js');
var ACPUsers = require('./acp-users.js');

var ACPTabContent = React.createClass({
  render: function() {
    if (!this.props.user.admin) return null;

    return (
      <div className="tagContent">
        <ACPOverview 
          acpData={this.props.acpData}
          lang={this.props.lang}
          activeTab={this.props.activeTab}
        />
        <ACPConfig
          acpData={this.props.acpData}
          lang={this.props.lang}
          activeTab={this.props.activeTab}
          appConfig={this.props.appConfig}
          onConfigUpdated={this.props.onConfigUpdated}
        />
        <ACPMessages 
          lang={this.props.lang}
          activeTab={this.props.activeTab}
        />
        <ACPIpConfig 
          lang={this.props.lang}
          activeTab={this.props.activeTab}
        />
        <ACPUsers
          lang={this.props.lang}
          activeTab={this.props.activeTab}
        />
      </div>
    );
  }
});

module.exports = ACPTabContent;