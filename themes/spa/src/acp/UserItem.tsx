import { useContext, useReducer } from 'react';
import LanguageContext from '../common/languageContext';
import { usersReducer, dispatchMiddleware } from './usersReducer';

export default function UserItem(props: any) {
  const [, dispatchBase] = useReducer(usersReducer, []);
  const dispatch = dispatchMiddleware(dispatchBase);
  const lang = useContext(LanguageContext);
  /**
   * Tested 1.
   */
  const deleteUser = (e: any) => {
    e.preventDefault();
    if (!confirm(lang.DEL_SINGLEUSER_CONFIRM)) {
      return false;
    }
    dispatch({
      type: 'delete',
      uid: props.data.uid,
    });
    props.onUserDeleted();
  };
  /**
   * Tested 1.
   */
  const updateUser = (e: any) => {
    e.preventDefault();
    props.onOpenUserUpdateModal(props.data);
  };
  /**
   * Tested 1.
   */
  const toggleItem = () => {
    props.onToggleItem(props.data.uid);
  };
  const user = props.data;
  return (
    <tr className="row">
      <td className="col-xs-1 col-sm-1 col-md-1">
        <input type="checkbox" checked={user.checked} onChange={toggleItem} />
      </td>
      <td className="col-xs-3 col-sm-3 col-md-3">{user.username}</td>
      <td className="col-xs-6 col-sm-6 col-md-6">{user.email}</td>
      <td className="col-xs-2 col-sm-2 col-md-2">
        <a className="btn btn-danger btn-sm" onClick={deleteUser} href="#">
          {lang.DELETE}
        </a>
        <a className="btn btn-default btn-sm" onClick={updateUser} href="#">
          {lang.UPDATE}
        </a>
      </td>
    </tr>
  );
}
