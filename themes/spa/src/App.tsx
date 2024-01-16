import { useEffect, useState, useCallback } from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './css/style.css';

import SearchBar from './front/searchBar';
import CommentBox from './front/commentBox';
import Header from './front/header';
import Footer from './front/footer';
import dataProvider, { fetchByFunctionName } from './common/dataProvider';
import Progress from './common/progress';
import OfflineWarning from './common/offlineMode';
import AppConfigContext from './common/appConfigContext';
import UserContext, { initialState as userInitalState } from './common/userContext';
import LanguageContext from './common/languageContext';
import { initialState as languageInitalState } from './common/languageContext';
import { initialState as appConfigInitalState } from './common/appConfigContext';
import useSWR from 'swr';

const swrOptions = {
  revalidateOnFocus: false,
};

export default function App() {
  const [search, setSearch] = useState({
    isSearch: false,
    keyword: '',
  });

  const [currentPage, setCurrentPage] = useState(0);
  const {
    data: translations1,
    isLoading: translationsIsLoading,
    error: translationsError,
  } = useSWR('getTranslations', fetchByFunctionName, swrOptions);
  const {
    data: appConfig1,
    isLoading: appConfigIsLoading,
    error: appConfigError,
  } = useSWR('getAppConfig', fetchByFunctionName, swrOptions);

  const {
    data: currentUser1,
    isLoading: currentUserIsLoading,
    error: currentUserError,
  } = useSWR('getUserInfo', fetchByFunctionName, swrOptions);

  const {
    data: commentsData,
    isLoading: commentsIsLoading,
    error: commentsError,
    mutate: mutateComments,
  } = useSWR(
    search.isSearch ? ['search', search.keyword] : ['loadCommentsFromServer', currentPage],
    fetchByFunctionName,
    swrOptions,
  );
  const comments = {
    data: commentsData?.comments ?? [], // Comments
    total: commentsData?.total || 0, // The total number of all comments or filtered comments.
    listType: search.isSearch ? 2 : 1,
    currentPage,
  };
  const translations = translations1 ?? languageInitalState;
  const appConfig = appConfig1 ?? appConfigInitalState;
  const currentUser = currentUser1 ?? userInitalState;

  useEffect(() => {
    if (appConfig?.board_name) {
      document.title = appConfig.board_name;
    }
  }, [appConfig?.board_name]);

  if (currentUser.user_type !== 'admin' && appConfig?.site_close == 1) {
    return <div>{appConfig.close_reason}</div>;
  }
  return (
    <AppConfigContext.Provider value={appConfig}>
      <UserContext.Provider value={currentUser}>
        <LanguageContext.Provider value={translations}>
          <div id="appbox">
            <Header />
            <OfflineWarning />
            <CommentBox
              onCommentCreated={mutateComments}
              onCloseSearch={() => {
                setSearch({
                  isSearch: false,
                  keyword: '',
                });
              }}
              onPageChanged={(pageNumber: string) => {
                setCurrentPage(Number(pageNumber));
              }}
              currentPage={currentPage}
              commentListType={comments.listType}
              comments={comments.data}
              commentsTotalNumber={comments.total}
              isSearch={search.isSearch}
              searchText={search.keyword}
            />
            <SearchBar
              onSubmit={(str: string) => {
                setSearch({
                  isSearch: true,
                  keyword: str,
                });
              }}
            />
            <Footer />
            <Progress
              loadingModalIsOpen={
                appConfigIsLoading || translationsIsLoading || commentsIsLoading || currentUserIsLoading
              }
            />
          </div>
        </LanguageContext.Provider>
      </UserContext.Provider>
    </AppConfigContext.Provider>
  );
}
