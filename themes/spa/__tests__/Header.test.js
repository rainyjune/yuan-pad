import renderer from 'react-test-renderer';
import Header from '../src/header';
import GuestUser from '../__mocks__/user-guest';
import AdminUser from '../__mocks__/user-admin';
import RegularUser from '../__mocks__/user-regular';
import SiteConfig from '../__mocks__/app-config1';
import LangEn from '../__mocks__/site-translate-en';

it('Render Header correctly', () => {
  const props = {
    user: GuestUser,
    appConfig: SiteConfig,
    lang: LangEn
  };
  const tree = renderer.create(<Header
    {...props}
    onCurrentUserUpdated={() => {}}
  />).toJSON();

  expect(tree).toMatchSnapshot();

  const propsAdmin = {
    ...props,
    user: AdminUser
  };
  const treeAdmin = renderer.create(<Header
    {...propsAdmin}
    onCurrentUserUpdated={() => {}}
  />).toJSON();

  expect(treeAdmin).toMatchSnapshot();

  const propsRegular = {
    ...props,
    user: RegularUser
  };
  const treeRegular = renderer.create(<Header
    {...propsRegular}
    onCurrentUserUpdated={() => {}}
  />).toJSON();

  expect(treeRegular).toMatchSnapshot();
})