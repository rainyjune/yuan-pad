var React = require('react');
var dataProvider = require('./dataProvider.js');
var LoginModal = require('./signInModal.js');
var SignInMixIn = require('./SignInMixin.js');

var SignIn = React.createClass({
  mixins: [SignInMixIn], // Use the mixin
  getInitialState: function() {
    return {
      loginErrorMsg: '',
      loginModalIsOpen: false
    };
  },
  render: function() {
    return (this.props.user.admin || this.props.user.uid) ?
           null :
      (
        <div className="signIn">
          <LoginButton 
            user={this.props.user}
            lang={this.props.lang} 
            onOpenLoginModal={this.openLoginModal}
          />
          <LoginModal 
            loginErrorMsg={this.state.loginErrorMsg} 
            onLoginSubmit={this.handleSignIn} 
            loginModalIsOpen={this.state.loginModalIsOpen} 
            onRequestClose={this.closeLoginModal} 
            lang={this.props.lang} 
          />
        </div>
      );
  }
});

var LoginButton = React.createClass({  
  render: function() {
    return (
      <a href='javascript:void(0);' onClick={this.props.onOpenLoginModal}>{this.props.lang.LOGIN}</a>
    );
  }
});

module.exports = SignIn;