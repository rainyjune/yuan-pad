import React, { useEffect, useState, useRef } from 'react';
import { createRoot } from 'react-dom/client';

import SearchBar from './searchBar.js';
import CommentBox from './commentBox.js';
import Header from './header.js';
import Footer from './footer.js';
import dataProvider from './dataProvider.js';
import Progress from './progress.js';
import OfflineWarning from './offlineMode.js';
import AppConfigContext from './appConfigContext.js';
import UserContext from './userContext.js';
import LanguageContext from './languageContext.js';

interface GetUserInfoResponse {
  statusCode: number;
  statusText: string;
  response: {
    uid: number | string;
    user_type: string;
    username: string;
    email: string;
  }
}

interface PostListResponse {
  statusCode: number;
  statusText: string;
  response: {
    total: number,
    comments: Array<{
      id: number;
      ip: string;
      uid: any;
      uname: string;
      post_content: string;
      time: string;
      reply_id: any;
      reply_content: string;
      reply_time: string;
      b_username: any;
    }>
  }
}

interface SearchResponse {
  statusCode: number;
  statusText: string;
  response: {
    comments: Array<{
      id: number;
      ip: string;
      uid: any;
      uname: string;
      post_content: string;
      time: string;
      reply_id: any;
      reply_content: string;
      reply_time: string;
      b_username: any;
    }>;
    total: number;
  }
}

interface IConfigParams {
  board_name: string;
  site_close: string | number;
  close_reason: string;
  admin_email: string;
  copyright_info: string;
  valid_code_open: string | number;
  page_on: string | number;
  num_perpage: string | number;
  theme: string;
  admin: string;
  lang: string;
  timezone: string;
  filter_type: number;
  allowed_tags: string;
}

interface ConfigResponse {
  statusCode: number;
  statusText: string;
  response: IConfigParams;
}

interface TranslationResponse {
  statusCode: number;
  statusText: string;
  response: object;
}

interface IUser {
  uid: number | string;
  user_type: string;
  username: string;
  email: string;
}

function App(props: any) {
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
  const [comments, setComments] = useState([]);
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

createRoot(document.getElementById('content')).render(
  <App />
);