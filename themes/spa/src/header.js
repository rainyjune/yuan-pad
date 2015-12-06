var React = require('react');
var Modal = require('react-modal');

var SignIn = require('./signIn.js');
var SignUp = require('./signUp.js');
var UpdateUser = require('./updateUser.js');
var SignOutButton = require('./signOut.js');

var Header = React.createClass({
  render: function() {
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
          userDetailedData = {this.props.userDetailedData}
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