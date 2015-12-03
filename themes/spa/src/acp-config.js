var React = require('react');

var ACPConfig = React.createClass({
  render: function() {
    var cssClass = this.props.activeTab === "siteset" ? "configContainer selectTag" : "configContainer";
    return (
      <div className={cssClass}>
        This is the ACP config.
      </div>
    );
  }
});

module.exports = ACPConfig;