import renderer from 'react-test-renderer';
import OfflineWarning from '../src/offlineMode';

import SiteConfigOnline from '../__mocks__/app-config1';
import SiteConfigOffline from '../__mocks__/app-config-offline';
import LangEn from '../__mocks__/site-translate-en';

it('Offline Warning renders correctly', () => {
  const tree = renderer.create(<OfflineWarning 
    appConfig={SiteConfigOnline}
    lang={LangEn}
  />).toJSON();

  expect(tree).toMatchSnapshot();

  const treeOffline = renderer.create(<OfflineWarning 
    appConfig={SiteConfigOffline}
    lang={LangEn}
  />).toJSON();

  expect(treeOffline).toMatchSnapshot();
});