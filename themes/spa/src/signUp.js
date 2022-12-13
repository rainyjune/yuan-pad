import React, { useRef, useState } from 'react';
import Modal from 'react-modal';
import dataProvider from './dataProvider.js';

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

function SignUp(props) {
  const userRef = useRef(null);
  const passRef = useRef(null);
  const emailRef = useRef(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { lang: language } = props;
  const openModal = (e) => {
    e.preventDefault();
    setModalIsOpen(true);
  };
  const closeModal = (e) => {
    e.preventDefault();
    setModalIsOpen(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let user = userRef.current.value.trim(),
        pwd = passRef.current.value.trim(),
        email = emailRef.current.value.trim();
    if (!user || !pwd || !email) return;
    
    dataProvider.signUp({user, pwd, email}, res => {
      if (res.statusCode !== 200) {
        setErrorMsg(res.response);
      } else {
        setErrorMsg('');
        setModalIsOpen(false);
        props.onCurrentUserUpdated(res.response);
      }
    });
    return false;
  }
  return (
    <div className="signUp">
      <a role="button" className="btn btn-default" href='#' onClick={openModal}>{language.REGISTER}</a>
      <Modal ariaHideApp={false} isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles}>
        <p>{errorMsg}</p>
        <button onClick={closeModal}>close</button>
        <form onSubmit={handleSubmit} action="#" method="post">
          <fieldset>
            <legend>{language.REGISTER}</legend>
            <div className="form-group">
              <label htmlFor="inputUser">{language.USERNAME}</label>
              <input type="text" ref={userRef} className="form-control" id="inputUser" placeholder="Username" />
            </div>
            <div className="form-group">
              <label htmlFor="inputPassword">{language.PASSWORD}</label>
              <input type="password" ref={passRef} className="form-control" id="inputPassword" placeholder="Password" />
            </div>
            <div className="form-group">
              <label htmlFor="inputEmail">{language.EMAIL}</label>
              <input type="email" ref={emailRef} className="form-control" id="inputEmail" placeholder="" />
            </div>
            <button type="submit" className="btn btn-default">{language.REGISTER}</button>
          </fieldset>
        </form>
      </Modal>
    </div>
  );
}

export default SignUp;