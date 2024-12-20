import Reply from './Reply';
import type { CommentProps } from '../common/types';

import { generateGravatar } from '../common/utils';

import PlaceHolderAvatar from '../images/example_avatar.jpg';
import { useEffect, useState } from 'react';

export default function Comment(props: CommentProps) {
  const [avatar, setAvatar] = useState<string>(PlaceHolderAvatar);
  useEffect(() => {
    if (props?.data?.uname) {
      generateGravatar(props.data.uname, 24).then((url) => {
        setAvatar(url);
      });
    }
  }, [props?.data?.uname]);
  function rawMarkup() {
    return { __html: props.children.toString() };
  }
  function rawAuthorMarkup() {
    return {
      __html: (Number(props.data.uid) ? props.data.b_username : props.data.uname) ?? '',
    };
  }

  return (
    <div className="comment py-3 flex flex-col gap-y-3">
      <div className="flex justify-between">
        <div className="flex gap-[10px]">
          <img src={avatar} alt="avatar" className="w-[24px] h-[24px] rounded-full object-cover" />
          <span className="commentAuthor" dangerouslySetInnerHTML={rawAuthorMarkup()}></span>
        </div>
        <span className="commentDate">{props.data.time}</span>
      </div>
      <div className="commentText">
        <p dangerouslySetInnerHTML={rawMarkup()} />
      </div>
      {props.data.reply_content ? <Reply content={props.data.reply_content} date={props.data.reply_time} /> : null}
    </div>
  );
}
