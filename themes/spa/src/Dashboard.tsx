import { useState } from 'react';
import { useAppConfigACP, useUser, useTranslation } from './common/dataHooks';

import ACPLogin from './acp/acp-login';
import ACPTabHeader from './acp/acp-tabHeader';
import ACPTabContent from './acp/acp-tabContent';
import ACPFooter from './acp/acp-footer';
import Progress from './common/progress';
import OfflineWarning from './common/offlineMode';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './css/acp.css';

function ACPBox() {
  const { isLoading: appConfigIsLoading } = useAppConfigACP();
  const { user: currentUser, isLoading: currentUserIsLoading } = useUser();
  const { data: translations, isLoading: translationsIsLoading } = useTranslation();
  const [activeTab, setActiveTab] = useState('overview');

  // Update the `currentUser` state to default value.
  function handleLogout() {
    // Navigates to the index.php page after signed out.
    window.location.href = 'index.php';
  }

  function updateActiveTab(newTabName: string) {
    setActiveTab(newTabName);
  }

  const tabs = [
    { text: translations.ACP_OVERVIEW, value: 'overview' },
    { text: translations.ACP_CONFSET, value: 'siteset' },
    { text: translations.ACP_MANAGE_POST, value: 'message' },
    { text: translations.ACP_MANAGE_IP, value: 'ban_ip' },
    { text: translations.USER_ADMIN, value: 'user' },
  ];
  return (
    <div id="acpBox">
      {(currentUser.user_type === undefined || currentUser.user_type === 'guest') && <ACPLogin />}
      <ACPTabHeader activeTab={activeTab} tabs={tabs} onTabSelected={updateActiveTab} onUserLogout={handleLogout} />
      <OfflineWarning />
      <ACPTabContent activeTab={activeTab} onActiveTabChanged={updateActiveTab} />
      <ACPFooter />
      <Progress loadingModalIsOpen={appConfigIsLoading || currentUserIsLoading || translationsIsLoading} />
    </div>
  );
}

export default ACPBox;
