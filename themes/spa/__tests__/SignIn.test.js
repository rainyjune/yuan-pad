import renderer from 'react-test-renderer';
import SignIn from '../src/signIn';
import GuestUser from '../__mocks__/user-guest';
import LangEn from '../__mocks__/site-translate-en';

it('SignIn renders correctly', () => {
  let props1 = {
    user: GuestUser,
    lang: LangEn,
    onCurrentUserUpdated: () =>{}
  };
  const component1 = renderer.create(<SignIn
    {...props1}
  />);
  let tree1 = component1.toJSON();
  expect(tree1).toMatchSnapshot();
});