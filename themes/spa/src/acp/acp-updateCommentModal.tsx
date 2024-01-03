import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import Modal from 'react-modal';
import dataProvider from '../common/dataProvider';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

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
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!mid || !update_content.trim()) return;
    dataProvider.updateComment({mid: parseInt(mid), update_content}, res => {
      if (res.statusCode === 200) {
        props.onCommentUpdated();
      }
    }, function(){
      debugger;
    });
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