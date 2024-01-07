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
        isActive={props.activeTab === 'overview'}
      />
      <ACPConfig
        systemInformation={props.systemInformation}
        lang={props.lang}
        isActive={props.activeTab === 'siteset'}
        appConfig={props.appConfig}
        onConfigUpdated={props.onConfigUpdated}
      />
      <ACPMessages 
        lang={props.lang}
        isActive={props.activeTab === 'message'}
        systemInformation={props.systemInformation}
        onActiveTabChanged={handleActiveChange}
        onCommentDeleted={props.onCommentDeleted}
      />
      <ACPIpConfig
        systemInformation={props.systemInformation}
        lang={props.lang}
        isActive={props.activeTab === 'ban_ip'}
      />
      <ACPUsers
        lang={props.lang}
        isActive={props.activeTab === 'user'}
      />
    </div>
  );
}

export default ACPTabContent;