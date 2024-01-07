import dataProvider from '../common/dataProvider';

export default function UserItem(props: any) {
  /**
   * Tested 1.
   */
  const deleteUser = (e: any) => {
    e.preventDefault();
    if (!confirm(props.lang.DEL_SINGLEUSER_CONFIRM)) {
      return false;
    }
    dataProvider.deleteUser(props.data.uid, res=> {
      if (res.statusCode === 200) {
        props.onUserDeleted();
      }
    });
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
    props.onToggleItem(props.data);
  };
  let user = props.data;
  let lang = props.lang;
  return (
    <tr className="row">
      <td className="col-xs-1 col-sm-1 col-md-1"><input type='checkbox' checked={props.data.checked} onChange={toggleItem} /></td>
      <td className="col-xs-3 col-sm-3 col-md-3">{user.username}</td>
      <td className="col-xs-6 col-sm-6 col-md-6">{user.email}</td>
      <td className="col-xs-2 col-sm-2 col-md-2">
        <a className="btn btn-danger btn-sm" onClick={deleteUser} href="#">{lang.DELETE}</a>
        <a className="btn btn-default btn-sm" onClick={updateUser} href='#'>{lang.UPDATE}</a>
      </td>
    </tr>
  );
}