import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import Modal from 'react-modal';
import dataProvider from '../common/dataProvider';
import customStyles from '../common/ModalStyles';

function ReplyModal(props: any) {
  const [state, setState] = useState({
    rid: '',
    pid: '',
    content: '',
    r_time: '',
  });
  useEffect(() => {
    const commentData = props.comment;
    if (commentData) {
      setState({
        ...state,
        rid: commentData.reply_id,
        pid: commentData.id,
        content: commentData.reply_content,
      });
    }
  }, [props.comment]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!state.pid || !state.content.trim()) return;
    const action = state.rid ? dataProvider['updateReply'] : dataProvider['createReply'];
    action(state).then((res: any) => {
      if (res.status === 200 && res.data.statusCode === 200) {
        props.onReplySubmit();
      } else {
        alert(res.data.statusText);
      }
    });
    return false;
  };
  const changeContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setState({ ...state, content: e.target.value });
  };
  console.log('replymodal:', state.content);
  return (
    <Modal
      ariaHideApp={false}
      isOpen={props.modalIsOpen}
      onRequestClose={() => {
        setState({
          ...state,
          content: '',
        });
        debugger;
        props.onRequestClose();
      }}
      style={customStyles}
    >
      <div>{props.modalErrorMsg}</div>
      <form onSubmit={handleSubmit} action="#" method="post">
        <textarea value={state.content} onChange={changeContent}></textarea>
        <input type="submit" />
      </form>
    </Modal>
  );
}

export default ReplyModal;
