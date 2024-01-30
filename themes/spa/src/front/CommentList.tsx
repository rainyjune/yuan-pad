import Comment from './Comment';
import type { CommentListProps, IComment } from '../common/types';

export default function CommentList(props: CommentListProps) {
  const searchText = props.searchText,
    isSearchResult = props.commentListType === 2;

  function createCommentNodes(comment: IComment) {
    const text = isSearchResult
      ? comment.post_content.replace(searchText, "<span class='keyword'>" + searchText + '</span>')
      : comment.post_content;
    return (
      <Comment key={comment.id} data={comment}>
        {text}
      </Comment>
    );
  }
  return <div className="commentList">{(props.data || []).map(createCommentNodes)}</div>;
}
