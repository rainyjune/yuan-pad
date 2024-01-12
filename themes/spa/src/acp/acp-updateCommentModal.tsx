import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import Modal from 'react-modal';
import dataProvider from '../common/dataProvider';

import customStyles from '../common/ModalStyles';

function UpdateCommentModal(props: any) {
  const [content, setContent] = useState(props.comment?.post_content ?? '');
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!content.trim()) return;
    try {
      const res = await dataProvider.updateComment({
        mid: parseInt(props.comment.id),
        update_content: content,
      });
      if (res.status === 200 && res.data.statusCode === 200) {
        props.onCommentUpdated();
      }
    } catch (e) {
      alert('Error');
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
