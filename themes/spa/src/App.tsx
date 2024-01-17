import { useEffect, useState } from 'react';
import SearchBar from './front/searchBar';
import CommentBox from './front/commentBox';
import Header from './front/header';
import Footer from './front/footer';
import Progress from './common/progress';
import OfflineWarning from './common/offlineMode';
import { useAppConfig, useUser, useCommentsList } from './common/dataHooks';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './css/style.css';

export default function App() {
  const [search, setSearch] = useState({
    isSearch: false,
    keyword: '',
  });

  const [currentPage, setCurrentPage] = useState(0);
  const { data: appConfig, isLoading: appConfigIsLoading } = useAppConfig();
  const { user: currentUser, isLoading: currentUserIsLoading } = useUser();

  const {
    data: commentsData,
    isLoading: commentsIsLoading,
    mutate: mutateComments,
  } = useCommentsList({
    ...search,
    currentPage,
  });

  useEffect(() => {
    if (appConfig.board_name) {
      document.title = appConfig.board_name;
    }
  }, [appConfig.board_name]);

  if (currentUser.user_type !== 'admin' && appConfig.site_close == 1) {
    return <div>{appConfig.close_reason}</div>;
  }
  return (
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
        commentsData={{
          comments: commentsData.comments, // Comments
          commentsTotalNumber: commentsData.total, // The total number of all comments or filtered comments.
          commentListType: search.isSearch ? 2 : 1,
          currentPage,
        }}
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
      <Progress loadingModalIsOpen={appConfigIsLoading || commentsIsLoading || currentUserIsLoading} />
    </div>
  );
}
