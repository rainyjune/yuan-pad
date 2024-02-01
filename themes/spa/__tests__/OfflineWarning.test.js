import renderer from 'react-test-renderer';
import OfflineWarning from '../src/common/offlineMode';
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
import SiteConfigOnline from '../__mocks__/app-config1';
import SiteConfigOffline from '../__mocks__/app-config-offline';
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

it('Offline Warning renders correctly', () => {
  useTranslation.mockImplementation(() => ({
    data: LangEn,
    loadingError: undefined,
  }));
  useAppConfig.mockImplementation(() => ({
    data: SiteConfigOnline,
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

  const tree = renderer.create(<OfflineWarning />).toJSON();

  expect(tree).toMatchSnapshot();

  useAppConfig.mockImplementation(() => ({
    data: SiteConfigOffline,
    loadingError: undefined,
  }));

  const treeOffline = renderer.create(<OfflineWarning />).toJSON();

  expect(treeOffline).toMatchSnapshot();
});
