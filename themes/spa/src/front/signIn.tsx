import { useState, MouseEvent, FormEvent } from 'react';
import Modal from 'react-modal';
import { mutate } from 'swr';

import ModalStyles from '../common/ModalStyles';
import { useTranslation, useSignIn } from '../common/dataHooks';

function SignIn() {
  const { trigger: triggerSignIn } = useSignIn();
  const { data: language } = useTranslation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  function openModal(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setModalIsOpen(true);
  }
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!username || !password) return;
    try {
      await triggerSignIn({ user: username, password: password });
      setErrorMsg('');
      setModalIsOpen(false);
      mutate('getUserInfo');
    } catch (e) {
      // error handling
      setErrorMsg(e as string);
    }
    return false;
  }
  return (
    <div className="signIn">
      <a onClick={openModal} role="button" className="btn btn-default">
        {language.LOGIN}
      </a>
      <Modal ariaHideApp={false} isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} style={ModalStyles}>
        <p className="text-danger">{errorMsg}</p>
        <form onSubmit={handleSubmit} action="#" method="post" autoComplete="off" className="flex flex-col gap-4">
          <div className="form-group">
            <input
              placeholder="Username"
              onChange={(e) => {
                setUsername(e.target.value);
                setErrorMsg('');
              }}
              value={username}
              type="text"
              className="h-[35px] border border-[#E2E8F0] rounded-[6px] px-[12px] py-[7px]"
              id="inputUsername"
              required
            />
          </div>
          <div className="form-group">
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrorMsg('');
              }}
              type="password"
              className="h-[35px] border border-[#E2E8F0] rounded-[6px] px-[12px] py-[7px]"
              id="inputPassword"
              placeholder="Password"
              required
            />
          </div>
          <button type="submit" className="bg-primary py-1.5 text-white rounded-md">
            {language.SUBMIT}
          </button>
        </form>
      </Modal>
    </div>
  );
}

export default SignIn;
