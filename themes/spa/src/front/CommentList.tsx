import Comment from './Comment';
import type { CommentListProps, IComment } from '../common/types';

export default function CommentList({ data, searchText, commentListType }: CommentListProps) {
  return (
    <div className="commentList">
      {data.map((comment: IComment) => {
        return (
          <Comment key={comment.id} data={comment}>
            {commentListType === 2
              ? comment.post_content.replace(searchText, "<span class='keyword'>" + searchText + '</span>')
              : comment.post_content}
          </Comment>
        );
      })}
    </div>
  );
}
