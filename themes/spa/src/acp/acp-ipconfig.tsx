import { useState, ChangeEvent, FormEvent } from 'react';
import IPItem from './IPItem';
import { useTranslation, useIPBlackList, useDeleteMultiIPs } from '../common/dataHooks';
import { IBannedIPItem } from '../common/types';

function ACPIpConfig() {
  const { trigger } = useDeleteMultiIPs();
  const { data: lang } = useTranslation();
  const { data: IPs, mutate } = useIPBlackList();
  const [selectedIds, setSelectedIds] = useState(new Set<string>());

  function toggleInputClicked(e: ChangeEvent<HTMLInputElement>) {
    let nextIds = new Set<string>();
    if (e.target.checked) {
      nextIds = new Set(IPs.map((item: IBannedIPItem) => item.ip));
    }
    setSelectedIds(nextIds);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const checkedItems = Array.from(selectedIds);
    if (checkedItems.length === 0) {
      return false;
    }
    if (!confirm(lang.UPDATE_IPLIST_CONFIRM)) {
      return false;
    }
    try {
      await trigger(checkedItems);
      mutate();
    } catch (e) {
      alert(e);
    }
  }
  function handleToggleItem(toggledId: string) {
    // Create a copy (to avoid mutation).
    const nextIds = new Set(selectedIds);
    if (nextIds.has(toggledId)) {
      nextIds.delete(toggledId);
    } else {
      nextIds.add(toggledId);
    }
    setSelectedIds(nextIds);
  }
  return (
    <div className="ip_container selectTag">
      <form onSubmit={handleSubmit} action="#" method="post">
        <table className="table table-striped table-hover">
          <thead>
            <tr className="header">
              <th>
                <input type="checkbox" onChange={toggleInputClicked} />
              </th>
              <th>{lang.BAD_IP}</th>
            </tr>
          </thead>
          <tbody>
            {IPs.map((ip: IBannedIPItem) => (
              <IPItem isSelected={selectedIds.has(ip.ip)} data={ip} key={ip.ip} onItemToggled={handleToggleItem} />
            ))}
            <tr>
              <td colSpan={2} align="left">
                <input type="submit" value={lang.DELETE_CHECKED} />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}

export default ACPIpConfig;
