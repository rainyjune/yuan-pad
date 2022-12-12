import React from 'react';
import dataProvider from './dataProvider.js';

class IPItem extends React.Component {
  constructor(props) {
    super(props);
    this.toggleItem = this.toggleItem.bind(this);
    this.toggleInputClicked = this.toggleInputClicked.bind(this);
  }
  toggleItem() {
    this.props.onItemToggled(this.props.data);
  }
  addSelectedFlag(arr) {
    if (Array.isArray(arr)) {
      arr.forEach((currentValue, index) => {
        currentValue['checked'] = false;
      });
    }
  }
  toggle(itemToToggle) {
    let field = this.getMixinAttr();
    let data = this.state[field].map((currentValue, index) => {
      if (currentValue === itemToToggle) {
        currentValue['checked'] = !currentValue['checked'];
      }
      return currentValue;
    });
    this.setMixState(data);
  }
  toggleInputClicked(e) {
    this.toggleAll(e.target.checked);
  }
  toggleAll(checked) {
    let field = this.getMixinAttr();
    let data = this.state[field].map((currentValue, index) => {
      currentValue['checked'] = checked;
      return currentValue;
    });
    this.setMixState(data);
  }
  checkAll(e) {
    e.preventDefault();
    this.toggleAll(true);
  }
  checkNone(e) {
    e.preventDefault();
    this.toggleAll(false);
  }
  checkXAll(e) {
    e.preventDefault();
    this.toggleXAll();
  }
  toggleXAll() {
    let field = this.getMixinAttr();
    let data = this.state[field].map((currentValue, index) => {
      currentValue['checked'] = !currentValue['checked'];
      return currentValue;
    });
    this.setMixState(data);
  }
  getCheckedItems() {
    let arr = [];
    let key = this.getItemKey();
    let field = this.getMixinAttr();
    this.state[field].forEach((currentValue, index) => {
      if (currentValue.checked) {
        arr.push(currentValue[key]);
      }
    });
    return arr;
  }
  render() {
    return (
      <tr className='admin_message'>
        <td><input type='checkbox' onChange={this.toggleItem} checked={this.props.data.checked} /></td>
        <td>{this.props.data.ip}</td>
      </tr>
    );
  }
}

class ACPIpConfig extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      IPs: []
    };
    this.toggleInputClicked = this.toggleInputClicked.bind(this);
    this.handleToggleItem = this.handleToggleItem.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  addSelectedFlag(arr) {
    if (Array.isArray(arr)) {
      arr.forEach((currentValue, index) => {
        currentValue['checked'] = false;
      });
    }
  }
  toggle(itemToToggle) {
    let field = this.getMixinAttr();
    let data = this.state[field].map((currentValue, index) => {
      if (currentValue === itemToToggle) {
        currentValue['checked'] = !currentValue['checked'];
      }
      return currentValue;
    });
    this.setMixState(data);
  }
  toggleInputClicked(e) {
    this.toggleAll(e.target.checked);
  }
  toggleAll(checked) {
    let field = this.getMixinAttr();
    let data = this.state[field].map((currentValue, index) => {
      currentValue['checked'] = checked;
      return currentValue;
    });
    this.setMixState(data);
  }
  checkAll(e) {
    e.preventDefault();
    this.toggleAll(true);
  }
  checkNone(e) {
    e.preventDefault();
    this.toggleAll(false);
  }
  checkXAll(e) {
    e.preventDefault();
    this.toggleXAll();
  }
  toggleXAll() {
    let field = this.getMixinAttr();
    let data = this.state[field].map((currentValue, index) => {
      currentValue['checked'] = !currentValue['checked'];
      return currentValue;
    });
    this.setMixState(data);
  }
  getCheckedItems() {
    let arr = [];
    let key = this.getItemKey();
    let field = this.getMixinAttr();
    this.state[field].forEach((currentValue, index) => {
      if (currentValue.checked) {
        arr.push(currentValue[key]);
      }
    });
    return arr;
  }
  getMixinAttr() {
    return 'IPs';
  }
  getItemKey() {
    return 'ip';
  }
  setMixState(data) {
    this.setState({IPs: data});
  }
  componentDidMount() {
    this.loadBlackList();
  }
  loadBlackList() {
    dataProvider.getIPBlackList(res => {
      if (res.statusCode === 200) {
        this.setState({IPs: res.response});
      }
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    let checkedItems = this.getCheckedItems();
    if (checkedItems.length === 0) {
      return false;
    }
    if (!confirm(this.props.lang.UPDATE_IPLIST_CONFIRM)) {
      return false;
    }
    dataProvider.deleteMultiIPs(checkedItems, res => {
      if (res.statusCode === 200) {
        this.loadBlackList();
      } else {
        alert('delete error');
      }
    });
  }
  handleToggleItem(item) {
    this.toggle(item);
  }
  render() {
    let IPList = this.state.IPs;
    let lang = this.props.lang;
    let cssClass = this.props.activeTab === "ban_ip" ? "ip_container selectTag" : "ip_container";
    let createIPItem = function(ip) {
      return (
        <IPItem
          data={ip}
          key={ip.ip}
          onItemToggled={this.handleToggleItem}
        />
      );
    };
    return (
      <div className={cssClass}>
        <form onSubmit={this.handleSubmit} action="#" method="post">
          <table className="table table-striped table-hover">
            <thead>
              <tr className="header">
                <th><input type="checkbox" onClick={this.toggleInputClicked} /></th>
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
}

export default ACPIpConfig;