import { useContext } from 'react';
import UserContext from '../common/userContext';
import ACPOverview from './acp-overview';
import ACPConfig from './acp-config';
import ACPMessages from './acp-messages';
import ACPIpConfig from './acp-ipconfig';
import ACPUsers from './acp-users';

function ACPTabContent(props: {
  onActiveTabChanged: (s: string) => void;
  systemInformation: object;
  activeTab: string;
  onConfigUpdated: () => void;
  onCommentDeleted: () => void;
}) {
  const user = useContext(UserContext);
  function handleActiveChange(newTab: string) {
    setTimeout(() => {
      props.onActiveTabChanged(newTab);
    }, 0);
  }
  if (user.user_type !== 'admin') return null;

  return (
    <div className="tagContent">
      {props.activeTab === 'overview' && <ACPOverview systemInformation={props.systemInformation} />}
      {props.activeTab === 'siteset' && (
        <ACPConfig systemInformation={props.systemInformation} onConfigUpdated={props.onConfigUpdated} />
      )}
      {props.activeTab === 'message' && (
        <ACPMessages
          systemInformation={props.systemInformation}
          onActiveTabChanged={handleActiveChange}
          onCommentDeleted={props.onCommentDeleted}
        />
      )}
      {props.activeTab === 'ban_ip' && <ACPIpConfig systemInformation={props.systemInformation} />}
      {props.activeTab === 'user' && <ACPUsers />}
    </div>
  );
}

export default ACPTabContent;
