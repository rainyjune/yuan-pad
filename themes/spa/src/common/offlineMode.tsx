import { useAppConfig, useTranslation } from './dataHooks';

function Offline() {
  const { data: appConfig } = useAppConfig();
  const { data: lang } = useTranslation();
  return (
    <p
      className="bg-warning"
      style={{
        display: appConfig?.site_close == 1 ? 'block' : 'none',
      }}
    >
      {lang.OFFLINE_WARNING}
    </p>
  );
}

export default Offline;
