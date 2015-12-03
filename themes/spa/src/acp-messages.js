var React = require('react');

var ACPMessages = React.createClass({
  render: function() {
    var cssClass = this.props.activeTab === "message" ? "message_container selectTag" : "message_container";
    return (
      <div className={cssClass}>
        This is the ACP messages.
      </div>
    );
  }
});

module.exports = ACPMessages;