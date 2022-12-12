import React from 'react';
import ReactDOM from 'react-dom';

import ACPLogin from './acp-login.js';
import ACPTabHeader from './acp-tabHeader.js';
import ACPTabContent from './acp-tabContent.js';
import ACPFooter from './acp-footer.js';
import dataProvider from './dataProvider.js';
import Progress from './progress.js';
import OfflineWarning from './offlineMode.js';

class ACPBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loadingModalIsOpen: true,
      systemInformation: {}, // System information
      activeTab: 'overview',
      appConfig: {}, // App config, including filter words.
      currentUser: {},
      translations: {}
    };
    this._isMounted = false;
    this.updateActiveTab = this.updateActiveTab.bind(this);
    this.handleConfigUpdate = this.handleConfigUpdate.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }
  /**
   * Load application data after we verified the root user.
   */
  componentDidMount() {
    this._isMounted = true;
    dataProvider.getAppConfig(res => {
      if (res.statusCode === 200) {
        let siteConfig = res.response;
        dataProvider.getTranslations(res => {
          if (this._isMounted) {
            this.setState({translations: res.response, appConfig: siteConfig});
          }
          this.getUserInfo();
        });
      } else {
        // TODO Tell the user what's wrong.
        alert(res.statusText);
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  loadApplicationConfiguration(successCallback) {
    dataProvider.getAppConfigACP(res => {
      if (res.statusCode !== 200) {
        return ;
      }
      this.setState({appConfig: res.response}, successCallback);
    });
  }
  loadApplicationTranslation(successCallback) {
    dataProvider.getTranslations(res => {
      if (res.statusCode === 200) {
        this.setState({translations: res.response}, successCallback);
      }
    });
  }
  loadApplicationSystemInformation(successCallback) {
    dataProvider.getSystemInformation(res => {
      if (res.statusCode === 200) {
        this.setState({systemInformation: res.response}, successCallback);
      }
    });
  }
  
  /**
   * Tested 1.
   */
  // Reload site configuration after being updated by admin user.
  handleConfigUpdate() {
    this.loadApplicationConfiguration();
  }
  // Update the `currentUser` state to default value.
  handleLogout() {
    if (this._isMounted) {
      // Navigates to the index.php page after signed out.
      this.setState({ currentUser: {}, appConfig: {} }, function(){
        window.location = "index.php";
      });
    }
  }
  // Get current user identity from server.
  getUserInfo() {
    dataProvider.getUserInfo(res => {
      this.setState({loadingModalIsOpen: false});
      if (this._isMounted) {
        this.handleUserSignedIn(res.response);
      }
    });
  }
  updateActiveTab(newTabName) {
    this.setState({activeTab: newTabName});
  }
  // Update the `currentUser` state after a user signed in.
  handleUserSignedIn(userData) {
    if (userData.user_type === "admin") {
      this.setState({currentUser: userData}, () => {this.loadApplicationConfiguration(this.loadApplicationSystemInformation);});
    } else if (userData.user_type === "regular") {
      window.location = "index.php";
    } else {
      this.setState({currentUser: userData});
    }
  }
  handleCommentDeleted() {
    this.loadApplicationSystemInformation();
  }
  render() {
    let state = this.state,
        translations = state.translations,
        tabs = [
          {text: translations.ACP_OVERVIEW,value: "overview"},
          {text: translations.ACP_CONFSET,value: "siteset"},
          {text: translations.ACP_MANAGE_POST,value: "message"},
          {text: translations.ACP_MANAGE_IP,value: "ban_ip"},
          {text: translations.USER_ADMIN,value: "user"}
        ],
        props = {
          user: state.currentUser,
          lang: state.translations
        };
    return (
      <div id="acpBox">
        {
          (state.currentUser.user_type === undefined || state.currentUser.user_type === "guest") ?
            <ACPLogin
              {...props}
              onCurrentUserUpdated={this.handleUserSignedIn}
            /> : null
        }
        <ACPTabHeader
          {...props}
          activeTab={this.state.activeTab}
          tabs={tabs}
          onTabSelected={this.updateActiveTab}
          onUserLogout={this.handleLogout}
        />
        <OfflineWarning 
          appConfig={state.appConfig}
          lang={translations}
        />
        <ACPTabContent
          {...props}
          activeTab={this.state.activeTab}
          systemInformation={this.state.systemInformation}
          appConfig={this.state.appConfig}
          onActiveTabChanged={this.updateActiveTab}
          onConfigUpdated={this.handleConfigUpdate}
          onCommentDeleted={this.handleCommentDeleted}
        />
        <ACPFooter
          {...props}
        />
        <Progress loadingModalIsOpen={this.state.loadingModalIsOpen} />
      </div>
    );
  }
}

ReactDOM.render(
  <ACPBox />,
  document.getElementById('content')
);