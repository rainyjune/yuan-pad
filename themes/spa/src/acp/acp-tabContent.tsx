import { useContext } from 'react';
import UserContext from '../common/userContext';
import ACPOverview from './acp-overview';
import ACPConfig from './acp-config';
import ACPMessages from './acp-messages';
import ACPIpConfig from './acp-ipconfig';
import ACPUsers from './acp-users';

function ACPTabContent(props: any) {
  const user = useContext(UserContext);
  const handleActiveChange = (newTab: any) => {
    setTimeout(()=>{
      props.onActiveTabChanged(newTab);
    }, 0);
  }
  if (user.user_type !== "admin") return null;

  return (
    <div className="tagContent">
      <ACPOverview 
        systemInformation={props.systemInformation}
        isActive={props.activeTab === 'overview'}
      />
      <ACPConfig
        systemInformation={props.systemInformation}
        isActive={props.activeTab === 'siteset'}
        appConfig={props.appConfig}
        onConfigUpdated={props.onConfigUpdated}
      />
      <ACPMessages 
        isActive={props.activeTab === 'message'}
        systemInformation={props.systemInformation}
        onActiveTabChanged={handleActiveChange}
        onCommentDeleted={props.onCommentDeleted}
      />
      <ACPIpConfig
        systemInformation={props.systemInformation}
        isActive={props.activeTab === 'ban_ip'}
      />
      <ACPUsers
        isActive={props.activeTab === 'user'}
      />
    </div>
  );
}

export default ACPTabContent;