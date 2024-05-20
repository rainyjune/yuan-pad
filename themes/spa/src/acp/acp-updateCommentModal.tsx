import { ChangeEvent, FormEvent, useState } from 'react';
import Modal from 'react-modal';
import { useUpdateComment } from '../common/dataHooks';
import type { UpdateCommentModalProps } from '../common/types';
import customStyles from '../common/ModalStyles';
import { mutate } from 'swr';

function UpdateCommentModal({
  comment: { post_content, id: pid },
  onRequestClose,
  modalErrorMsg,
  modalIsOpen,
}: UpdateCommentModalProps) {
  const { trigger } = useUpdateComment();
  const [content, setContent] = useState(post_content ?? '');
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!content.trim()) return;
    try {
      trigger({
        mid: Number(pid),
        update_content: content,
      });
      onRequestClose();
      mutate('loadAllCommentsFromServer');
    } catch (e) {
      alert(e);
    }
    return false;
  }
  return (
    <Modal ariaHideApp={false} isOpen={modalIsOpen} onRequestClose={onRequestClose} style={customStyles}>
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

export default UpdateCommentModal;
