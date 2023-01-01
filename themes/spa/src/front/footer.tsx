import React, { useContext } from 'react';
import AppConfigContext from '../common/appConfigContext';
import UserContext from '../common/userContext';
import LanguageContext from '../common/languageContext';

function AppFooter(props: any) {
  const appConfig: any = useContext(AppConfigContext);
  const user: any = useContext(UserContext);
  const lang: any = useContext(LanguageContext);
  const ACPMarkup = () => {
    let ACP = (user && user.user_type === "admin") ? 
              "<a href='index.php?action=control_panel'>"+ lang.ACP+"</a>" 
              : '';
    return {
      __html: ACP
    };
  };
  return (
    <footer>
      <p>
        {appConfig.copyright_info}&nbsp;
        <a href={"mailto:" + appConfig.admin_email}>{lang.ADMIN_EMAIL}</a>&nbsp;
        <span dangerouslySetInnerHTML={ACPMarkup()}></span>
      </p>
      <p>
        Powered by <a href="https://github.com/rainyjune/yuan-pad" target="_blank" title="Find More">YuanPad</a>&nbsp;
        <a href="index.php?action=rss"><img src="misc/images/rss-icon.png" alt="rss" /></a>
      </p>
    </footer>
  );
}

export default AppFooter;