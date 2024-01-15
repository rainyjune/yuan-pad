import { FormEvent, useContext, useState } from 'react';
import Modal from 'react-modal';
import dataProvider from '../common/dataProvider';
import UserContext from '../common/userContext';
import LanguageContext from '../common/languageContext';

import ModalStyles from './ModalStyles';
function UserUpdate(props: any) {
  const user: any = useContext(UserContext);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(user.email ?? '');
  const [errorMsg, setErrorMsg] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const language: any = useContext(LanguageContext);
  function openModal(e: any) {
    e.preventDefault();
    setModalIsOpen(true);
  }
  function closeModal() {
    setModalIsOpen(false);
  }
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;
    dataProvider.updateUser({ uid: user.uid, user: user.username, pwd: password, email }).then((res) => {
      if (res.data.statusCode === 200) {
        setErrorMsg('');
        setModalIsOpen(false);
        props.onCurrentUserUpdated(res.data.response);
      } else {
        alert(res.data.response);
        setErrorMsg(res.data.response);
      }
    });
    return false;
  }
  return (
    <div className="updateUser">
      <a role="button" className="btn btn-default" href="#" onClick={openModal}>
        {language.UPDATE}
      </a>
      <Modal ariaHideApp={false} isOpen={modalIsOpen} onRequestClose={closeModal} style={ModalStyles}>
        <p>{errorMsg}</p>
        <button onClick={closeModal}>close</button>
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
