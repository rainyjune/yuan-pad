import React from 'react';

function AppFooter(props) {
  const ACPMarkup = () => {
    let ACP = (props.user && props.user.user_type === "admin") ? 
              "<a href='index.php?action=control_panel'>"+ props.lang.ACP+"</a>" 
              : '';
    return {
      __html: ACP
    };
  };
  return (
    <footer>
      <p>
        {props.appConfig.copyright_info}&nbsp;
        <a href={"mailto:" + props.appConfig.admin_email}>{props.lang.ADMIN_EMAIL}</a>&nbsp;
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