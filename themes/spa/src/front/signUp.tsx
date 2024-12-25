import { FormEvent, useState, MouseEvent } from 'react';
import Modal from 'react-modal';
import { mutate } from 'swr';
import { useTranslation, useSignUp } from '../common/dataHooks';

import ModalStyles from '../common/ModalStyles';

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
      setErrorMsg(e as string);
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
          <fieldset className="flex flex-col gap-4">
            <div className="text-center font-normal font-medium text-[18px] text-[#303030]">{language.REGISTER}</div>
            <div className="form-group">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="h-[35px] border border-[#E2E8F0] rounded-[6px] px-[12px] py-[7px]"
                id="inputUser"
                placeholder="Username"
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-[35px] border border-[#E2E8F0] rounded-[6px] px-[12px] py-[7px]"
                id="inputPassword"
                placeholder="Password"
              />
            </div>
            <div className="form-group">
              <input
                placeholder="Email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="h-[35px] border border-[#E2E8F0] rounded-[6px] px-[12px] py-[7px]"
                id="inputEmail"
                autoComplete="off"
              />
            </div>
            <button type="submit" className="bg-[#27B981] py-[6px] text-white rounded-[6px]">
              {language.REGISTER}
            </button>
          </fieldset>
        </form>
      </Modal>
    </div>
  );
}

export default SignUp;
