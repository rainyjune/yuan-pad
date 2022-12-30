import React, { useContext } from 'react';
import dataProvider from './dataProvider.ts';
import LanguageContext from './languageContext.js';

function LogoutButton(props) {
  const handleSignOut = (e) => {
    e.preventDefault();
    dataProvider.signOut(() => {
      props.onCurrentUserUpdated({});
    });
  };
  const lang = useContext(LanguageContext);
  return (<a role="button" className="btn btn-default signOutButton" href='#' onClick={handleSignOut}>{lang.LOGOUT}</a>);
}

export default LogoutButton;