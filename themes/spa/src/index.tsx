import { useEffect, useState, useRef } from 'react';
import { createRoot } from 'react-dom/client';

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap-theme.css";
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
import { GetUserInfoResponse, PostListResponse, SearchResponse, IConfigParams, ConfigResponse, TranslationResponse, IUser, IComment} from './common/types';

function App() {
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
    allowed_tags: ''});
  const [comments, setComments] = useState<Array<IComment>>([]);
  const [commentsTotalNumber, setcommentsTotalNumber] = useState(0); // The total number of all comments or filtered comments.
  const [commentListType, setCommentListType] = useState(1); // 1: Default list. 2: Search Result list
  const [currentPage, setCurrentPage] = useState(0);
  const [currentUser, setCurrentUser1] = useState<IUser>({uid: -1, user_type: 'guest', username: '', email: ''});
  const [searchText, setSearchText] = useState(''); // The search keyword
  const [translations, setTranslations] = useState({});

  // Get current user identity from server.
  const getUserInfo = () => {
    dataProvider.getUserInfo((res: GetUserInfoResponse) => {
      setLoadingModalIsOpen(false);
      if (res.statusCode !== 200) {
        return ;
      }
      setCurrentUser1(res.response);
      loadCommentsFromServer();
    });
  };

  // Load comments to be displayed on page by page number.
  const loadCommentsFromServer = () => {
    dataProvider.loadCommentsFromServer(currentPage, (res: PostListResponse) => {
      setComments(res.response.comments);
      setcommentsTotalNumber(res.response.total);
      setCommentListType(1);
    });
  };

  // Get comments from server according to the keyword user has entered.
  const handleSearch = (keyword: string) => {
    dataProvider.search(keyword, (res: SearchResponse) => {
      setComments(res.response.comments);
      setcommentsTotalNumber(res.response.total);
      setCommentListType(2);
    });
  };

  // When the component is rendered, load the site configuration from server, and then try to indentify current user.
  useEffect(() => {
    dataProvider.getAppConfig((res: ConfigResponse) => {
      if (res.statusCode === 200) {
        let siteConfig = res.response;
        dataProvider.getTranslations((res: TranslationResponse) => {
          setTranslations(res.response);
          setAppConfig(siteConfig);
          getUserInfo();
        });
      } else {
        // TODO Tell the user what's wrong.
        alert(res.statusText);
      }
    });
  }, []);

  // Reload comments from server if the `currentPage` state changed.
  const handlePageChange = (pageNumber: any) => {
    setCurrentPage(parseInt(pageNumber));
  };

  useEffect(() => {
    if (!didMount.current ) {
      didMount.current = true;
      return;
    }
    loadCommentsFromServer();
  }, [currentPage]);

  // Update the `searchText` state.
  const handleKeywordInput = (searchText: string) => {
    setSearchText(searchText);
  };

  const setCurrentUser = (userData: IUser) => {
    setCurrentUser1(userData);
  };
  
  if (currentUser.user_type !== "admin" && appConfig.site_close == 1) {
    return <div>{appConfig.close_reason}</div>;
  }
  return (
    <AppConfigContext.Provider value={appConfig}>
      <UserContext.Provider value={currentUser}>
        <LanguageContext.Provider value={translations}>
          <div id="appbox">
            <Header
              onCurrentUserUpdated={setCurrentUser}
            />
            <OfflineWarning 
              appConfig={appConfig}
              lang={translations}
            />
            <CommentBox
              onCommentCreated={loadCommentsFromServer}
              onCloseSearch={loadCommentsFromServer}
              onPageChanged={handlePageChange}
              currentPage = {currentPage}
              commentListType={commentListType} 
              comments={comments} 
              commentsTotalNumber={commentsTotalNumber}
              searchText={searchText}
            />
            <SearchBar 
              onSubmit={handleSearch} 
              onUserInput={handleKeywordInput}
              searchText={searchText}
            />
            <Footer />
            <Progress loadingModalIsOpen={loadingModalIsOpen} />
          </div>
        </LanguageContext.Provider>
      </UserContext.Provider>
    </AppConfigContext.Provider>
  );
}

createRoot(document.getElementById('content') as Element).render(
  <App />
);