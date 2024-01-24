import ACPOverview from './acp-overview';
import ACPConfig from './acp-config';
import ACPMessages from './acp-messages';
import ACPIpConfig from './acp-ipconfig';
import ACPUsers from './acp-users';

function ACPTabContent(props: { onActiveTabChanged: (s: string) => void; activeTab: string }) {
  function handleActiveChange(newTab: string) {
    setTimeout(() => {
      props.onActiveTabChanged(newTab);
    }, 0);
  }

  return (
    <div className="tagContent">
      {props.activeTab === 'overview' && <ACPOverview />}
      {props.activeTab === 'siteset' && <ACPConfig />}
      {props.activeTab === 'message' && <ACPMessages onActiveTabChanged={handleActiveChange} />}
      {props.activeTab === 'ban_ip' && <ACPIpConfig />}
      {props.activeTab === 'user' && <ACPUsers />}
    </div>
  );
}

export default ACPTabContent;
