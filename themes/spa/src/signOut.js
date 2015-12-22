let React = require('react');
let dataProvider = require('./dataProvider.js');

let LogoutButton = React.createClass({
  handleSignOut(e) {
    e.preventDefault();
    dataProvider.signOut(() => {
      this.props.onUserLogout();
    });
  },
  render() {
    return (!this.props.user.admin && !this.props.user.uid) ?
           null :
           (<a className="signOutButton" href='#' onClick={this.handleSignOut}>{this.props.lang.LOGOUT}</a>);
  }
});

module.exports = LogoutButton;