import renderer from 'react-test-renderer';
import Header from '../src/front/header';
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
import userGuest from '../__mocks__/user-guest';
import AdminUser from '../__mocks__/user-admin';
import config from '../__mocks__/app-config1';
import translations from '../__mocks__/site-translate-en';
import userRegular from '../__mocks__/user-regular';

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

it('Render Header correctly', () => {
  useTranslation.mockImplementation(() => ({
    data: translations,
    loadingError: undefined,
  }));
  useAppConfig.mockImplementation(() => ({
    data: config,
    loadingError: undefined,
  }));
  useUser.mockImplementation(() => ({
    user: userGuest,
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

  const tree = renderer.create(<Header />).toJSON();

  expect(tree).toMatchSnapshot();

  useUser.mockImplementation(() => ({
    user: AdminUser,
    isError: undefined,
  }));
  const treeAdmin = renderer.create(<Header />).toJSON();

  expect(treeAdmin).toMatchSnapshot();

  useUser.mockImplementation(() => ({
    user: userRegular,
    isError: undefined,
  }));

  const treeRegular = renderer.create(<Header />).toJSON();

  expect(treeRegular).toMatchSnapshot();
});
