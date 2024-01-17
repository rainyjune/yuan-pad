import { FormEvent, useState, MouseEvent } from 'react';
import Modal from 'react-modal';
import { mutate } from 'swr';
import { useTranslation, useSignUp } from '../common/dataHooks';

import ModalStyles from './ModalStyles';

function SignUp() {
  const { trigger: signUp } = useSignUp();
  const { data: language } = useTranslation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const user = username,
      pwd = password;
    if (!user || !pwd || !email) return;

    try {
      await signUp({ user, pwd, email });
      setErrorMsg('');
      setModalIsOpen(false);
      mutate('getUserInfo');
    } catch (e) {
      setErrorMsg(e);
    }
  }
  return (
    <div className="signUp">
      <a
        role="button"
        className="btn btn-default"
        onClick={(e: MouseEvent<HTMLAnchorElement>) => {
          e.preventDefault();
          setModalIsOpen(true);
        }}
      >
        {language.REGISTER}
      </a>
      <Modal
        ariaHideApp={false}
        isOpen={modalIsOpen}
        onRequestClose={() => {
          setModalIsOpen(false);
        }}
        style={ModalStyles}
      >
        <p>{errorMsg}</p>
        <form onSubmit={handleSubmit} action="#" method="post" autoComplete="off">
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
                autoComplete="off"
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
