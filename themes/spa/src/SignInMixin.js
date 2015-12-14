var React = require('react');
var dataProvider = require('./dataProvider.js');

/**
 * Tested 1
 */
var SignInMixIn = {
  openLoginModal: function() {
    this.setState({loginModalIsOpen: true});
  },
  closeLoginModal: function() {
    this.setState({loginModalIsOpen: false});
  },
  handleSignIn: function(loginData) {
    dataProvider.signIn(loginData, function(res){
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
    }.bind(this), function(){
      debugger;
    }.bind(this));
  }
};

module.exports = SignInMixIn;