var React = require('react');
var Modal = require('react-modal');
var dataProvider = require('./dataProvider.js');

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

var SignIn = React.createClass({
  getInitialState: function() {
    return {
      loginErrorMsg: '',
      loginModalIsOpen: false
    };
  },
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
  },
  render: function() {
    return (this.props.user.admin || this.props.user.uid) ?
           null :
      (
        <div>
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

var LoginModal = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var user = this.refs.user.value.trim();
    var pwd = this.refs.password.value.trim();
    if (!user || !pwd) return;
    this.props.onLoginSubmit({ user: user, password: pwd});
    return false;
  },
  render: function(){
    return (
      <Modal isOpen={this.props.loginModalIsOpen} onRequestClose={this.props.onRequestClose} style={customStyles} >
        <h2>Login</h2>
        <p>{this.props.loginErrorMsg}</p>
        <button onClick={this.props.onRequestClose}>close</button>
        <form onSubmit={this.handleSubmit} action="#" method="post">
          <table>
            <tbody>
              <tr>
                <td><label>{this.props.lang.USERNAME}</label></td>
                <td><input type="text" ref="user" size="20" /></td>
              </tr>
              <tr>
                <td><label>{this.props.lang.ADMIN_PWD}</label></td>
                <td><input type="password" ref="password" size="20" /></td>
              </tr>
              <tr>
                <td colSpan="2">
                  <input id="submit_button" name="submit" type="submit" value={this.props.lang.SUBMIT} />
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </Modal>
    );
  }
});

module.exports = SignIn;