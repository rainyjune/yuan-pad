import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

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

function UserUpdateModal(props) {
  const [uid, setUid] = useState('');
  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [email, setEmail] = useState('');
  useEffect(() => {
    if (props.userData) {
      let userData = props.userData;
      setUid(userData.uid);
      setUser(userData.username);
      setPwd(userData.password);
      setEmail(userData.email);
    }
  }, [props.userData]);
  const handleSubmit = (e) => {
    e.preventDefault();
    let user1 = user.trim(),
        pwd1 = pwd.trim(),
        email1 = email.trim();
    if (!user1 || !email1) return;
    props.onUpdateSubmit({
      uid,
      user: user1,
      pwd: pwd1,
      email: email1
    });
    return false;
  };
  const updatePassword = (e) => {
    setPwd(e.target.value);
  };
  const updateEmail = (e) => {
    setEmail(e.target.value)
  };
  let lang = props.lang;
  return (
    <Modal ariaHideApp={false} isOpen={props.modalIsOpen} onRequestClose={props.onRequestClose} style={customStyles} >
      <div>{props.errorMsg}</div>
      <form onSubmit={handleSubmit} action="index.php?controller=user&amp;action=update&amp;uid=<?php echo $_GET['uid'];?>" method="post">
        <div className="inputbox">
          <dl>
            <dt>{lang.USERNAME}</dt>
            <dd><input type="text" readOnly="readonly" value={user} name="user" size="20" /></dd>
          </dl>
          <dl>
            <dt>{lang.PASSWORD}</dt>
            <dd><input type="password" value={pwd} onChange={updatePassword} name="pwd" size="20" /></dd>
          </dl>
          <dl>
            <dt>{lang.EMAIL}</dt>
            <dd><input type="text" value={email} onChange={updateEmail} name="email" size="20" /></dd>
          </dl>
        </div>
        <div className="butbox">
          <dl>
            <dt><input type="submit" value={lang.UPDATE} /></dt>
          </dl>
        </div>
      </form>
    </Modal>
  );
}

export default UserUpdateModal;