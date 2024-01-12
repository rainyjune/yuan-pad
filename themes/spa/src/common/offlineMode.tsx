import { useContext } from 'react';
import LanguageContext from '../common/languageContext';
import AppConfigContext from './appConfigContext';
function Offline() {
  const appConfig = useContext(AppConfigContext);
  const lang = useContext(LanguageContext);
  return (
    <p
      className="bg-warning"
      style={{
        display: appConfig.site_close == 1 ? 'block' : 'none',
      }}
    >
      {lang.OFFLINE_WARNING}
    </p>
  );
}

export default Offline;
