import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react';
import Modal from 'react-modal';

import customStyles from '../common/ModalStyles';
import LanguageContext from '../common/languageContext';

function UserUpdateModal(props: any) {
  const lang = useContext(LanguageContext);
  const [uid, setUid] = useState('');
  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [email, setEmail] = useState('');
  console.log('userdata:', props.userData);
  useEffect(() => {
    if (props.userData) {
      let userData = props.userData;
      setUid(userData.uid);
      setUser(userData.username);
      setEmail(userData.email);
    }
  }, [props.userData]);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    let user1 = user.trim(),
      pwd1 = pwd.trim(),
      email1 = email.trim();
    if (!user1 || !email1) return;
    props.onUpdateSubmit({
      uid,
      user: user1,
      pwd: pwd1,
      email: email1,
    });
    return false;
  };
  const updatePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPwd(e.target.value);
  };
  const updateEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  return (
    <Modal ariaHideApp={false} isOpen={props.modalIsOpen} onRequestClose={props.onRequestClose} style={customStyles}>
      <div>{props.errorMsg}</div>
      <form onSubmit={handleSubmit} action="#" method="post">
        <div className="inputbox">
          <dl>
            <dt>{lang.USERNAME}</dt>
            <dd>
              <input type="text" readOnly={true} value={user} name="user" size={20} />
            </dd>
          </dl>
          <dl>
            <dt>{lang.PASSWORD}</dt>
            <dd>
              <input type="password" value={pwd} onChange={updatePassword} name="pwd" size={20} />
            </dd>
          </dl>
          <dl>
            <dt>{lang.EMAIL}</dt>
            <dd>
              <input type="text" value={email} onChange={updateEmail} name="email" size={20} />
            </dd>
          </dl>
        </div>
        <div className="butbox">
          <dl>
            <dt>
              <input type="submit" value={lang.UPDATE} />
            </dt>
          </dl>
        </div>
      </form>
    </Modal>
  );
}

export default UserUpdateModal;
