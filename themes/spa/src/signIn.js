import React, { useContext, useRef, useState } from 'react';
import Modal from 'react-modal';
import dataProvider from './dataProvider';
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

function SignIn(props) {
  const language = useContext(LanguageContext);
  const userRef = useRef(null);
  const passRef = useRef(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setModalIsOpen(true)
  };
  const closeModal = () => setModalIsOpen(false);
  const handleSignIn = (loginData) => {
    dataProvider.signIn(loginData, res => {
      if (res.statusCode === 200) {
        setErrorMsg('');
        setModalIsOpen(false);
        props.onCurrentUserUpdated(res.response);
      } else if (res.statusCode === 304) {
        // The user had signed in before.
      } else {
        //this.setState({errorMsg: res.response});
        setErrorMsg(res.response);
      }
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let user = userRef.current.value.trim(),
        pwd = passRef.current.value.trim();
    if (!user || !pwd) return;
    handleSignIn({ user, password: pwd});
    return false;
  };
  return (
    <div className="signIn">
      <a href='#' onClick={openModal} role="button" className="btn btn-default">{language.LOGIN}</a>
      <Modal ariaHideApp={false} isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles}>
        <p>{errorMsg}</p>
        <button onClick={closeModal}>close</button>
        <form onSubmit={handleSubmit} action="#" method="post">
          <div className="form-group">
            <label htmlFor="inputUsername">{language.USERNAME}</label>
            <input ref={userRef} type="text" className="form-control" id="inputUsername" placeholder="" />
          </div>
          <div className="form-group">
            <label htmlFor="inputPassword">{language.ADMIN_PWD}</label>
            <input ref={passRef} type="password" className="form-control" id="inputPassword" placeholder="" />
          </div>
          <button type="submit" className="btn btn-default">{language.SUBMIT}</button>
        </form>
      </Modal>
    </div>
  );
}

export default SignIn;