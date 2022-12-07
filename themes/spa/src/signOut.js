import React from 'react';
import dataProvider from './dataProvider.js';

class LogoutButton extends React.Component{
  constructor(props) {
    super(props);
    this.handleSignOut = this.handleSignOut.bind(this);
  }
  handleSignOut(e) {
    e.preventDefault();
    dataProvider.signOut(() => {
      this.props.onCurrentUserUpdated({});
    });
  }
  render() {
    return (<a role="button" className="btn btn-default signOutButton" href='#' onClick={this.handleSignOut}>{this.props.lang.LOGOUT}</a>);
  }
}

export default LogoutButton;