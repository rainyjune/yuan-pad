import React, { MouseEvent, useContext } from 'react';
import dataProvider from './dataProvider';
import LanguageContext from './languageContext';

function LogoutButton(props: any) {
  const handleSignOut = (e: MouseEvent) => {
    e.preventDefault();
    dataProvider.signOut(() => {
      props.onCurrentUserUpdated({});
    });
  };
  const lang: any = useContext(LanguageContext);
  return (<a role="button" className="btn btn-default signOutButton" href='#' onClick={handleSignOut}>{lang.LOGOUT}</a>);
}

export default LogoutButton;