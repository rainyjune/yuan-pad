import { MouseEvent } from 'react';
import { useTranslation, useDeleteUser } from '../common/dataHooks';
import type { IUser } from '../common/types';
import { mutate } from 'swr';

export default function UserItem({
  data: { uid, username, email },
  isSelected,
  onOpenUserUpdateModal,
  onToggleItem,
}: {
  isSelected: boolean;
  data: IUser;
  onOpenUserUpdateModal: (data: string | number) => void;
  onToggleItem: (id: number) => void;
}) {
  const { trigger } = useDeleteUser();
  const { data: lang } = useTranslation();
  async function deleteUser(e: MouseEvent) {
    e.preventDefault();
    if (!confirm(lang.DEL_SINGLEUSER_CONFIRM)) {
      return false;
    }
    await trigger(uid);
    mutate('getAllUsers');
  }
  function updateUser(e: MouseEvent) {
    e.preventDefault();
    onOpenUserUpdateModal(uid);
  }
  return (
    <tr className="row">
      <td className="col-xs-1 col-sm-1 col-md-1">
        <input type="checkbox" checked={isSelected} onChange={() => onToggleItem(Number(uid))} />
      </td>
      <td className="col-xs-3 col-sm-3 col-md-3">{username}</td>
      <td className="col-xs-6 col-sm-6 col-md-6">{email}</td>
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
