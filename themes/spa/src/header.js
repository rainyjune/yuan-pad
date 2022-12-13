import React from 'react';

import SignIn from './signIn.js';
import SignUp from './signUp.js';
import UpdateUser from './updateUser.js';
import SignOutButton from './signOut.js';

function Header(props) {
  let propsObj = {
    user: props.user,
    lang: props.lang,
    onCurrentUserUpdated: props.onCurrentUserUpdated
  };
  return (
    <div className="header">
      {(()=> {
        switch (props.user.user_type) {
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