import renderer from 'react-test-renderer';
import {
  useAppConfig,
  useTranslation,
  useAddComment,
  useUser,
  useSignIn,
  useSignUp,
  useLogoutUser,
  useUpdateUser,
} from '../src/common/dataHooks';
import SignUp from '../src/front/signUp';
import GuestUser from '../__mocks__/user-guest';
import LangEn from '../__mocks__/site-translate-en';

jest.mock('../src/common/dataHooks', () => ({
  useAppConfig: jest.fn(() => ({
    data: {},
    error: undefined,
  })),
  useTranslation: jest.fn(() => ({
    data: {},
    error: undefined,
  })),
  useUser: jest.fn(() => ({
    user: {},
    error: undefined,
  })),
  useAddComment: jest.fn(() => ({
    trigger: () => {},
  })),
  useSignIn: jest.fn(() => ({
    trigger: () => {},
  })),
  useSignUp: jest.fn(() => ({
    trigger: () => {},
  })),
  useLogoutUser: jest.fn(() => ({
    trigger: () => {},
  })),
  useUpdateUser: jest.fn(() => ({
    trigger: () => {},
  })),
}));

it('SignUp renders correctly', () => {
  useTranslation.mockImplementation(() => ({
    data: LangEn,
    loadingError: undefined,
  }));
  useAppConfig.mockImplementation(() => ({
    data: SiteConfigOnline,
    loadingError: undefined,
  }));
  useUser.mockImplementation(() => ({
    user: GuestUser,
    isError: undefined,
  }));
  useAddComment.mockImplementation(() => ({
    trigger: () => {},
  }));
  useSignIn.mockImplementation(() => ({
    trigger: () => {},
  }));
  useSignUp.mockImplementation(() => ({
    trigger: () => {},
  }));
  useLogoutUser.mockImplementation(() => ({
    trigger: () => {},
  }));
  useUpdateUser.mockImplementation(() => ({
    trigger: () => {},
  }));

  const component1 = renderer.create(<SignUp />);
  let tree1 = component1.toJSON();
  expect(tree1).toMatchSnapshot();
});
