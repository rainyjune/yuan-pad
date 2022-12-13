import React from 'react';
import dataProvider from './dataProvider.js';

function LogoutButton(props) {
  const handleSignOut = (e) => {
    e.preventDefault();
    dataProvider.signOut(() => {
      props.onCurrentUserUpdated({});
    });
  };
  return (<a role="button" className="btn btn-default signOutButton" href='#' onClick={handleSignOut}>{props.lang.LOGOUT}</a>);
}

export default LogoutButton;