import React, { ChangeEvent, FormEvent, useContext, useRef, useState } from 'react';
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

function SignUp(props: any) {
  const userRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const language: any = useContext(LanguageContext);
  const openModal = (e: any) => {
    e.preventDefault();
    setModalIsOpen(true);
  };
  const closeModal = (e: any) => {
    e.preventDefault();
    setModalIsOpen(false);
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    let user = userRef.current?.value.trim(),
        pwd = passRef.current?.value.trim(),
        email = emailRef.current?.value.trim();
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