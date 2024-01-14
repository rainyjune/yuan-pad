import { useContext, useEffect } from 'react';
import UserContext from '../common/userContext';
import ACPOverview from './acp-overview';
import ACPConfig from './acp-config';
import ACPMessages from './acp-messages';
import ACPIpConfig from './acp-ipconfig';
import ACPUsers from './acp-users';
import { useSystemInfoDispatch } from '../common/SystemInfoContext';

function ACPTabContent(props: {
  onActiveTabChanged: (s: string) => void;
  activeTab: string;
  onConfigUpdated: () => void;
}) {
  const systemInfoDispatch = useSystemInfoDispatch();
  const user = useContext(UserContext);
  function handleActiveChange(newTab: string) {
    setTimeout(() => {
      props.onActiveTabChanged(newTab);
    }, 0);
  }
  useEffect(() => {
    systemInfoDispatch({
      type: 'loaded',
    });
  }, []);
  if (user.user_type !== 'admin') return null;

  return (
    <div className="tagContent">
      {props.activeTab === 'overview' && <ACPOverview />}
      {props.activeTab === 'siteset' && <ACPConfig onConfigUpdated={props.onConfigUpdated} />}
      {props.activeTab === 'message' && <ACPMessages onActiveTabChanged={handleActiveChange} />}
      {props.activeTab === 'ban_ip' && <ACPIpConfig />}
      {props.activeTab === 'user' && <ACPUsers />}
    </div>
  );
}

export default ACPTabContent;
