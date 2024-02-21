import { useAppConfig, useTranslation, useAddComment, useUser } from '../../src/common/dataHooks';
import translations from '../../__mocks__/site-translate-en';
import config from '../../__mocks__/app-config1';
import userGuest from '../../__mocks__/user-guest';

jest.mock('../../src/common/dataHooks', () => ({
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
}));

(useTranslation).mockImplementation(() => ({
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
(useAddComment).mockImplementation(() => ({
  trigger: () => {}
}));