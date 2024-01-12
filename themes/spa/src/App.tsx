import { useEffect, useState, useRef } from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './css/style.css';

import SearchBar from './front/searchBar';
import CommentBox from './front/commentBox';
import Header from './front/header';
import Footer from './front/footer';
import dataProvider from './common/dataProvider';
import Progress from './common/progress';
import OfflineWarning from './common/offlineMode';
import AppConfigContext from './common/appConfigContext';
import UserContext from './common/userContext';
import LanguageContext from './common/languageContext';
import {
  GetUserInfoResponse,
  PostListResponse,
  SearchResponse,
  IConfigParams,
  ConfigResponse,
  TranslationResponse,
  IUser,
  IComment,
} from './common/types';

export default function App() {
  const didMount = useRef(false);
  const [loadingModalIsOpen, setLoadingModalIsOpen] = useState(true);
  const [appConfig, setAppConfig] = useState<IConfigParams>({
    board_name: '',
    site_close: '0',
    close_reason: '',
    admin_email: '',
    copyright_info: '',
    valid_code_open: '0',
    page_on: '0',
    num_perpage: 0,
    theme: '',
    admin: '',
    lang: '',
    timezone: '0',
    filter_type: 1,
    allowed_tags: '',
  });
  const [comments, setComments] = useState<Array<IComment>>([]);
  const [commentsTotalNumber, setcommentsTotalNumber] = useState(0); // The total number of all comments or filtered comments.
  const [commentListType, setCommentListType] = useState(1); // 1: Default list. 2: Search Result list
  const [currentPage, setCurrentPage] = useState(0);
  const [currentUser, setCurrentUser1] = useState<IUser>({
    uid: -1,
    user_type: 'guest',
    username: '',
    email: '',
  });
  const [searchText, setSearchText] = useState(''); // The search keyword
  const [translations, setTranslations] = useState({});

  // Get current user identity from server.
  function getUserInfo() {
    dataProvider.getUserInfo().then((res) => {
      if (res.data.statusCode !== 200) {
        setLoadingModalIsOpen(false);
        return;
      }
      setCurrentUser1(res.data.response);
      loadCommentsFromServer();
    });
  }

  // Load comments to be displayed on page by page number.
  function loadCommentsFromServer() {
    dataProvider.loadCommentsFromServer(currentPage).then((res) => {
      setLoadingModalIsOpen(false);
      setComments(res.data.response.comments);
      setcommentsTotalNumber(res.data.response.total);
      setCommentListType(1);
    });
  }

  // Get comments from server according to the keyword user has entered.
  function handleSearch(keyword: string) {
    dataProvider.search(keyword).then((res) => {
      setComments(res.data.response.comments);
      setcommentsTotalNumber(res.data.response.total);
      setCommentListType(2);
    });
  }

  // When the component is rendered, load the site configuration from server, and then try to indentify current user.
  useEffect(() => {
    dataProvider.getAppConfig().then((res) => {
      if (res.data.statusCode === 200) {
        const siteConfig = res.data.response;
        dataProvider.getTranslations().then((res) => {
          setTranslations(res.data.response);
          setAppConfig(siteConfig);
          getUserInfo();
        });
      } else {
        // TODO Tell the user what's wrong.
        alert(res.statusText);
      }
    });
  }, []);

  useEffect(() => {
    if (appConfig.board_name) {
      document.title = appConfig.board_name;
    }
  }, [appConfig.board_name]);

  // Reload comments from server if the `currentPage` state changed.
  function handlePageChange(pageNumber: any) {
    setCurrentPage(parseInt(pageNumber));
  }

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }
    loadCommentsFromServer();
  }, [currentPage]);

  // Update the `searchText` state.
  function handleKeywordInput(searchText: string) {
    setSearchText(searchText);
  }

  function setCurrentUser(userData: IUser) {
    setCurrentUser1(userData);
  }

  if (currentUser.user_type !== 'admin' && appConfig.site_close == 1) {
    return <div>{appConfig.close_reason}</div>;
  }
  return (
    <AppConfigContext.Provider value={appConfig}>
      <UserContext.Provider value={currentUser}>
        <LanguageContext.Provider value={translations}>
          <div id="appbox">
            <Header onCurrentUserUpdated={setCurrentUser} />
            <OfflineWarning appConfig={appConfig} lang={translations} />
            <CommentBox
              onCommentCreated={loadCommentsFromServer}
              onCloseSearch={loadCommentsFromServer}
              onPageChanged={handlePageChange}
              currentPage={currentPage}
              commentListType={commentListType}
              comments={comments}
              commentsTotalNumber={commentsTotalNumber}
              searchText={searchText}
            />
            <SearchBar onSubmit={handleSearch} onUserInput={handleKeywordInput} searchText={searchText} />
            <Footer />
            <Progress loadingModalIsOpen={loadingModalIsOpen} />
          </div>
        </LanguageContext.Provider>
      </UserContext.Provider>
    </AppConfigContext.Provider>
  );
}
