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

function App(props) {
  const didMount = useRef(false);
  const [loadingModalIsOpen, setLoadingModalIsOpen] = useState(true);
  const [appConfig, setAppConfig] = useState({});
  const [comments, setComments] = useState([]);
  const [commentsTotalNumber, setcommentsTotalNumber] = useState(0); // The total number of all comments or filtered comments.
  const [commentListType, setCommentListType] = useState(1); // 1: Default list. 2: Search Result list
  const [currentPage, setCurrentPage] = useState(0);
  const [currentUser, setCurrentUser1] = useState({});
  const [searchText, setSearchText] = useState(''); // The search keyword
  const [translations, setTranslations] = useState({});

  // Get current user identity from server.
  const getUserInfo = () => {
    dataProvider.getUserInfo(res => {
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
    dataProvider.loadCommentsFromServer(currentPage, res => {
      setComments(res.response.comments);
      setcommentsTotalNumber(res.response.total);
      setCommentListType(1);
    });
  };

  // Get comments from server according to the keyword user has entered.
  const handleSearch = (keyword) => {
    dataProvider.search(keyword, res => {
      setComments(res.response.comments);
      setcommentsTotalNumber(res.response.total);
      setCommentListType(2);
    });
  };

  // When the component is rendered, load the site configuration from server, and then try to indentify current user.
  useEffect(() => {
    dataProvider.getAppConfig(res => {
      if (res.statusCode === 200) {
        let siteConfig = res.response;
        dataProvider.getTranslations(res => {
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
  const handlePageChange = (pageNumber) => {
    pageNumber = parseInt(pageNumber);
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    if (!didMount.current ) {
      didMount.current = true;
      return;
    }
    loadCommentsFromServer();
  }, [currentPage]);

  // Update the `searchText` state.
  const handleKeywordInput = (searchText) => {
    setSearchText(searchText);
  };

  const setCurrentUser = (userData) => {
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