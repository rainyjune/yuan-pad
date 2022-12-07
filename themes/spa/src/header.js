import React from 'react';

import SignIn from './signIn.js';
import SignUp from './signUp.js';
import UpdateUser from './updateUser.js';
import SignOutButton from './signOut.js';

class Header extends React.Component {
  render() {
    let props = {
      user: this.props.user,
      lang: this.props.lang,
      onCurrentUserUpdated: this.props.onCurrentUserUpdated
    };
    return (
      <div className="header">
        {(()=> {
          switch (this.props.user.user_type) {
            case "regular":
              return <div><UpdateUser {...props} /><SignOutButton {...props} /></div>;
            case "admin":
              return <SignOutButton {...props} />;
            case "guest":
            default:
              return <div><SignIn {...props} /> <SignUp {...props} /></div>;
          }
        })()}
      </div>
    );
  }
}

module.exports = Header;