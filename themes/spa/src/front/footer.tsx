import { useAppConfig, useUser, useTranslation } from '../common/dataHooks';
import rssURL from '../images/rss-icon.png';

function AppFooter() {
  const { data: appConfig } = useAppConfig();
  const { user: user } = useUser();
  const { data: lang } = useTranslation();
  function ACPMarkup() {
    const ACP = user?.user_type === 'admin' ? "<a href='index.php?action=control_panel'>" + lang.ACP + '</a>' : '';
    return {
      __html: ACP,
    };
  }
  return (
    <footer>
      <p>
        {appConfig.copyright_info}&nbsp;
        <a href={'mailto:' + appConfig.admin_email}>{lang.ADMIN_EMAIL}</a>&nbsp;
        <span dangerouslySetInnerHTML={ACPMarkup()}></span>
      </p>
      <p>
        Powered by{' '}
        <a href="https://github.com/rainyjune/yuan-pad" target="_blank" title="Find More">
          YuanPad
        </a>
        &nbsp;
        <a href="index.php?action=rss">
          <img src={rssURL} alt="rss" />
        </a>
      </p>
    </footer>
  );
}

export default AppFooter;
