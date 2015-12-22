var React = require('react');

var SignIn = require('./signIn.js');
var SignUp = require('./signUp.js');
var UpdateUser = require('./updateUser.js');
var SignOutButton = require('./signOut.js');

var Header = React.createClass({
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