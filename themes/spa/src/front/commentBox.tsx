import CommentForm from './CommentForm';
import CommentList from './CommentList';
import CommentStatistics from './CommentStatistics';
import { useAppConfig, useTranslation } from '../common/dataHooks';
import { isConfigEnabled, isValidItemsPerPage } from '../common/utils';
import type { CommentBoxProps } from '../common/types';

function CommentBox(props: CommentBoxProps) {
  const { currentPage, commentListType, comments = [], commentsTotalNumber } = props.commentsData;
  const { data: lang } = useTranslation();
  const {
    data: { page_on, num_perpage },
  } = useAppConfig();
  const pageNum =
    isConfigEnabled(page_on) && isValidItemsPerPage(num_perpage) ? Math.ceil(commentsTotalNumber / num_perpage) : 1;
  return (
    <div>
      <h1 className="text-black text-base font-bold text-center">{lang.WELCOME_POST}</h1>
      {props.isSearch && (
        <p>
          Search {props.searchText} :<button onClick={props.onCloseSearch}>Close</button>
        </p>
      )}
      <CommentList commentListType={commentListType} data={comments} searchText={props.searchText} />
      <CommentStatistics
        commentListType={commentListType}
        onPageChanged={props.onPageChanged}
        total={commentsTotalNumber}
        currentPage={currentPage}
        pagenum={pageNum}
      />
      {commentListType === 1 && <CommentForm onCommentCreated={props.onCommentCreated} />}
    </div>
  );
}

export default CommentBox;
