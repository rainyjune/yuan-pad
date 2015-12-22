let React = require('react');
let dataProvider = require('./dataProvider.js');
let LoginModal = require('./signInModal.js');
let SignInMixIn = require('./SignInMixin.js');

let SignIn = React.createClass({
  mixins: [SignInMixIn], // Use the mixin
  getInitialState() {
    return {
      loginErrorMsg: '',
      loginModalIsOpen: false
    };
  },
  render() {
    return this.props.user.user_type != 'guest' ?
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

let LoginButton = React.createClass({  
  render() {
    return (
      <a href='javascript:void(0);' onClick={this.props.onOpenLoginModal}>{this.props.lang.LOGIN}</a>
    );
  }
});

module.exports = SignIn;