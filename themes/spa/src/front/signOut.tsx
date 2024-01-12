import { MouseEvent, useContext } from 'react';
import dataProvider from '../common/dataProvider';
import LanguageContext from '../common/languageContext';

function LogoutButton(props: any) {
  function handleSignOut(e: MouseEvent) {
    e.preventDefault();
    dataProvider.signOut().then(() => {
      props.onCurrentUserUpdated({});
    });
  }
  const lang: any = useContext(LanguageContext);
  return (
    <a role="button" className="btn btn-default signOutButton" href="#" onClick={handleSignOut}>
      {lang.LOGOUT}
    </a>
  );
}

export default LogoutButton;
