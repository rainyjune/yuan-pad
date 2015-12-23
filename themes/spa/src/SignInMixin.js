let React = require('react');
let dataProvider = require('./dataProvider.js');

/**
 * Tested 1
 */
let SignInMixIn = {
  openModal() {
    this.setState({modalIsOpen: true});
  },
  closeModal() {
    this.setState({modalIsOpen: false});
  },
  handleSignIn(loginData) {
    dataProvider.signIn(loginData, res => {
      if (this.isMounted()) {
        if (res.statusCode === 200) {
          this.setState({errorMsg: '', modalIsOpen: false});
          this.props.onCurrentUserUpdated(res.response);
        } else if (res.statusCode === 304) {
          // The user had signed in before.
        } else {
          this.setState({errorMsg: res.response});
        }
      }
    });
  }
};

module.exports = SignInMixIn;