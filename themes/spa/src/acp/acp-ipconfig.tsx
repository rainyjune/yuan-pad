import { useContext, useEffect, useState } from "react";
import dataProvider from "../common/dataProvider";
import IPItem from "./IPItem";
import LanguageContext from "../common/languageContext";

function ACPIpConfig(props: any) {
  const lang = useContext(LanguageContext);
  const [IPs, setIPs] = useState([]);
  const toggle = (itemToToggle: any) => {
    let data = IPs.map((currentValue: any) => {
      if (currentValue === itemToToggle) {
        currentValue["checked"] = !currentValue["checked"];
      }
      return currentValue;
    });
    setMixState(data);
  };
  const toggleInputClicked = (e: any) => {
    toggleAll(e.target.checked);
  };
  const toggleAll = (checked: boolean) => {
    let data = IPs.map((currentValue: any) => {
      currentValue["checked"] = checked;
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
    return "ip";
  };
  const setMixState = (data: any) => {
    setIPs(data);
  };
  useEffect(() => {
    if (props.isActive) {
      loadBlackList();
    }
  }, [props.isActive]);
  const loadBlackList = async () => {
    const res = await dataProvider.getIPBlackList();
    if (res.status === 200 && res.data.statusCode === 200) {
      setIPs(res.data.response);
    } else {
      alert(res.data.statusText);
    }
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const checkedItems = getCheckedItems();
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
        alert("delete error");
      }
    });
  };
  const handleToggleItem = (item: any) => {
    toggle(item);
  };
  let IPList = IPs;
  const cssClass = "ip_container selectTag";
  let createIPItem = function (ip: any) {
    return <IPItem data={ip} key={ip.ip} onItemToggled={handleToggleItem} />;
  };
  return (
    <div className={cssClass}>
      <form onSubmit={handleSubmit} action="#" method="post">
        <table className="table table-striped table-hover">
          <thead>
            <tr className="header">
              <th>
                <input type="checkbox" onClick={toggleInputClicked} />
              </th>
              <th>{lang.BAD_IP}</th>
            </tr>
          </thead>
          <tbody>
            {IPList && IPList.map(createIPItem)}
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
