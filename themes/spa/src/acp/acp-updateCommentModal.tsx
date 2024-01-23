import { ChangeEvent, FormEvent, useState } from 'react';
import Modal from 'react-modal';
import { useUpdateComment } from '../common/dataHooks';

import customStyles from '../common/ModalStyles';
import { mutate } from 'swr';

function UpdateCommentModal(props: any) {
  const { trigger } = useUpdateComment();
  const [content, setContent] = useState(props.comment?.post_content ?? '');
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!content.trim()) return;
    try {
      trigger({
        mid: parseInt(props.comment.id),
        update_content: content,
      });
      props.onRequestClose();
      mutate('loadAllCommentsFromServer');
    } catch (e) {
      alert(e);
    }
    return false;
  }
  return (
    <Modal ariaHideApp={false} isOpen={props.modalIsOpen} onRequestClose={props.onRequestClose} style={customStyles}>
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

export default UpdateCommentModal;
