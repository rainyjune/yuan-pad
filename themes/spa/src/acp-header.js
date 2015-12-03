var React = require('react');

var ACPHeader = React.createClass({
  render: function() {
    return (
      <header>
        <a href="index.php">{this.props.lang.HOME}</a>&nbsp;
        <a href="javascript:void(0);" onClick={this.props.onLogout}>{this.props.lang.LOGOUT}</a>
      </header>
    );
  }
});

module.exports = ACPHeader;