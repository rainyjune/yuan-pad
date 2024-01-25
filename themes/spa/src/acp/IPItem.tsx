import type { IBannedIPItem } from '../common/types';

export default function IPItem({
  onItemToggled,
  data,
  isSelected,
}: {
  onItemToggled: (ip: string) => void;
  isSelected: boolean;
  data: IBannedIPItem;
}) {
  return (
    <tr className="admin_message">
      <td>
        <input type="checkbox" onChange={() => onItemToggled(data.ip)} checked={isSelected} />
      </td>
      <td>{data.ip}</td>
    </tr>
  );
}
