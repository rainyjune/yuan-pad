import renderer from 'react-test-renderer';
import SignOut from '../src/signOut';
import AdminUser from '../__mocks__/user-admin';
import RegularUser from '../__mocks__/user-regular';
import LangEn from '../__mocks__/site-translate-en';

it('SignOut renders correctly', () => {
  let props1 = {
    user: AdminUser,
    lang: LangEn,
    onCurrentUserUpdated: () =>{}
  };
  const component1 = renderer.create(<SignOut
    {...props1}
  />);
  let tree1 = component1.toJSON();
  expect(tree1).toMatchSnapshot();

  let props2 = {
    user: RegularUser,
    lang: LangEn,
    onCurrentUserUpdated: () =>{}
  };
  const component2 = renderer.create(<SignOut
    {...props2}
  />);
  let tree2 = component2.toJSON();
  expect(tree2).toMatchSnapshot();
});