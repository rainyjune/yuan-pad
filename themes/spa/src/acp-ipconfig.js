var React = require('react');

var IPItem = React.createClass({
  render: function() {
    return (
      <tr className='admin_message'>
        <td><input type='checkbox' name='select_ip[]' value={this.props.data.ip} /></td>
        <td>{this.props.data.ip}</td>
      </tr>
    );
  }
});

var ACPIpConfig = React.createClass({
  render: function() {
    var IPList = this.props.acpData.ban_ip_info;
    var lang = this.props.lang;
    var cssClass = this.props.activeTab === "ban_ip" ? "ip_container selectTag" : "ip_container";
    var createIPItem = function(ip) {
      return (
        <IPItem
          data={ip}
          key={ip.ip}
        />
      );
    };
    return (
      <div className={cssClass}>
        <form id="banip_manage" action="index.php?controller=badip&amp;action=update" method="post">
          <table className="table2">
            <thead>
              <tr className="header">
                <th>{lang.SELECT}</th><th>{lang.BAD_IP}</th>
              </tr>
            </thead>
            <tbody>
              {IPList && IPList.map(createIPItem)}
              <tr>
                <td colSpan='2' align='left'>
                  <span>
                    <a href="#" id="ip_checkall">{lang.CHECK_ALL}</a> &nbsp;
                    <a href="#" id="ip_checknone">{lang.CHECK_NONE}</a> &nbsp;
                    <a href="#" id="ip_checkxor">{lang.CHECK_INVERT}</a>&nbsp;
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