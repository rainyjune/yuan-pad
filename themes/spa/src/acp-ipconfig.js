var React = require('react');

var ACPIpConfig = React.createClass({
  render: function() {
    var cssClass = this.props.activeTab === "ban_ip" ? "ip_container selectTag" : "ip_container";
    return (
      <div className={cssClass}>
        This is the ACP IP Config.
      </div>
    );
  }
});

module.exports = ACPIpConfig;