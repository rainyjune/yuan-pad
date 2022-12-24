import React, { useContext } from 'react';

import SignIn from './signIn.js';
import SignUp from './signUp.js';
import UpdateUser from './updateUser.js';
import SignOutButton from './signOut.js';
import UserContext from './userContext.js';

function Header(props) {
  let propsObj = {
    onCurrentUserUpdated: props.onCurrentUserUpdated
  };
  const user = useContext(UserContext);
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