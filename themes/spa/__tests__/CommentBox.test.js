import renderer from 'react-test-renderer';
import { useAppConfig, useTranslation, useAddComment, useUser } from '../src/common/dataHooks';
import CommentBox from '../src/front/commentBox';
import translations from '../__mocks__/site-translate-en';
import config from '../__mocks__/app-config1';
import userGuest from '../__mocks__/user-guest';

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
}));

it('CommentBox renders correctly', () => {
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
  const comments = [
    {
        "id": 3,
        "ip": "::1",
        "uid": null,
        "uname": "admin",
        "post_content": "abc",
        "time": "2022-12-05 22:44",
        "reply_id": null,
        "reply_content": "",
        "reply_time": "01-01 08:00",
        "b_username": null
    },
    {
        "id": 2,
        "ip": "::1",
        "uid": null,
        "uname": "admin",
        "post_content": "k",
        "time": "2022-12-05 16:02",
        "reply_id": "1",
        "reply_content": "k reply",
        "reply_time": "12-05 16:22",
        "b_username": null
    },
    {
        "id": 1,
        "ip": "::1",
        "uid": null,
        "uname": "rainyjune",
        "post_content": "Welcome to our site.",
        "time": "2022-12-05 15:57",
        "reply_id": null,
        "reply_content": "",
        "reply_time": "01-01 08:00",
        "b_username": null
    }
  ];
  const component = renderer.create(<CommentBox
      onCommentCreated={() => {}}
      onPageChanged={(n) => {}}
      onCloseSearch={() => {}}
      searchText=''
      isSearch={false}
      commentsData={ {
        currentPage: 1,
        commentListType: 1,
        comments: comments,
        commentsTotalNumber: comments.length
      }}
  />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});