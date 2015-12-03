var React = require('react');

var ACPUser = React.createClass({
  render: function() {
    var cssClass = this.props.activeTab === "user" ? "user_container selectTag" : "user_container";
    return (
      <div className={cssClass}>
        This is the users component.
      </div>
    );
  }
});

module.exports = ACPUser;