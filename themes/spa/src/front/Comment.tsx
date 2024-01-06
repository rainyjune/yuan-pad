import Reply from "./Reply";

export default function Comment(props: any) {
  const rawMarkup = () => {
    return { __html: props.children.toString() };
  };
  const rawAuthorMarkup = () => {
    return { __html: parseInt(props.data.uid) ? props.data.b_username : props.data.uname};
  };
  return (
    <div className="comment">
      <span className="commentAuthor" dangerouslySetInnerHTML={rawAuthorMarkup()}></span> 
      <span className="commentDate">{props.data.time}</span>
      <div className="commentText">
        <p dangerouslySetInnerHTML={rawMarkup()} />
      </div>
      {props.data.reply_content ? <Reply
        content={props.data.reply_content}
        date={props.data.reply_time}
        /> : null
      }
    </div>
  );
}