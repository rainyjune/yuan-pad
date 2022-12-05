let React = require('react');
let dataProvider = require('./dataProvider.js');
let FormItemMixin = require('./formItemMixin.js');
const createReactClass = require('create-react-class');

let IPItem = createReactClass({
  toggleItem() {
    this.props.onItemToggled(this.props.data);
  },
  render() {
    return (
      <tr className='admin_message'>
        <td><input type='checkbox' onChange={this.toggleItem} checked={this.props.data.checked} /></td>
        <td>{this.props.data.ip}</td>
      </tr>
    );
  }
});

let ACPIpConfig = createReactClass({
  getInitialState() {
    return {
      IPs: []
    };
  },
  mixins: [FormItemMixin],
  getMixinAttr() {
    return 'IPs';
  },
  getItemKey() {
    return 'ip';
  },
  setMixState(data) {
    this.setState({IPs: data});
  },
  componentDidMount() {
    this.loadBlackList();
  },
  loadBlackList() {
    dataProvider.getIPBlackList(res => {
      if (res.statusCode === 200) {
        this.setState({IPs: res.response});
      }
    });
  },
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
  },
  handleToggleItem(item) {
    this.toggle(item);
  },
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
});

module.exports = ACPIpConfig;