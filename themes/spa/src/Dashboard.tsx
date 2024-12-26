import { useState } from 'react';
import { useAppConfig, useUser } from './common/dataHooks';

import ACPLogin from './acp/acp-login';
import ACPTabHeader from './acp/acp-tabHeader';
import ACPTabContent from './acp/acp-tabContent';
import ACPFooter from './acp/acp-footer';
import Progress from './common/progress';
import OfflineWarning from './common/offlineMode';

import './css/acp.css';

function ACPBox() {
  const {
    data: { site_close = 0 },
  } = useAppConfig();
  const { user: currentUser, isLoading: currentUserIsLoading } = useUser();
  const isSiteClosed = site_close == 1;
  const [activeTab, setActiveTab] = useState('overview');

  function updateActiveTab(newTabName: string) {
    setActiveTab(newTabName);
  }

  if (currentUser.user_type === 'guest') {
    return <ACPLogin />;
  } else if (currentUser.user_type !== 'admin') {
    // TODO: a more user friendly UI
    return <p>You are not the admin user, please go back to the index page.</p>;
  }

  return (
    <div id="acpBox">
      <ACPTabHeader activeTab={activeTab} onTabSelected={updateActiveTab} />
      {isSiteClosed && <OfflineWarning />}
      <ACPTabContent activeTab={activeTab} onActiveTabChanged={updateActiveTab} />
      <ACPFooter />
      <Progress loadingModalIsOpen={currentUserIsLoading} />
    </div>
  );
}

export default ACPBox;
