import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import Modal from 'react-modal';
import dataProvider from '../common/dataProvider';

import customStyles from '../common/ModalStyles';

function UpdateCommentModal(props: any) {
  const [mid, setMid] = useState('');
  const [update_content, setUpdate_content] = useState('');
  useEffect(() => {
    let commentData = props.comment;
    if (commentData) {
      setMid(commentData.id);
      setUpdate_content(commentData.post_content);
    }
  }, [props.comment]);
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!mid || !update_content.trim()) return;
    try {
      const res = await dataProvider.updateComment({mid: parseInt(mid), update_content});
      if (res.status === 200 && res.data.statusCode === 200) {
        props.onCommentUpdated();
      }
    } catch (e) {
      alert('Error');
    }
    return false;
  };
  const changeContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setUpdate_content(e.target.value);
  };
  return (
    <Modal ariaHideApp={false} isOpen={props.modalIsOpen} onRequestClose={props.onRequestClose} style={customStyles} >
      <div>{props.modalErrorMsg}</div>
      <form onSubmit={handleSubmit} action="#" method="post">
        <textarea value={update_content} onChange={changeContent}></textarea>
        <input type="submit" />
      </form>
    </Modal>
  );
}

export default UpdateCommentModal;