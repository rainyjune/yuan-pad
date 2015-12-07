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

var RegisterButton = React.createClass({
  render: function() {
    return (this.props.user.admin || this.props.user.uid) ?
           null : 
           (<a href='javascript:void(0);' onClick={this.props.onOpenRegisterModal}>{this.props.lang.REGISTER}</a>);
  }
});

var RegisterModal = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var register = this.refs.register.value;
    var user = this.refs.user.value.trim();
    var pwd = this.refs.pwd.value.trim();
    var email = this.refs.email.value.trim();
    if (!user || !pwd || !email) return;
    this.props.onRegisterSubmit({ register: register, user: user, pwd: pwd, email: email}); 
    return false;
  },
  render: function(){
    return (
      <Modal isOpen={this.props.registerModalIsOpen} onRequestClose={this.props.onRequestClose} style={customStyles} >
        <h2>Register</h2>
        <p>{this.props.registerErrorMsg}</p>
        <button onClick={this.props.onRequestClose}>close</button>
        <form onSubmit={this.handleSubmit} action="index.php?controller=user&amp;action=create" method="post">
                <fieldset>
                          <legend>{this.props.lang.REGISTER}</legend>
            <input type="hidden" ref="register" value="true" />
          
              <dl>
            <dt>{this.props.lang.USERNAME}</dt>
            <dd><input type="text" ref="user" size="20" />
            </dd>
              </dl>
              <dl>
            <dt>{this.props.lang.PASSWORD}</dt>
            <dd><input type="password" ref="pwd" size="20" />
            </dd>
              </dl>
              <dl>
            <dt>{this.props.lang.EMAIL}</dt>
            <dd><input type="text" ref="email" size="20" />
            </dd>
              </dl>
              <dl>
                  <dt><input type="submit" value={this.props.lang.REGISTER} /></dt>
              </dl>
            </fieldset>
        </form>
          
      </Modal>
    );
  }
});


var SignUp = React.createClass({
  getInitialState: function() {
    return {
      registerErrorMsg: '',
      registerModalIsOpen: false
    };
  },
  openRegisterModal: function() {
    this.setState({registerModalIsOpen: true});
  },
  closeRegisterModal: function() {
    this.setState({registerModalIsOpen: false});
  },
  handleSignUp: function(userData) {
    dataProvider.signUp(userData,function(data) {
        console.log('create user result:', data);
        if (data.error) {
          if (this.isMounted()) {
            this.setState({registerErrorMsg: data.error_detail});
          }
        } else {
          if (this.isMounted()) {
            this.setState({registerErrorMsg: '', registerModalIsOpen: false})//, currentUser: data});
          }
          this.props.onSignedUp(data);
          //this.loadUserDataFromServer(data.uid); // Load user profile from server.
        }
      }.bind(this),
      function(xhr, status, err) {
        debugger;
      }.bind(this)
    );
  },
  render: function() {
    return (this.props.user.admin || this.props.user.uid) ?
           null :
      (
        <div>
          <RegisterButton 
            user={this.props.user}
            lang={this.props.lang} 
            onOpenRegisterModal={this.openRegisterModal}
          />
          <RegisterModal 
            registerErrorMsg={this.state.registerErrorMsg} 
            onRegisterSubmit={this.handleSignUp} 
            registerModalIsOpen={this.state.registerModalIsOpen} 
            onRequestClose={this.closeRegisterModal} 
            lang={this.props.lang} 
          />
        </div>
      );
  }
});

module.exports = SignUp;

