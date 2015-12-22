let React = require('react');

let SignIn = require('./signIn.js'),
    SignUp = require('./signUp.js'),
    UpdateUser = require('./updateUser.js'),
    SignOutButton = require('./signOut.js');

let Header = React.createClass({
  render() {
    return (
      <div className="header">
        <SignIn 
          user={this.props.user} 
          lang={this.props.lang} 
          onUserSignedIn={this.props.onUserSignedIn}
        />
        <SignUp 
          user={this.props.user} 
          lang={this.props.lang} 
          onSignedUp={this.props.onSignedUp}
        />
        <UpdateUser 
          user={this.props.user}
          lang={this.props.lang} 
          onUserUpdated={this.props.onUserUpdated}
        />
        <SignOutButton 
          user={this.props.user} 
          lang={this.props.lang} 
          onUserLogout={this.props.onUserLogout} 
        />
      </div>
    );
  }
});

module.exports = Header;