import { FormEvent, useState } from 'react';
import Modal from 'react-modal';
import { mutate } from 'swr';
import { useUser, useTranslation, useUpdateUser } from '../common/dataHooks';

import ModalStyles from './ModalStyles';
function UserUpdate(props: any) {
  const { trigger: triggerUpdate, data, error, reset, isMutating } = useUpdateUser();
  const { data: language } = useTranslation();
  const { user: user } = useUser();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(user.email ?? '');
  const [errorMsg, setErrorMsg] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;
    try {
      const result = await triggerUpdate({ uid: user.uid, user: user.username, pwd: password, email });
      setPassword('');
      setErrorMsg('');
      setModalIsOpen(false);
      mutate('getUserInfo', { ...result }, { revalidate: false });
    } catch (e) {
      setErrorMsg(e);
    }
    return false;
  }
  return (
    <div className="updateUser">
      <a
        role="button"
        className="btn btn-default"
        href="#"
        onClick={(e: any) => {
          e.preventDefault();
          setModalIsOpen(true);
        }}
      >
        {language.UPDATE}
      </a>
      <Modal ariaHideApp={false} isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} style={ModalStyles}>
        <p>{errorMsg}</p>
        <form onSubmit={handleSubmit} action="#" method="post">
          <div className="form-group">
            <label htmlFor="inputUser">{language.USERNAME}</label>
            <input type="text" readOnly={true} defaultValue={user.username} className="form-control" id="inputUser" />
          </div>
          <div className="form-group">
            <label htmlFor="inputPassword">{language.PASSWORD}</label>
            <input
              type="password"
              value={password}
              className="form-control"
              id="inputPassword"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputEmail">{language.EMAIL}</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="inputEmail"
            />
          </div>
          <button type="submit" className="btn btn-default">
            {language.UPDATE}
          </button>
        </form>
      </Modal>
    </div>
  );
}

export default UserUpdate;
