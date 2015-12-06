var React = require('react');
var LogoutButton = React.createClass({
  render: function() {
    return (!this.props.user.admin && !this.props.user.user) ?
           null :
           (<a href='javascript:void(0);' onClick={this.props.onUserLogout}>{this.props.lang.LOGOUT}</a>);
  }
});

module.exports = LogoutButton;