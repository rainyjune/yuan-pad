import { useState, MouseEvent, FormEvent } from 'react';
import UserUpdateModal from './acp-userUpdateModal';
import UserItem from './UserItem';
import type { IUser, IUserUpdate, IUserUpdateReducerAction } from '../common/types';
import {
  useTranslation,
  useAllUsers,
  useUpdateUser,
  useDeleteMutiUsers,
  useDeleteAllUsers,
  getState,
  userUpdateInitialState,
} from '../common/dataHooks';
import { mutate } from 'swr';

function ACPUser() {
  const { trigger: triggerUpdate } = useUpdateUser();
  const { trigger: triggerDeleteMulti } = useDeleteMutiUsers();
  const { trigger: triggerDeleteAll } = useDeleteAllUsers();
  const { data: lang } = useTranslation();
  const { data: users } = useAllUsers();
  const [modalInfo, setModalInfo] = useState(userUpdateInitialState);
  function dispatch(action: IUserUpdateReducerAction) {
    setModalInfo(getState(action));
  }
  const [selectedIds, setSelectedIds] = useState(new Set());

  function toggleInputClicked(e: React.ChangeEvent<HTMLInputElement>) {
    let nextIds = new Set();
    if (e.target.checked) {
      nextIds = new Set(users.map((item: IUser) => item.uid));
    }
    setSelectedIds(nextIds);
  }
  async function handleUpdateSubmit(newUserData: IUserUpdate) {
    try {
      await triggerUpdate(newUserData);
      dispatch({
        type: 'saved',
      });
      mutate('getAllUsers');
    } catch (e) {
      dispatch({
        type: 'error',
        id: Number(newUserData.uid),
        error: e as string,
      });
    }
  }
  async function deleteAllUsers(e: MouseEvent) {
    e.preventDefault();
    if (!confirm(lang.DEL_ALLUSER_CONFIRM)) {
      return;
    }
    try {
      await triggerDeleteAll();
      mutate('getAllUsers');
    } catch (e) {
      alert(e);
    }
  }
  async function handleDeleteMulti(e: FormEvent) {
    e.preventDefault();
    const checkedUids = Array.from(selectedIds);
    if (checkedUids.length === 0) {
      return;
    }
    if (!confirm(lang.DEL_SELECTEDUSERS_CONFIRM)) {
      return;
    }
    try {
      await triggerDeleteMulti(checkedUids);
      mutate('getAllUsers');
    } catch (e) {
      alert(e);
    }
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
            {users.map((user: IUser) => (
              <UserItem
                isSelected={selectedIds.has(user.uid)}
                data={user}
                key={user.uid}
                onOpenUserUpdateModal={(userId: number | string) => {
                  dispatch({
                    type: 'selected',
                    id: Number(userId),
                  });
                }}
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
          onRequestClose={() => {
            dispatch({
              type: 'cancelled',
            });
          }}
          onUpdateSubmit={handleUpdateSubmit}
        />
      </form>
    </div>
  );
}

export default ACPUser;
