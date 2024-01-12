import { useContext, useEffect, useState, useReducer } from 'react';
import UserUpdateModal from './acp-userUpdateModal';
import UserItem from './UserItem';
import LanguageContext from '../common/languageContext';
import { usersReducer, dispatchMiddleware } from './usersReducer';

function ACPUser(props: any) {
  const lang = useContext(LanguageContext);
  const [users, dispatchBase] = useReducer(usersReducer, []);
  const dispatch = dispatchMiddleware(dispatchBase);
  const [modalInfo, setModalInfo] = useState({
    updateErrorMsg: '',
    updateModalIsOpen: false,
    updatedModalUserData: null,
  });
  function toggle(uid: number) {
    dispatch({
      type: 'toggle',
      uid,
    });
  }
  function toggleInputClicked(e: React.ChangeEvent<HTMLInputElement>) {
    toggleAll(e.target.checked);
  }
  function toggleAll(checked: boolean) {
    dispatch({
      type: 'toggleAll',
      checked,
    });
  }
  function getCheckedItems() {
    const arr: number[] = [];
    users.forEach((currentValue: any) => {
      if (currentValue.checked) {
        arr.push(currentValue.uid);
      }
    });
    return arr;
  }

  useEffect(() => {
    dispatch({ type: 'loadAll' });
  }, []);

  async function loadAllUsersFromServer() {
    dispatch({ type: 'loadAll' });
  }
  function handleUserDeleted() {
    loadAllUsersFromServer();
  }
  function handleUpdateSubmit(newUserData: any) {
    dispatch({
      type: 'update',
      data: newUserData,
    });
    setModalInfo({
      updateErrorMsg: '',
      updatedModalUserData: null,
      updateModalIsOpen: false,
    });
    dispatch({ type: 'loadAll' });
  }
  function closeUpdateModal() {
    setModalInfo({
      updateErrorMsg: '',
      updatedModalUserData: null,
      updateModalIsOpen: false,
    });
  }
  function openUserUpdateModal(userData: any) {
    setModalInfo({
      updateErrorMsg: '',
      updatedModalUserData: userData,
      updateModalIsOpen: true,
    });
  }
  /**
   * Tested 1.
   */
  function deleteAllUsers(e: any) {
    e.preventDefault();
    if (!confirm(lang.DEL_ALLUSER_CONFIRM)) {
      return false;
    }
    dispatch({
      type: 'deleteAll',
    });
    dispatch({
      type: 'loadAll',
    });
  }
  function handleDeleteMulti(e: any) {
    e.preventDefault();
    const checkedUids = getCheckedItems();
    if (checkedUids.length === 0) {
      return false;
    }
    if (!confirm(lang.DEL_SELECTEDUSERS_CONFIRM)) {
      return false;
    }
    dispatch({
      type: 'deleteMulti',
      data: checkedUids,
    });
    dispatch({
      type: 'loadAll',
    });
  }
  function handleToggleItem(uid: number) {
    toggle(uid);
  }
  const cssClass = 'user_container selectTag';
  function createUserItem(user: any) {
    return (
      <UserItem
        data={user}
        key={user.uid}
        onOpenUserUpdateModal={openUserUpdateModal}
        onUserDeleted={handleUserDeleted}
        onToggleItem={handleToggleItem}
      />
    );
  }
  return (
    <div className={cssClass}>
      <form onSubmit={handleDeleteMulti} action="#" method="post">
        <table className="table table-striped table-hover">
          <thead>
            <tr className="header row">
              <th className="col-xs-1 col-sm-1 col-md-1">
                <input type="checkbox" onChange={toggleInputClicked} />
              </th>
              <th className="col-xs-3 col-sm-3 col-md-3">{lang.NICKNAME}</th>
              <th className="col-xs-6 col-sm-6 col-md-6">{lang.EMAIL}</th>
              <th className="col-xs-2 col-sm-2 col-md-2">{lang.OPERATION}</th>
            </tr>
          </thead>
          <tbody>{users.map(createUserItem)}</tbody>
          <tfoot>
            <tr>
              <td colSpan={4}>
                <input type="submit" value={lang.DELETE_CHECKED} />
                <button onClick={deleteAllUsers}>{lang.DELETE_ALL}</button>
              </td>
            </tr>
          </tfoot>
        </table>
        <UserUpdateModal
          userData={modalInfo.updatedModalUserData}
          errorMsg={modalInfo.updateErrorMsg}
          modalIsOpen={modalInfo.updateModalIsOpen}
          onRequestClose={closeUpdateModal}
          onUpdateSubmit={handleUpdateSubmit}
        />
      </form>
    </div>
  );
}

export default ACPUser;
