import { useContext, useEffect, useState, useReducer } from 'react';
import UserUpdateModal from './acp-userUpdateModal';
import UserItem from './UserItem';
import LanguageContext from '../common/languageContext';
import { usersReducer, dispatchMiddleware } from './usersReducer';
import { userUpdateInitialState, userUpdateReducer } from './userUpdateReducer';
import type { IUser } from '../common/types';

function ACPUser() {
  const lang = useContext(LanguageContext);
  const [users, dispatchBase] = useReducer(usersReducer, []);
  const dispatch = dispatchMiddleware(dispatchBase);
  const [modalInfo, setModalInfo] = useReducer(userUpdateReducer, userUpdateInitialState);
  const [selectedIds, setSelectedIds] = useState(new Set());

  function toggleInputClicked(e: React.ChangeEvent<HTMLInputElement>) {
    let nextIds = new Set();
    if (e.target.checked) {
      nextIds = new Set(users.map((item: IUser) => item.uid));
    }
    setSelectedIds(nextIds);
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
      type: 'saved',
    });
    dispatch({ type: 'loadAll' });
  }
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
    const checkedUids = Array.from(selectedIds);
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
  function handleToggleItem(toggledId: number) {
    // Create a copy (to avoid mutation).
    const nextIds = new Set(selectedIds);
    if (nextIds.has(toggledId)) {
      nextIds.delete(toggledId);
    } else {
      nextIds.add(toggledId);
    }
    setSelectedIds(nextIds);
  }
  const cssClass = 'user_container selectTag';
  const updatedModalUserData = users.find((user: IUser) => user.uid === modalInfo.updatedModalUserId);
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
          <tbody>
            {users.map((user: any) => (
              <UserItem
                isSelected={selectedIds.has(user.uid)}
                data={user}
                key={user.uid}
                onOpenUserUpdateModal={(userId: any) => {
                  setModalInfo({
                    type: 'selected',
                    id: userId,
                  });
                }}
                onUserDeleted={handleUserDeleted}
                onToggleItem={handleToggleItem}
              />
            ))}
          </tbody>
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
          key={`update-${modalInfo.updatedModalUserId}`}
          userData={updatedModalUserData}
          errorMsg={modalInfo.updateErrorMsg}
          modalIsOpen={modalInfo.updateModalIsOpen}
          onRequestClose={() =>
            setModalInfo({
              type: 'cancelled',
            })
          }
          onUpdateSubmit={handleUpdateSubmit}
        />
      </form>
    </div>
  );
}

export default ACPUser;
