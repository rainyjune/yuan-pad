import { MouseEvent } from 'react';
import { useTranslation, useDeleteUser } from '../common/dataHooks';
import { mutate } from 'swr';

export default function UserItem(props: {
  isSelected: boolean;
  data: any;
  onOpenUserUpdateModal: (data: any) => void;
  onToggleItem: (id: number) => void;
}) {
  const { trigger } = useDeleteUser();
  const { data: lang } = useTranslation();
  async function deleteUser(e: MouseEvent) {
    e.preventDefault();
    if (!confirm(lang.DEL_SINGLEUSER_CONFIRM)) {
      return false;
    }
    await trigger(props.data.uid);
    mutate('getAllUsers');
  }
  function updateUser(e: MouseEvent) {
    e.preventDefault();
    props.onOpenUserUpdateModal(props.data.uid);
  }
  const user = props.data;
  return (
    <tr className="row">
      <td className="col-xs-1 col-sm-1 col-md-1">
        <input type="checkbox" checked={props.isSelected} onChange={() => props.onToggleItem(props.data.uid)} />
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
