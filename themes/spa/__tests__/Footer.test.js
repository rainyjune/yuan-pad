import renderer from 'react-test-renderer';
import Footer from '../src/front/footer';
import { useAppConfig, useTranslation, useUser } from '../src/common/dataHooks';
import translations from '../__mocks__/site-translate-en';
import config from '../__mocks__/app-config1';
import userGuest from '../__mocks__/user-guest';
import regularUser from '../__mocks__/user-regular';
import adminUser from '../__mocks__/user-admin';

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
    data: {},
    error: undefined,
  }))
}));

it('Footer renders correctly', () => {
  (useTranslation).mockImplementation(() => ({
    data: translations,
    loadingError: undefined,
  }));
  useAppConfig.mockImplementation(() => ({
    data: config,
    loadingError: undefined,
  }));
  useUser.mockImplementation(() => ({
    user: regularUser,
    isError: undefined,
  }));

  const treeNormal = renderer.create(<Footer />).toJSON();
  expect(treeNormal).toMatchSnapshot();


  useUser.mockImplementation(() => ({
    user: userGuest,
    isError: undefined,
  }));
  const treeGuest = renderer.create(<Footer />).toJSON();
  expect(treeGuest).toMatchSnapshot();

  useUser.mockImplementation(() => ({
    user: adminUser,
    isError: undefined,
  }));
  const treeAdmin = renderer.create(<Footer />).toJSON();
  expect(treeAdmin).toMatchSnapshot();
})