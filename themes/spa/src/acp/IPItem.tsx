import type { IPItemProps } from '../common/types';

export default function IPItem({ onItemToggled, data, isSelected }: IPItemProps) {
  return (
    <tr className="admin_message">
      <td>
        <input type="checkbox" onChange={() => onItemToggled(data.ip)} checked={isSelected} />
      </td>
      <td>{data.ip}</td>
    </tr>
  );
}
