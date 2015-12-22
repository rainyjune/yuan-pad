var React = require('react');
var dataProvider = require('./dataProvider.js');

/**
 * Tested 1
 */
var SignInMixIn = {
  openLoginModal() {
    this.setState({loginModalIsOpen: true});
  },
  closeLoginModal() {
    this.setState({loginModalIsOpen: false});
  },
  handleSignIn(loginData) {
    dataProvider.signIn(loginData, res => {
      if (this.isMounted()) {
        if (res.statusCode === 200) {
          this.setState({loginErrorMsg: '', loginModalIsOpen: false});
          this.props.onUserSignedIn(res.response);
        } else if (res.statusCode === 304) {
          // The user had signed in before.
        } else {
          this.setState({loginErrorMsg: res.response});
        }
      }
    }, function(){
      debugger;
    }.bind(this));
  }
};

module.exports = SignInMixIn;