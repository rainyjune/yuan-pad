var React = require('react');
var dataProvider = require('./dataProvider.js');

var SignInMixIn = {
  
  openLoginModal: function() {
    this.setState({loginModalIsOpen: true});
  },
  closeLoginModal: function() {
    this.setState({loginModalIsOpen: false});
  },
  handleSignIn: function(loginData) {
    dataProvider.login(loginData, function(data){
      if (this.isMounted()) {
        if (data.error) {
          this.setState({loginErrorMsg: data.error_detail});
        } else {
          this.setState({loginErrorMsg: '', loginModalIsOpen: false});
          this.props.onUserSignedIn(data);
        }
      }
    }.bind(this), function(){
      debugger;
    }.bind(this));
  }
};

module.exports = SignInMixIn;