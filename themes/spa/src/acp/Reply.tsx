import { useEffect, useState, MouseEvent, useContext } from 'react';
import _ from 'lodash';
import dataProvider from '../common/dataProvider';
import LanguageContext from '../common/languageContext';

export default function Reply(props: any) {
  const lang = useContext(LanguageContext);
  const [state, setState] = useState({
    b_username: null,
    id: 0,
    ip: "::1",
    post_content: "",
    reply_content: "",
    reply_time: "",
    time: "",
    uid: null,
    uname: "",
    user: ""
  });
  useEffect(() => {
    let data = props.data;
    if (data) {
      setState({
        b_username: data.b_username,
        id: data.id,
        ip: data.ip,
        post_content: data.post_content,
        reply_content: data.reply_content,
        reply_time: data.reply_time,
        time: data.time,
        uid: data.uid,
        uname: data.uname,
        user: data.user
      });
    }
  }, [props.data]);

  const deleteReply = (e: MouseEvent) => {
    e.preventDefault();
    if (!confirm(lang.DEL_REPLY_CONFIRM)) {
      return false;
    }
    dataProvider.deleteReply(state.id).then(() => {
      setState(_.extend({}, state, { reply_content: '' }));
    });
  }
  const data = state;
  if (!data || !data.reply_content) {
    return null;
  }
  return (
    <div>
      {lang.YOU_REPLIED && lang.YOU_REPLIED.replace('{reply_time}', data.reply_time).replace('{reply_content}', data.reply_content)}
      <span>&nbsp;<a onClick={deleteReply} href="#">{lang.DELETE_THIS_REPLY}</a></span>
    </div>
  );
}