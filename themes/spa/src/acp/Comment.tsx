import { MouseEvent } from 'react';
import Reply from './Reply';
import type { ACPCommentProps } from '../common/types';
import { useTranslation, useBanIP, useDeleteComment } from '../common/dataHooks';
import { mutate } from 'swr';

export default function Comment(props: ACPCommentProps) {
  const { trigger: triggerDelete } = useDeleteComment();
  const { trigger: triggerBanIP } = useBanIP();
  const { data: lang } = useTranslation();
  const data = props.data;
  async function banIP(ip: string) {
    await triggerBanIP(ip);
    props.onActiveTabChanged('ban_ip');
  }
  function deleteComment(e: MouseEvent) {
    e.preventDefault();
    const commentId = data.id;
    if (!confirm(lang.DEL_COMMENT_CONFIRM)) {
      return;
    }
    triggerDelete(commentId);
    mutate('loadAllCommentsFromServer');
  }
  function replyComment(e: MouseEvent) {
    e.preventDefault();
    props.onReplyComment(data.id);
  }
  function updateComment(e: MouseEvent) {
    e.preventDefault();
    props.onUpdateComment(data.id);
  }
  function toggleItem() {
    props.onToggleItem(data.id);
  }

  return (
    <tr className="row">
      <td className="col-xs-1 col-sm-1 col-md-1">
        <input type="checkbox" checked={props.isSelected} onChange={toggleItem} />
      </td>
      <td className="col-xs-3 col-sm-3 col-md-3">{Number(data.uid) ? data.b_username : data.uname}</td>
      <td className="col-xs-6 col-sm-6 col-md-6">
        {data.post_content}
        <br />
        {lang.TIME}: {data.time}
        <Reply data={data} />
      </td>
      <td className="col-xs-2 col-sm-2 col-md-2">
        <button className="btn btn-danger btn-sm" onClick={deleteComment}>
          <span className="glyphicon glyphicon-remove-circle" aria-hidden="true"></span>
        </button>
        <button className="btn btn-default btn-sm" onClick={replyComment}>
          <img
            src="./themes/spa/templates/images/reply.png" // For production
            width="12"
            height="12"
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = './images/reply.png'; // For development
            }}
          />
        </button>
        <button className="btn btn-default btn-sm" onClick={updateComment}>
          <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
        </button>
        <button
          className="btn btn-default btn-sm"
          onClick={(e) => {
            e.preventDefault();
            banIP(data.ip);
          }}
        >
          <span className="glyphicon glyphicon-ban-circle" aria-hidden="true"></span>
        </button>
      </td>
    </tr>
  );
}
