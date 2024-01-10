export default function IPItem(props: any) {
  const toggleItem = () => {
    props.onItemToggled(props.data);
  };
  return (
    <tr className="admin_message">
      <td>
        <input
          type="checkbox"
          onChange={toggleItem}
          checked={props.data.checked}
        />
      </td>
      <td>{props.data.ip}</td>
    </tr>
  );
}
