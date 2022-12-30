import React, { useContext } from 'react';

import SignIn from './signIn';
import SignUp from './signUp.js';
import UpdateUser from './updateUser.js';
import SignOutButton from './signOut.js';
import UserContext from './userContext';

function Header(props: any) {
  let propsObj = {
    onCurrentUserUpdated: props.onCurrentUserUpdated
  };
  const user: any = useContext(UserContext);
  return (
    <div className="header">
      {(()=> {
        switch (user.user_type) {
          case "regular":
            return <div><UpdateUser {...propsObj} /><SignOutButton {...propsObj} /></div>;
          case "admin":
            return <SignOutButton {...propsObj} />;
          case "guest":
          default:
            return <div><SignIn {...propsObj} /> <SignUp {...propsObj} /></div>;
        }
      })()}
    </div>
  );
}

export default Header;