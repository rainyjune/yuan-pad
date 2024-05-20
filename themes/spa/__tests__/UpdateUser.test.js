import renderer from 'react-test-renderer';
import UpdateUser from '../src/front/updateUser';
import AdminUser from '../__mocks__/user-admin';
import RegularUser from '../__mocks__/user-regular';
import LangEn from '../__mocks__/site-translate-en';
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

it('UpdateUser renders correctly', () => {
  useTranslation.mockImplementation(() => ({
    data: LangEn,
    loadingError: undefined,
  }));
  useAppConfig.mockImplementation(() => ({
    data: SiteConfigOnline,
    loadingError: undefined,
  }));
  useUser.mockImplementation(() => ({
    user: AdminUser,
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

  const component1 = renderer.create(<UpdateUser />);
  let tree1 = component1.toJSON();
  expect(tree1).toMatchSnapshot();

  useUser.mockImplementation(() => ({
    user: RegularUser,
    isError: undefined,
  }));
  const component2 = renderer.create(<UpdateUser />);
  let tree2 = component2.toJSON();
  expect(tree2).toMatchSnapshot();
});
