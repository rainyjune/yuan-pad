var React = require('react');

var ACPTableHeaderItem = React.createClass({
  updateActiveTab: function(e) {
    e.preventDefault();
    var tabLink = e.target;
    var newTabName = tabLink.getAttribute('data-tabname');
    if (newTabName === this.props.activeTab) {
      return false;
    }
    this.props.onTabSelected(newTabName);
  },
  render: function() {
    var itemClass = this.props.value === this.props.activeTab ? "selectTag" : "";
    return (
      <li className={itemClass}>
        <a href="javascript:void(0);" data-tabname={this.props.value} onClick={this.updateActiveTab}>{this.props.text}</a>
      </li>
    )
  }
});

var ACPTabHeader = React.createClass({
  render: function() {
    if (this.props.user.user_type !== "admin") return null;
    var activeTab = this.props.activeTab;
    var onTabSelected = this.props.onTabSelected;
    var items = this.props.tabs.map(function(tab) {
      return (
        <ACPTableHeaderItem 
          onTabSelected={onTabSelected}
          text={tab.text}
          value={tab.value}
          key={tab.value}
          activeTab={activeTab} />
      );
    });
    return (
      <div className="tabs">
        <ul>
          {items}
        </ul>
      </div>
    );
  }
});

module.exports = ACPTabHeader;