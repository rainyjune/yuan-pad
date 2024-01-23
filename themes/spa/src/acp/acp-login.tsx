import { FormEvent, useState } from 'react';
import Modal from 'react-modal';

import customStyles from '../common/ModalStyles';
import { useTranslation, useSignIn } from '../common/dataHooks';
import { mutate } from 'swr';

function ACPLogin() {
  const { trigger } = useSignIn();
  const { data: language } = useTranslation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(true);
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const user = username,
      pwd = password;
    if (!user || !pwd) return;
    try {
      await trigger({ user, password: pwd });
      setErrorMsg('');
      setModalIsOpen(false);
      mutate('getUserInfo');
    } catch (e) {
      setErrorMsg(e as string);
    }
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
            <input
              id="inputUsername"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-control"
              placeholder="admin"
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputPassword">{language.ADMIN_PWD}</label>
            <input
              id="inputPassword"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              placeholder="Password"
            />
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
