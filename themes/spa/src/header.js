let React = require('react');

let SignIn = require('./signIn.js'),
    SignUp = require('./signUp.js'),
    UpdateUser = require('./updateUser.js'),
    SignOutButton = require('./signOut.js');

let Header = React.createClass({
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
            case "guest":
              return <div><SignIn {...props} /> <SignUp {...props} /></div>;
            case "regular":
              return <div><UpdateUser {...props} /><SignOutButton {...props} /></div>;
            case "admin":
              return <SignOutButton {...props} />;
          }
        })()}
      </div>
    );
  }
});

module.exports = Header;