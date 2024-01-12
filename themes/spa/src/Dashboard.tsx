import { useEffect, useState } from 'react';
import UserContext from './common/userContext';
import LanguageContext from './common/languageContext';
import AppConfigContext from './common/appConfigContext';

import ACPLogin from './acp/acp-login';
import ACPTabHeader from './acp/acp-tabHeader';
import ACPTabContent from './acp/acp-tabContent';
import ACPFooter from './acp/acp-footer';
import dataProvider from './common/dataProvider';
import Progress from './common/progress';
import OfflineWarning from './common/offlineMode';
import useStateCallback from './common/useStateCallback';
import { IConfigParams, IUser } from './common/types';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './css/acp.css';

const initialAppConfig = {
  board_name: '',
  site_close: '0',
  close_reason: '',
  admin_email: '',
  copyright_info: '',
  valid_code_open: '0',
  page_on: '0',
  num_perpage: 0,
  theme: '',
  admin: '',
  lang: '',
  timezone: '0',
  filter_type: 1,
  allowed_tags: '',
};

function ACPBox() {
  const [loadingModalIsOpen, setLoadingModalIsOpen] = useStateCallback(true);
  const [systemInformation, setSystemInformation] = useStateCallback({});
  const [activeTab, setActiveTab] = useState('overview');
  const [appConfig, setAppConfig] = useState<IConfigParams>(initialAppConfig);
  const [currentUser, setCurrentUser] = useStateCallback({});
  const [translations, setTranslations] = useStateCallback({});
  /**
   * Load application data after we verified the root user.
   */
  useEffect(() => {
    dataProvider.getAppConfig().then((res) => {
      if (res.status === 200 && res.data.statusCode === 200) {
        const siteConfig = res.data.response;
        dataProvider.getTranslations().then((res) => {
          setTranslations(res.data.response);
          setAppConfig(siteConfig);
          getUserInfo();
        });
      } else {
        alert(res.data.statusText);
      }
    });
  }, []);

  const loadApplicationConfiguration = async (successCallback = () => {}) => {
    const res = await dataProvider.getAppConfigACP();
    if (res.status === 200 && res.data.statusCode === 200) {
      setAppConfig(res.data.response);
      successCallback && successCallback();
    } else {
      alert(res.data.statusText);
    }
  };
  const loadApplicationSystemInformation = async (successCallback = () => {}) => {
    const res = await dataProvider.getSystemInformation();
    if (res.status === 200 && res.data.statusCode === 200) {
      setSystemInformation(res.data.response, () => {
        successCallback && successCallback();
      });
    } else {
      alert(res.data.statusText);
    }
  };

  /**
   * Tested 1.
   */
  // Reload site configuration after being updated by admin user.
  const handleConfigUpdate = () => {
    loadApplicationConfiguration();
  };
  // Update the `currentUser` state to default value.
  const handleLogout = () => {
    // Navigates to the index.php page after signed out.
    setCurrentUser({});
    setAppConfig(initialAppConfig);
    window.location.href = 'index.php';
  };
  // Get current user identity from server.
  const getUserInfo = async () => {
    const res = await dataProvider.getUserInfo();
    setLoadingModalIsOpen(false, () => {
      handleUserSignedIn(res.data.response);
    });
  };
  const updateActiveTab = (newTabName: string) => {
    setActiveTab(newTabName);
  };
  // Update the `currentUser` state after a user signed in.
  const handleUserSignedIn = (userData: IUser) => {
    if (userData.user_type === 'admin') {
      setCurrentUser(userData, () => {
        loadApplicationConfiguration(loadApplicationSystemInformation);
      });
    } else if (userData.user_type === 'regular') {
      window.location.href = 'index.php';
    } else {
      //this.setState({currentUser: userData});
      setCurrentUser(userData);
    }
  };
  const handleCommentDeleted = () => {
    loadApplicationSystemInformation();
  };
  const tabs = [
    { text: translations.ACP_OVERVIEW, value: 'overview' },
    { text: translations.ACP_CONFSET, value: 'siteset' },
    { text: translations.ACP_MANAGE_POST, value: 'message' },
    { text: translations.ACP_MANAGE_IP, value: 'ban_ip' },
    { text: translations.USER_ADMIN, value: 'user' },
  ];
  return (
    <AppConfigContext.Provider value={appConfig}>
      <UserContext.Provider value={currentUser}>
        <LanguageContext.Provider value={translations}>
          <div id="acpBox">
            {currentUser.user_type === undefined || currentUser.user_type === 'guest' ? (
              <ACPLogin onCurrentUserUpdated={handleUserSignedIn} />
            ) : null}
            <ACPTabHeader
              activeTab={activeTab}
              tabs={tabs}
              onTabSelected={updateActiveTab}
              onUserLogout={handleLogout}
            />
            <OfflineWarning />
            <ACPTabContent
              activeTab={activeTab}
              systemInformation={systemInformation}
              onActiveTabChanged={updateActiveTab}
              onConfigUpdated={handleConfigUpdate}
              onCommentDeleted={handleCommentDeleted}
            />
            <ACPFooter />
            <Progress loadingModalIsOpen={loadingModalIsOpen} />
          </div>
        </LanguageContext.Provider>
      </UserContext.Provider>
    </AppConfigContext.Provider>
  );
}

export default ACPBox;
