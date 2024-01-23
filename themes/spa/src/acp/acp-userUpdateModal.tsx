import { ChangeEvent, FormEvent, useState } from 'react';
import Modal from 'react-modal';

import customStyles from '../common/ModalStyles';
import { useTranslation } from '../common/dataHooks';

function UserUpdateModal(props: any) {
  const { data: lang } = useTranslation();
  const [pwd, setPwd] = useState('');
  const [email, setEmail] = useState(props.userData?.email ?? '');
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const email1 = email.trim();
    if (!email1) return;
    props.onUpdateSubmit({
      uid: props.userData.uid,
      user: props.userData.username,
      pwd: pwd.trim(),
      email: email1,
    });
    return false;
  }
  return (
    <Modal ariaHideApp={false} isOpen={props.modalIsOpen} onRequestClose={props.onRequestClose} style={customStyles}>
      <div>{props.errorMsg}</div>
      <form onSubmit={handleSubmit} action="#" method="post">
        <div className="inputbox">
          <dl>
            <dt>{lang.USERNAME}</dt>
            <dd>
              <input type="text" readOnly={true} value={props.userData?.username ?? ''} name="user" size={20} />
            </dd>
          </dl>
          <dl>
            <dt>{lang.PASSWORD}</dt>
            <dd>
              <input
                type="password"
                value={pwd}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setPwd(e.target.value)}
                name="pwd"
                size={20}
              />
            </dd>
          </dl>
          <dl>
            <dt>{lang.EMAIL}</dt>
            <dd>
              <input
                type="text"
                value={email}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                name="email"
                size={20}
              />
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
