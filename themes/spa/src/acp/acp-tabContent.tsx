import ACPOverview from './acp-overview';
import ACPConfig from './acp-config';
import ACPMessages from './acp-messages';
import ACPIpConfig from './acp-ipconfig';
import ACPUsers from './acp-users';

function ACPTabContent(props: any) {
  const handleActiveChange = (newTab: any) => {
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