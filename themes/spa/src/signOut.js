var React = require('react');
var dataProvider = require('./dataProvider.js');

var LogoutButton = React.createClass({
  handleSignOut: function(e) {
    e.preventDefault();
    dataProvider.signOut(() => {
      this.props.onUserLogout();
    });
  },
  render: function() {
    return (!this.props.user.admin && !this.props.user.uid) ?
           null :
           (<a className="signOutButton" href='#' onClick={this.handleSignOut}>{this.props.lang.LOGOUT}</a>);
  }
});

module.exports = LogoutButton;