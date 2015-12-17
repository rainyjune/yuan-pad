var React = require('react');
var dataProvider = require('./dataProvider.js');
var FormItemMixin = require('./formItemMixin.js');

var IPItem = React.createClass({
  toggleItem: function() {
    this.props.onItemToggled(this.props.data);
  },
  render: function() {
    return (
      <tr className='admin_message'>
        <td><input type='checkbox' onChange={this.toggleItem} checked={this.props.data.checked} /></td>
        <td>{this.props.data.ip}</td>
      </tr>
    );
  }
});

var ACPIpConfig = React.createClass({
  getInitialState: function() {
    return {
      IPs: []
    };
  },
  mixins: [FormItemMixin],
  getMixinAttr: function() {
    return 'IPs';
  },
  getItemKey: function() {
    return 'ip';
  },
  setMixState: function(data) {
    this.setState({IPs: data});
  },
  componentDidMount: function() {
    this.loadBlackList();
  },
  loadBlackList: function() {
    dataProvider.getIPBlackList(function(res) {
      if (res.statusCode === 200) {
        this.setState({IPs: res.response});
      }
    }.bind(this));
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var checkedItems = this.getCheckedItems();
    debugger;
    dataProvider.deleteMultiIPs(checkedItems, function(res) {
      debugger;
      if (res.statusCode === 200) {
        this.loadBlackList();
      } else {
        alert('delete error');
      }
    }.bind(this));
  },
  handleToggleItem: function(item) {
    this.toggle(item);
  },
  render: function() {
    var IPList = this.state.IPs;
    var lang = this.props.lang;
    var cssClass = this.props.activeTab === "ban_ip" ? "ip_container selectTag" : "ip_container";
    var createIPItem = function(ip) {
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
          <table className="table2">
            <thead>
              <tr className="header">
                <th>{lang.SELECT}</th><th>{lang.BAD_IP}</th>
              </tr>
            </thead>
            <tbody>
              {IPList && IPList.map(createIPItem, this)}
              <tr>
                <td colSpan='2' align='left'>
                  <span>
                    <a href="#" onClick={this.checkAll}>{lang.CHECK_ALL}</a> &nbsp;
                    <a href="#" onClick={this.checkNone}>{lang.CHECK_NONE}</a> &nbsp;
                    <a href="#" onClick={this.checkXAll}>{lang.CHECK_INVERT}</a>&nbsp;
                  </span>
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