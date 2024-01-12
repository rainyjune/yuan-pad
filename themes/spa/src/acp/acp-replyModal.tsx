import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import Modal from 'react-modal';
import dataProvider from '../common/dataProvider';
import customStyles from '../common/ModalStyles';

function ReplyModal(props: any) {
  const [content, setContent] = useState(props.comment?.reply_content ?? '');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!content.trim()) return;
    const action = props.comment?.reply_id ? dataProvider['updateReply'] : dataProvider['createReply'];
    action({
      rid: props.comment.reply_id,
      pid: props.comment.id,
      content: content.trim(),
      r_time: '',
    }).then((res: any) => {
      if (res.status === 200 && res.data.statusCode === 200) {
        props.onReplySubmit();
      } else {
        alert(res.data.statusText);
      }
    });
    return false;
  }
  return (
    <Modal
      ariaHideApp={false}
      isOpen={props.modalIsOpen}
      onRequestClose={() => {
        props.onRequestClose();
      }}
      style={customStyles}
    >
      <div>{props.error}</div>
      <form onSubmit={handleSubmit} action="#" method="post">
        <textarea
          value={content}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
        ></textarea>
        <input type="submit" />
      </form>
    </Modal>
  );
}

export default ReplyModal;
