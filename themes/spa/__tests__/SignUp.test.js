import renderer from 'react-test-renderer';
import SignUp from '../src/signUp';
import GuestUser from '../__mocks__/user-guest';
import LangEn from '../__mocks__/site-translate-en';

it('SignUp renders correctly', () => {
  let props1 = {
    user: GuestUser,
    lang: LangEn,
    onCurrentUserUpdated: () =>{}
  };
  const component1 = renderer.create(<SignUp
    {...props1}
  />);
  let tree1 = component1.toJSON();
  expect(tree1).toMatchSnapshot();
});