import _ from 'lodash';
import dataProvider from '../common/dataProvider';
import Reply from './Reply';

export default function Comment(props: any) {
  const banIP = (e: any) => {
    //let dom = e.target;
    e.preventDefault();
    let ip = props.data.ip;
    dataProvider.banIP(ip, () => {
      props.onActiveTabChanged('ban_ip');
    });
  };
  const deleteComment = (e: any) => {
    e.preventDefault();
    let data = props.data;
    let commentId = data.id;
    let reply = data.reply ? "1" : "0";
    if (!confirm(props.lang.DEL_COMMENT_CONFIRM)) {
      return false;
    }
    // TODO
    dataProvider.deleteComment(commentId, reply, () => {
      props.onCommentDeleted();
    });
  };
  const replyComment = (e: any) => {
    e.preventDefault();
    props.onReplyComment(props.data);
  };
  const updateComment = (e: any) => {
    e.preventDefault();
    props.onUpdateComment(props.data);
  };
  const toggleItem = () => {
    props.onToggleItem(props.data);
  };
  let data = props.data;
  let lang = props.lang;
  return (
    <tr className="row">
      <td className="col-xs-1 col-sm-1 col-md-1">
        <input type='checkbox' checked={props.data.checked} onChange={toggleItem} />
        <input type='hidden' name={props.data.id} value={data.reply ? 1 : 0} />
      </td>
      <td className="col-xs-3 col-sm-3 col-md-3">
        {parseInt(data.uid) ? data.b_username : data.uname}
      </td>
      <td className='col-xs-6 col-sm-6 col-md-6'>
        {data.post_content}<br />{lang.TIME}：{data.time}
        <Reply lang={lang} data={data} />
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
        <button className="btn btn-default btn-sm" onClick={banIP} data-ip={data.ip}>
          <span className="glyphicon glyphicon-ban-circle" aria-hidden="true"></span>
        </button>
      </td>
    </tr>
  );
}