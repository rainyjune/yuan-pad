import { FormEvent, useRef, useState } from 'react';
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

function ACPLogin(props: any) {
  const userRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const handleSignIn = (loginData: any) => {
    dataProvider.signIn(loginData, res => {
      if (res.statusCode === 200) {
        setErrorMsg('');
        setModalIsOpen(false);
        props.onCurrentUserUpdated(res.response);
      } else if (res.statusCode === 304) {
        // The user had signed in before.
      } else {
        setErrorMsg(res.response)
      }
    });
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // TODO
    let user = userRef.current?.value.trim(),
        pwd = passRef.current?.value.trim();
    if (!user || !pwd) return;
    handleSignIn({ user, password: pwd});
    return false;
  };
  const goToHome = () => {
    window.location.href = 'index.php';
  };
  const dismissAlert = () => {
    setErrorMsg('');
  };

  let language = props.lang;
  let alertStyle = {
    display: errorMsg === "" ? "none" : "block"
  };
  return (
    <div className="signIn">
      <Modal ariaHideApp={false} isOpen={modalIsOpen} style={customStyles}>
        <div style={alertStyle} className="alert alert-danger" role="alert">
          <button onClick={dismissAlert} type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
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
          <button type="submit" className="btn btn-default">{language.SUBMIT}</button>
          <button onClick={goToHome} type="button" className="btn btn-default">{language.CANCEL}</button>
        </form>
      </Modal>
    </div>
  );
}

export default ACPLogin;