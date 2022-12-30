import React, { useEffect, useState } from 'react';
import dataProvider from './dataProvider.ts';

function IPItem(props) {
  const toggleItem = () => {
    props.onItemToggled(props.data);
  };
  return (
    <tr className='admin_message'>
      <td><input type='checkbox' onChange={toggleItem} checked={props.data.checked} /></td>
      <td>{props.data.ip}</td>
    </tr>
  );
}

function ACPIpConfig(props) {
  const [IPs, setIPs] = useState([]);
  const toggle = (itemToToggle) => {
    let data = IPs.map((currentValue) => {
      if (currentValue === itemToToggle) {
        currentValue['checked'] = !currentValue['checked'];
      }
      return currentValue;
    });
    setMixState(data);
  };
  const toggleInputClicked = (e) => {
    toggleAll(e.target.checked);
  };
  const toggleAll = (checked) => {
    let data = IPs.map((currentValue) => {
      currentValue['checked'] = checked;
      return currentValue;
    });
    setMixState(data);
  };
  const getCheckedItems = () => {
    let arr = [];
    let key = getItemKey();
    IPs.forEach((currentValue) => {
      if (currentValue.checked) {
        arr.push(currentValue[key]);
      }
    });
    return arr;
  };
  const getItemKey = () => {
    return 'ip';
  };
  const setMixState = (data) => {
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
  const handleSubmit = (e) => {
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
  const handleToggleItem = (item) => {
    toggle(item);
  };
  let IPList = IPs;
  let lang = props.lang;
  let cssClass = props.activeTab === "ban_ip" ? "ip_container selectTag" : "ip_container";
  let createIPItem = function(ip) {
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
            {IPList && IPList.map(createIPItem, this)}
            <tr>
              <td colSpan='2' align='left'>
                <input type='submit' value={lang.DELETE_CHECKED} /></td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}

export default ACPIpConfig;