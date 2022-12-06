import renderer from 'react-test-renderer';
import Footer from '../src/footer';
import NormalUser from '../__mocks__/user-regular';
import GuestUser from '../__mocks__/user-guest';
import AdminUser from '../__mocks__/user-admin';
import SiteConfig from '../__mocks__/app-config1';
import LangEn from '../__mocks__/site-translate-en';

it('Footer renders correctly', () => {
  const propsNormal = {
    user: NormalUser,
    appConfig: SiteConfig,
    lang: LangEn
  };
  const treeNormal = renderer.create(<Footer {...propsNormal} />).toJSON();
  expect(treeNormal).toMatchSnapshot();

  const propsGuest = {
    user: GuestUser,
    appConfig: SiteConfig,
    lang: LangEn
  };
  const treeGuest = renderer.create(<Footer {...propsGuest} />).toJSON();
  expect(treeGuest).toMatchSnapshot();

  const propsAdmin = {
    user: AdminUser,
    appConfig: SiteConfig,
    lang: LangEn
  };
  const treeAdmin = renderer.create(<Footer {...propsAdmin} />).toJSON();
  expect(treeAdmin).toMatchSnapshot();
})