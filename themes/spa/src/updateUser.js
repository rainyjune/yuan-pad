import React, { useContext, useRef, useState } from 'react';
import Modal from 'react-modal';
import dataProvider from './dataProvider.ts';
import UserContext from './userContext';
import LanguageContext from './languageContext';

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

function UserUpdate(props) {
  const idRef = useRef(null);
  const userRef = useRef(null);
  const passRef = useRef(null);
  const emailRef = useRef(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const language = useContext(LanguageContext);
  const user = useContext(UserContext);
  const openModal = (e) => {
    e.preventDefault();
    setModalIsOpen(true);
  };
  const closeModal = (e) => {
    setModalIsOpen(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let uid = idRef.current.value.trim(),
        user = userRef.current.value.trim(),
        pwd = passRef.current.value.trim(),
        email = emailRef.current.value.trim();
    if (!uid || !user || !email) return;
    dataProvider.updateUser({ uid, user, pwd, email},  res => {
      if (res.statusCode === 200) {
        setErrorMsg('');
        setModalIsOpen(false);
        props.onCurrentUserUpdated(res.response);
      } else {
        alert(res.response);
        setState({errorMsg: res.response});
      }
    });
    return false;
  };
  return (
    <div className="updateUser">
      <a role="button" className="btn btn-default" href="#" onClick={openModal}>{language.UPDATE}</a>
      <Modal ariaHideApp={false} isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles}>
        <p>{errorMsg}</p>
        <button onClick={closeModal}>close</button>
        <form onSubmit={handleSubmit} action="#" method="post">
          <input type="hidden" ref={idRef} value={user.uid} />
          <div className="form-group">
            <label htmlFor="inputUser">{language.USERNAME}</label>
            <input type="text" ref={userRef} readOnly="readonly" defaultValue={user.username} className="form-control" id="inputUser" />
          </div>
          <div className="form-group">
            <label htmlFor="inputPassword">{language.PASSWORD}</label>
            <input type="password" defaultValue={user.password} ref={passRef} className="form-control" id="inputPassword" />
          </div>
          <div className="form-group">
            <label htmlFor="inputEmail">{language.EMAIL}</label>
            <input type="email" defaultValue={user.email} ref={emailRef} className="form-control" id="inputEmail" />
          </div>
          <button type="submit" className="btn btn-default">{language.UPDATE}</button>
        </form>
      </Modal>
    </div>
  );
}

export default UserUpdate;