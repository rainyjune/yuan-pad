import Comment from './Comment';

export default function CommentList(props: any) {
  const searchText = props.searchText,
    isSearchResult = props.commentListType === 2;

  const createCommentNodes = function (comment: any) {
    const text = isSearchResult
      ? comment.post_content.replace(searchText, "<span class='keyword'>" + searchText + '</span>')
      : comment.post_content;
    return (
      <Comment key={comment.id} data={comment}>
        {text}
      </Comment>
    );
  };
  return <div className="commentList">{(props.data || []).map(createCommentNodes)}</div>;
}
