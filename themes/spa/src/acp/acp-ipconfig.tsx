import { useEffect, useState } from 'react';
import dataProvider from '../common/dataProvider';
import IPItem from './IPItem';


function ACPIpConfig(props: any) {
  const [IPs, setIPs] = useState([]);
  const toggle = (itemToToggle: any) => {
    let data = IPs.map((currentValue: any) => {
      if (currentValue === itemToToggle) {
        currentValue['checked'] = !currentValue['checked'];
      }
      return currentValue;
    });
    setMixState(data);
  };
  const toggleInputClicked = (e:any) => {
    toggleAll(e.target.checked);
  };
  const toggleAll = (checked: boolean) => {
    let data = IPs.map((currentValue: any) => {
      currentValue['checked'] = checked;
      return currentValue;
    });
    setMixState(data);
  };
  const getCheckedItems = () => {
    let arr: Array<any> = [];
    let key = getItemKey();
    IPs.forEach((currentValue: any) => {
      if (currentValue.checked) {
        arr.push(currentValue[key]);
      }
    });
    return arr;
  };
  const getItemKey = () => {
    return 'ip';
  };
  const setMixState = (data: any) => {
    setIPs(data);
  };
  useEffect(() => {
    loadBlackList();
  }, []);
  const loadBlackList = () => {
    dataProvider.getIPBlackList(res => {
      if (res.statusCode === 200) {
        setIPs(res.response);
      }
    });
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    let checkedItems = getCheckedItems();
    if (checkedItems.length === 0) {
      return false;
    }
    if (!confirm(props.lang.UPDATE_IPLIST_CONFIRM)) {
      return false;
    }
    dataProvider.deleteMultiIPs(checkedItems, res => {
      if (res.statusCode === 200) {
        loadBlackList();
      } else {
        alert('delete error');
      }
    });
  };
  const handleToggleItem = (item: any) => {
    toggle(item);
  };
  let IPList = IPs;
  let lang = props.lang;
  let cssClass = props.isActive ? "ip_container selectTag" : "ip_container";
  let createIPItem = function(ip: any) {
    return (
      <IPItem
        data={ip}
        key={ip.ip}
        onItemToggled={handleToggleItem}
      />
    );
  };
  return (
    <div className={cssClass}>
      <form onSubmit={handleSubmit} action="#" method="post">
        <table className="table table-striped table-hover">
          <thead>
            <tr className="header">
              <th><input type="checkbox" onClick={toggleInputClicked} /></th>
              <th>{lang.BAD_IP}</th>
            </tr>
          </thead>
          <tbody>
            {IPList && IPList.map(createIPItem)}
            <tr>
              <td colSpan={2} align='left'>
                <input type='submit' value={lang.DELETE_CHECKED} /></td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}

export default ACPIpConfig;