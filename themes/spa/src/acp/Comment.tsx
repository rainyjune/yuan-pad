import { useContext } from 'react';
import dataProvider from '../common/dataProvider';
import Reply from './Reply';
import LanguageContext from '../common/languageContext';
import type { IComment } from '../common/types';

export default function Comment(props: {
  data: IComment;
  onActiveTabChanged: (s: string) => void;
  onReplyComment: (data: any) => void;
  onCommentDeleted: (id: any) => void;
  onUpdateComment: (data: any) => void;
  onToggleItem: (id: number) => void;
  onReplyDelete: () => void;
  isSelected: boolean;
}) {
  const data = props.data;
  const lang = useContext(LanguageContext);
  async function banIP(ip: string) {
    await dataProvider.banIP(ip);
    props.onActiveTabChanged('ban_ip');
  }
  function deleteComment(e: any) {
    e.preventDefault();
    const commentId = data.id;
    if (!confirm(lang.DEL_COMMENT_CONFIRM)) {
      return false;
    }
    props.onCommentDeleted(commentId);
  }
  function replyComment(e: any) {
    e.preventDefault();
    props.onReplyComment(data);
  }
  function updateComment(e: any) {
    e.preventDefault();
    props.onUpdateComment(data);
  }
  function toggleItem() {
    props.onToggleItem(data.id);
  }

  return (
    <tr className="row">
      <td className="col-xs-1 col-sm-1 col-md-1">
        <input type="checkbox" checked={props.isSelected} onChange={toggleItem} />
      </td>
      <td className="col-xs-3 col-sm-3 col-md-3">{parseInt(data.uid) ? data.b_username : data.uname}</td>
      <td className="col-xs-6 col-sm-6 col-md-6">
        {data.post_content}
        <br />
        {lang.TIME}: {data.time}
        <Reply data={data} onDelete={props.onReplyDelete} />
      </td>
      <td className="col-xs-2 col-sm-2 col-md-2">
        <button className="btn btn-danger btn-sm" onClick={deleteComment}>
          <span className="glyphicon glyphicon-remove-circle" aria-hidden="true"></span>
        </button>
        <button className="btn btn-default btn-sm" onClick={replyComment}>
          <img src="./themes/spa/images/reply.png" width="12" height="12" />
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
