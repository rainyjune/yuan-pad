import { useEffect, useState } from 'react';
import { createRoot  } from 'react-dom/client';

import ACPLogin from './acp/acp-login';
import ACPTabHeader from './acp/acp-tabHeader';
import ACPTabContent from './acp/acp-tabContent';
import ACPFooter from './acp/acp-footer';
import dataProvider from './common/dataProvider';
import Progress from './common/progress';
import OfflineWarning from './common/offlineMode';
import useStateCallback from './common/useStateCallback';
import { GetUserInfoResponse, ConfigResponse, TranslationResponse, IUser } from './common/types';

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap-theme.css";
import './css/acp.css';

function ACPBox() {
  const [loadingModalIsOpen, setLoadingModalIsOpen] = useStateCallback(true);
  const [systemInformation, setSystemInformation] = useStateCallback({});
  const [activeTab, setActiveTab] = useState('overview');
  const [appConfig, setAppConfig] = useStateCallback({});
  const [currentUser, setCurrentUser] = useStateCallback({});
  const [translations, setTranslations] = useStateCallback({});
  /**
   * Load application data after we verified the root user.
   */
  useEffect(() => {
    dataProvider.getAppConfig((res: ConfigResponse) => {
      if (res.statusCode === 200) {
        const siteConfig = res.response;
        dataProvider.getTranslations((res: TranslationResponse) => {
          setTranslations(res.response);
          setAppConfig(siteConfig);
          getUserInfo();
        });
      } else {
        // TODO Tell the user what's wrong.
        alert(res.statusText);
      }
    });
  }, [])

  const loadApplicationConfiguration = (successCallback = () => {}) => {
    dataProvider.getAppConfigACP((res: ConfigResponse) => {
      if (res.statusCode !== 200) {
        return ;
      }
      //this.setState({appConfig: }, successCallback);
      setAppConfig(res.response, () => {
        successCallback && successCallback();
      });
    });
  };
  /*
  const loadApplicationTranslation = (successCallback = () => {}) => {
    dataProvider.getTranslations((res: TranslationResponse) => {
      if (res.statusCode === 200) {
        //this.setState({translations: res.response}, successCallback);
        setTranslations(res.response, () => {
          successCallback && successCallback();
        })
      }
    });
  };
  */
  const loadApplicationSystemInformation = (successCallback = () => {}) => {
    dataProvider.getSystemInformation((res: ConfigResponse) => {
      if (res.statusCode === 200) {
        //this.setState({systemInformation: res.response}, successCallback);
        setSystemInformation(res.response, () => {
          successCallback && successCallback();
        })
      }
    });
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
    setAppConfig({}, () => {
      window.location.href = "index.php";
    })
  };
  // Get current user identity from server.
  const getUserInfo = () => {
    dataProvider.getUserInfo((res: GetUserInfoResponse) => {
      setLoadingModalIsOpen(false, () => {
        handleUserSignedIn(res.response);
      })
    });
  };
  const updateActiveTab = (newTabName: string) => {
    setActiveTab(newTabName);
    //this.setState({activeTab: newTabName});
  };
  // Update the `currentUser` state after a user signed in.
  const handleUserSignedIn = (userData: IUser) => {
    if (userData.user_type === "admin") {
      setCurrentUser(userData, () => {
        loadApplicationConfiguration(loadApplicationSystemInformation);
      });
    } else if (userData.user_type === "regular") {
      window.location.href = "index.php";
    } else {
      //this.setState({currentUser: userData});
      setCurrentUser(userData);
    }
  };
  const handleCommentDeleted = () => {
    loadApplicationSystemInformation();
  };
  const tabs = [
    {text: translations.ACP_OVERVIEW,value: "overview"},
    {text: translations.ACP_CONFSET,value: "siteset"},
    {text: translations.ACP_MANAGE_POST,value: "message"},
    {text: translations.ACP_MANAGE_IP,value: "ban_ip"},
    {text: translations.USER_ADMIN,value: "user"}
  ];
  const propsObj = {
    user: currentUser,
    lang: translations
  };
  return (
    <div id="acpBox">
      {
        (currentUser.user_type === undefined || currentUser.user_type === "guest") ?
          <ACPLogin
            {...propsObj}
            onCurrentUserUpdated={handleUserSignedIn}
          /> : null
      }
      <ACPTabHeader
        {...propsObj}
        activeTab={activeTab}
        tabs={tabs}
        onTabSelected={updateActiveTab}
        onUserLogout={handleLogout}
      />
      <OfflineWarning
        appConfig={appConfig}
        lang={translations}
      />
      <ACPTabContent
        {...propsObj}
        activeTab={activeTab}
        systemInformation={systemInformation}
        appConfig={appConfig}
        onActiveTabChanged={updateActiveTab}
        onConfigUpdated={handleConfigUpdate}
        onCommentDeleted={handleCommentDeleted}
      />
      <ACPFooter
        {...propsObj}
      />
      <Progress loadingModalIsOpen={loadingModalIsOpen} />
    </div>
  );
}

createRoot(document.getElementById('content') as Element).render(<ACPBox />);