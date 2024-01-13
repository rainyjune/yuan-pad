export default function IPItem(props: any) {
  return (
    <tr className="admin_message">
      <td>
        <input type="checkbox" onChange={() => props.onItemToggled(props.data.ip)} checked={props.isSelected} />
      </td>
      <td>{props.data.ip}</td>
    </tr>
  );
}
