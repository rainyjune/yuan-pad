import React, { useRef } from 'react';
import ACPOverview from './acp-overview.js';
import ACPConfig from './acp-config.js';
import ACPMessages from './acp-messages.js';
import ACPIpConfig from './acp-ipconfig.js';
import ACPUsers from './acp-users.js';

function ACPTabContent(props) {
  const blackListRef = useRef(null);
  const handleActiveChange = (newTab) => {
    blackListRef.loadBlackList();
    setTimeout(()=>{
      props.onActiveTabChanged(newTab);
    }, 0);
  }
  if (props.user.user_type !== "admin") return null;

  return (
    <div className="tagContent">
      <ACPOverview 
        systemInformation={props.systemInformation}
        lang={props.lang}
        activeTab={props.activeTab}
      />
      <ACPConfig
        systemInformation={props.systemInformation}
        lang={props.lang}
        activeTab={props.activeTab}
        appConfig={props.appConfig}
        onConfigUpdated={props.onConfigUpdated}
      />
      <ACPMessages 
        lang={props.lang}
        activeTab={props.activeTab}
        systemInformation={props.systemInformation}
        onActiveTabChanged={handleActiveChange}
        onCommentDeleted={props.onCommentDeleted}
      />
      <ACPIpConfig
        ref={blackListRef}
        systemInformation={props.systemInformation}
        lang={props.lang}
        activeTab={props.activeTab}
      />
      <ACPUsers
        lang={props.lang}
        activeTab={props.activeTab}
      />
    </div>
  );
}

export default ACPTabContent;