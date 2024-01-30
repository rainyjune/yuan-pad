import { ChangeEvent, FormEvent, useState } from 'react';
import Modal from 'react-modal';
import customStyles from '../common/ModalStyles';
import type { ReplyModalProps } from '../common/types';
import { useCreateReply, useUpdateReply } from '../common/dataHooks';
import { mutate } from 'swr';

function ReplyModal({
  comment: { id: pid, reply_id, reply_content },
  onRequestClose,
  modalIsOpen,
  modalErrorMsg,
}: ReplyModalProps) {
  const { trigger: createReply } = useCreateReply();
  const { trigger: updateReply } = useUpdateReply();
  const [content, setContent] = useState(reply_content ?? '');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!content.trim()) return;
    const action = reply_id ? updateReply : createReply;
    try {
      // @ts-expect-error Expected
      await action({
        rid: reply_id,
        pid: pid,
        content: content.trim(),
        r_time: '',
      });
      onRequestClose();
      mutate('loadAllCommentsFromServer');
    } catch (e) {
      alert(e);
    }
  }
  return (
    <Modal
      ariaHideApp={false}
      isOpen={modalIsOpen}
      onRequestClose={() => {
        onRequestClose();
      }}
      style={customStyles}
    >
      <div>{modalErrorMsg}</div>
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
