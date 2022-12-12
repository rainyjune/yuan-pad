import React from 'react';
import ACPOverview from './acp-overview.js';
import ACPConfig from './acp-config.js';
import ACPMessages from './acp-messages.js';
import ACPIpConfig from './acp-ipconfig.js';
import ACPUsers from './acp-users.js';

class ACPTabContent extends React.Component {
  constructor(props) {
    super(props);
    this.handleActiveChange = this.handleActiveChange.bind(this);
  }
  handleActiveChange(newTab) {
    this.refs.blackListPanel.loadBlackList();
    setTimeout(()=>{
      this.props.onActiveTabChanged(newTab);
    }, 0);
  }
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
          onActiveTabChanged={this.handleActiveChange}
          onCommentDeleted={this.props.onCommentDeleted}
        />
        <ACPIpConfig
          ref="blackListPanel"
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
}

export default ACPTabContent;