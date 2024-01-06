import { useContext } from 'react';
import LanguageContext from '../common/languageContext';
import AppConfigContext from '../common/appConfigContext';

import CommentForm from './CommentForm';
import CommentList from './CommentList';
import CommentStatistics from './CommentStatistics';

function CommentBox(props: any) {
  const propsObj = {
    commentListType: props.commentListType,
  };
  const lang: any = useContext(LanguageContext);
  const appConfig: any = useContext(AppConfigContext);
  return (
    <div className="commentBox">
      <h1>{lang.WELCOME_POST}</h1>
      <CommentList
        {...propsObj}
        data={props.comments}
        searchText={props.searchText}
      />
      <CommentStatistics
        {...propsObj}
        onCloseSearch={props.onCloseSearch}
        onPageChanged={props.onPageChanged}
        total={props.commentsTotalNumber} 
        currentPage = {props.currentPage}
        pagenum={appConfig.page_on ? Math.ceil(props.commentsTotalNumber/appConfig.num_perpage) : 1} />
      {
        props.commentListType !== 1 ? '' :
        <CommentForm
          {...propsObj}
          user={props.user}
          onCommentCreated={props.onCommentCreated}
        />
      }
    </div>
  );
}

export default CommentBox;