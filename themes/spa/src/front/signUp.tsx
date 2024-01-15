import { FormEvent, useContext, useState } from 'react';
import Modal from 'react-modal';
import dataProvider from '../common/dataProvider';
import LanguageContext from '../common/languageContext';

import ModalStyles from './ModalStyles';

function SignUp(props: any) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const language: any = useContext(LanguageContext);
  function openModal(e: any) {
    e.preventDefault();
    setModalIsOpen(true);
  }
  function closeModal(e: any) {
    e.preventDefault();
    setModalIsOpen(false);
  }
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const user = username,
      pwd = password;
    if (!user || !pwd || !email) return;

    dataProvider.signUp({ user, pwd, email }).then((res) => {
      if (res.data.statusCode !== 200) {
        setErrorMsg(res.data.response);
      } else {
        setErrorMsg('');
        setModalIsOpen(false);
        props.onCurrentUserUpdated(res.data.response);
      }
    });
    return false;
  }
  return (
    <div className="signUp">
      <a role="button" className="btn btn-default" href="#" onClick={openModal}>
        {language.REGISTER}
      </a>
      <Modal ariaHideApp={false} isOpen={modalIsOpen} onRequestClose={closeModal} style={ModalStyles}>
        <p>{errorMsg}</p>
        <button onClick={closeModal}>close</button>
        <form onSubmit={handleSubmit} action="#" method="post">
          <fieldset>
            <legend>{language.REGISTER}</legend>
            <div className="form-group">
              <label htmlFor="inputUser">{language.USERNAME}</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="form-control"
                id="inputUser"
                placeholder="Username"
              />
            </div>
            <div className="form-group">
              <label htmlFor="inputPassword">{language.PASSWORD}</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                id="inputPassword"
                placeholder="Password"
              />
            </div>
            <div className="form-group">
              <label htmlFor="inputEmail">{language.EMAIL}</label>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="form-control"
                id="inputEmail"
                placeholder=""
              />
            </div>
            <button type="submit" className="btn btn-default">
              {language.REGISTER}
            </button>
          </fieldset>
        </form>
      </Modal>
    </div>
  );
}

export default SignUp;
