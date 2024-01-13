import { useEffect, useState, useRef, useCallback } from 'react';

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
import UserContext, { initialState as userInitalState } from './common/userContext';
import LanguageContext from './common/languageContext';
import { initialState as languageInitalState } from './common/languageContext';
import { IConfigParams, IUser } from './common/types';
import { initialState as appConfigInitalState } from './common/appConfigContext';

export default function App() {
  const didMount = useRef(false);
  const [loadingModalIsOpen, setLoadingModalIsOpen] = useState(true);
  const [appConfig, setAppConfig] = useState<IConfigParams>(appConfigInitalState);
  const [comments, setComments] = useState({
    data: [], // Comments
    total: 0, // The total number of all comments or filtered comments.
    listType: 1, // 1: Default list. 2: Search Result list
    currentPage: 0,
  });
  const [currentUser, setCurrentUser1] = useState<IUser>(userInitalState);
  const [searchText, setSearchText] = useState(''); // The search keyword
  const [translations, setTranslations] = useState(languageInitalState);

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
  const loadCommentsFromServer = useCallback(
    function () {
      dataProvider.loadCommentsFromServer(comments.currentPage).then((res) => {
        setLoadingModalIsOpen(false);
        setComments({
          //...comments,
          data: res.data.response.comments,
          total: res.data.response.total,
          listType: 1,
          currentPage: comments.currentPage,
        });
      });
    },
    [comments.currentPage],
  );

  // Get comments from server according to the keyword user has entered.
  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const keyword: string = searchText;
    dataProvider.search(keyword).then((res) => {
      setComments({
        ...comments,
        data: res.data.response.comments,
        total: res.data.response.total,
        listType: 2,
        currentPage: 0,
      });
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

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }
    loadCommentsFromServer();
  }, [comments.currentPage, loadCommentsFromServer]);

  // Update the `searchText` state.
  function handleKeywordInput(e: React.ChangeEvent<HTMLInputElement>) {
    const searchText = e.target.value;
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
            <OfflineWarning />
            <CommentBox
              onCommentCreated={loadCommentsFromServer}
              onCloseSearch={loadCommentsFromServer}
              onPageChanged={(pageNumber: string) =>
                setComments({
                  ...comments,
                  currentPage: parseInt(pageNumber),
                })
              }
              currentPage={comments.currentPage}
              commentListType={comments.listType}
              comments={comments.data}
              commentsTotalNumber={comments.total}
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
