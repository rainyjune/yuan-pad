var React = require('react');
var LoginModal = require('./signInModal.js');
var SignInMixIn = require('./SignInMixin.js');

var ACPLogin = React.createClass({
  mixins: [SignInMixIn], // Use the mixin
  getInitialState() {
    return {
      loginErrorMsg: '',
      loginModalIsOpen: true
    };
  },
  render() {
    return (this.props.user.user_type === "admin") ?
           null :
      (
        <div>
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

module.exports = ACPLogin;