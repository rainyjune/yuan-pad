import { useContext, useEffect, useState, ChangeEvent } from 'react';
import dataProvider from '../common/dataProvider';
import IPItem from './IPItem';
import LanguageContext from '../common/languageContext';
import type { ITranslationData } from '../common/types';

function ACPIpConfig(props: { systemInformation: object }) {
  const lang: ITranslationData = useContext(LanguageContext);
  const [IPs, setIPs] = useState([]);
  const [selectedIds, setSelectedIds] = useState(new Set());

  function toggleInputClicked(e: ChangeEvent<HTMLInputElement>) {
    let nextIds = new Set();
    if (e.target.checked) {
      nextIds = new Set(IPs.map((item) => item.ip));
    }
    setSelectedIds(nextIds);
  }
  useEffect(() => {
    loadBlackList();
  }, []);
  async function loadBlackList() {
    const res = await dataProvider.getIPBlackList();
    if (res.status === 200 && res.data.statusCode === 200) {
      setIPs(res.data.response);
    } else {
      alert(res.data.statusText);
    }
  }
  function handleSubmit(e: any) {
    e.preventDefault();
    const checkedItems = Array.from(selectedIds);
    if (checkedItems.length === 0) {
      return false;
    }
    if (!confirm(lang.UPDATE_IPLIST_CONFIRM)) {
      return false;
    }
    dataProvider.deleteMultiIPs(checkedItems).then((res) => {
      if (res.data.statusCode === 200) {
        loadBlackList();
      } else {
        alert('delete error');
      }
    });
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
            {IPs.map((ip: any) => (
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
