let React = require('react');

let ACPTableHeaderItem = React.createClass({
  updateActiveTab(e) {
    e.preventDefault();
    let tabLink = e.target;
    let newTabName = tabLink.getAttribute('data-tabname');
    if (newTabName === this.props.activeTab) {
      return false;
    }
    this.props.onTabSelected(newTabName);
  },
  render() {
    let itemClass = this.props.value === this.props.activeTab ? "selectTag" : "";
    return (
      <li className={itemClass}>
        <a href="javascript:void(0);" data-tabname={this.props.value} onClick={this.updateActiveTab}>{this.props.text}</a>
      </li>
    )
  }
});

let ACPTabHeader = React.createClass({
  render() {
    if (this.props.user.user_type !== "admin") return null;
    let activeTab = this.props.activeTab;
    let onTabSelected = this.props.onTabSelected;
    let items = this.props.tabs.map(tab => {
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