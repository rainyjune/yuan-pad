let React = require('react');
let ACPOverview = require('./acp-overview.js'),
    ACPConfig = require('./acp-config.js'),
    ACPMessages = require('./acp-messages.js'),
    ACPIpConfig = require('./acp-ipconfig.js'),
    ACPUsers = require('./acp-users.js');

let ACPTabContent = React.createClass({
  render() {
    if (this.props.user.user_type !== "admin") return null;

    return (
      <div className="tagContent">
        <ACPOverview 
          systemInformation={this.props.systemInformation}
          lang={this.props.lang}
          activeTab={this.props.activeTab}
        />
        <ACPConfig
          systemInformation={this.props.systemInformation}
          lang={this.props.lang}
          activeTab={this.props.activeTab}
          appConfig={this.props.appConfig}
          onConfigUpdated={this.props.onConfigUpdated}
        />
        <ACPMessages 
          lang={this.props.lang}
          activeTab={this.props.activeTab}
          systemInformation={this.props.systemInformation}
          onActiveTabChanged={this.props.onActiveTabChanged}
          onCommentDeleted={this.props.onCommentDeleted}
        />
        <ACPIpConfig
          systemInformation={this.props.systemInformation}
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