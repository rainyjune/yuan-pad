import Reply from './Reply';
import type { CommentProps } from '../common/types';

export default function Comment(props: CommentProps) {
  function rawMarkup() {
    return { __html: props.children.toString() };
  }
  function rawAuthorMarkup() {
    return {
      __html: (Number(props.data.uid) ? props.data.b_username : props.data.uname) ?? '',
    };
  }
  return (
    <div className="comment">
      <span className="commentAuthor" dangerouslySetInnerHTML={rawAuthorMarkup()}></span>
      <span className="commentDate">{props.data.time}</span>
      <div className="commentText">
        <p dangerouslySetInnerHTML={rawMarkup()} />
      </div>
      {props.data.reply_content ? <Reply content={props.data.reply_content} date={props.data.reply_time} /> : null}
    </div>
  );
}
