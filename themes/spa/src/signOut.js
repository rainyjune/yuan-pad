let React = require('react');
const createReactClass = require('create-react-class');
let dataProvider = require('./dataProvider.js');

let LogoutButton = createReactClass({
  handleSignOut(e) {
    e.preventDefault();
    dataProvider.signOut(() => {
      this.props.onCurrentUserUpdated({});
    });
  },
  render() {
    return (<a role="button" className="btn btn-default signOutButton" href='#' onClick={this.handleSignOut}>{this.props.lang.LOGOUT}</a>);
  }
});

module.exports = LogoutButton;