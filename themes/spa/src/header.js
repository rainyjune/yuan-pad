let React = require('react');
const createReactClass = require('create-react-class');

let SignIn = require('./signIn.js'),
    SignUp = require('./signUp.js'),
    UpdateUser = require('./updateUser.js'),
    SignOutButton = require('./signOut.js');

let Header = createReactClass({
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
});

module.exports = Header;