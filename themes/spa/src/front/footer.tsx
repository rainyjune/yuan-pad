import { MouseEvent } from 'react';
import { useAppConfig, useUser, useTranslation } from '../common/dataHooks';

function AppFooter() {
  const { data: appConfig } = useAppConfig();
  const { user: user } = useUser();
  const { data: lang } = useTranslation();

  return (
    <footer>
      <p>
        {appConfig.copyright_info}&nbsp;
        <a href={'mailto:' + appConfig.admin_email}>{lang.ADMIN_EMAIL}</a>&nbsp;
        {user.user_type === 'admin' && (
          <span>
            <a
              href="#"
              onClick={(e: MouseEvent) => {
                const href = window.location.port === '8000' ? '/admin' : './index.php?action=control_panel';
                (e.target as HTMLAnchorElement).href = href;
              }}
            >
              {lang.ACP}
            </a>
          </span>
        )}
      </p>
      <p>
        Powered by{' '}
        <a href="https://github.com/rainyjune/yuan-pad" target="_blank" title="Find More">
          YuanPad
        </a>{' '}
        <a href="index.php?action=rss">
          <img
            title="RSS"
            src={'./themes/spa/templates/images/rss-icon.png'} // For production
            alt="RSS"
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = './images/rss-icon.png'; // For development
            }}
          />
        </a>
      </p>
    </footer>
  );
}

export default AppFooter;
