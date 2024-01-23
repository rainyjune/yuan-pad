import { ChangeEvent, FormEvent, useState } from 'react';
import Modal from 'react-modal';
import customStyles from '../common/ModalStyles';

import { useCreateReply, useUpdateReply } from '../common/dataHooks';
import { mutate } from 'swr';

function ReplyModal(props: any) {
  const { trigger: createReply } = useCreateReply();
  const { trigger: updateReply } = useUpdateReply();
  const [content, setContent] = useState(props.comment?.reply_content ?? '');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!content.trim()) return;
    const action = props.comment?.reply_id ? updateReply : createReply;
    const data = {
      rid: props.comment.reply_id,
      pid: props.comment.id,
      content: content.trim(),
      r_time: '',
    };
    try {
      // @ts-expect-error Expected
      await action(data);
      props.onRequestClose();
      mutate('loadAllCommentsFromServer');
    } catch (e) {
      alert(e);
    }
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
