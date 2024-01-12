import { FormEvent, useContext, useRef, useState } from 'react';
import Modal from 'react-modal';
import dataProvider from '../common/dataProvider';

import customStyles from '../common/ModalStyles';
import LanguageContext from '../common/languageContext';

function ACPLogin(props: any) {
  const language = useContext(LanguageContext);
  const userRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(true);
  function handleSignIn(loginData: any) {
    dataProvider.signIn(loginData).then((res) => {
      if (res.data.statusCode === 200) {
        setErrorMsg('');
        setModalIsOpen(false);
        props.onCurrentUserUpdated(res.data.response);
      } else if (res.data.statusCode === 304) {
        // The user had signed in before.
      } else {
        setErrorMsg(res.data.response);
      }
    });
  }
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    // TODO
    let user = userRef.current?.value.trim(),
      pwd = passRef.current?.value.trim();
    if (!user || !pwd) return;
    handleSignIn({ user, password: pwd });
    return false;
  }
  function goToHome() {
    window.location.href = 'index.php';
  }
  function dismissAlert() {
    setErrorMsg('');
  }
  const alertStyle = {
    display: errorMsg === '' ? 'none' : 'block',
  };
  return (
    <div className="signIn">
      <Modal ariaHideApp={false} isOpen={modalIsOpen} style={customStyles}>
        <div style={alertStyle} className="alert alert-danger" role="alert">
          <button onClick={dismissAlert} type="button" className="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <p>{errorMsg}</p>
        </div>
        <form onSubmit={handleSubmit} action="#" method="post">
          <div className="form-group">
            <label htmlFor="inputUsername">{language.USERNAME}</label>
            <input id="inputUsername" type="text" ref={userRef} className="form-control" placeholder="admin" />
          </div>
          <div className="form-group">
            <label htmlFor="inputPassword">{language.ADMIN_PWD}</label>
            <input id="inputPassword" type="password" ref={passRef} className="form-control" placeholder="Password" />
          </div>
          <button type="submit" className="btn btn-default">
            {language.SUBMIT}
          </button>
          <button onClick={goToHome} type="button" className="btn btn-default">
            {language.CANCEL}
          </button>
        </form>
      </Modal>
    </div>
  );
}

export default ACPLogin;
