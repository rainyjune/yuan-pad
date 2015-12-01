var React = require('react');
var Modal = require('react-modal');

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

var Header = React.createClass({
  render: function() {
    var loginButton;
    if (this.props.user.admin || this.props.user.user) {
      loginButton = <LogoutButton 
        user={this.props.user} 
        userDetailedData={this.props.userDetailedData}
        lang={this.props.lang} 
        onUserUpdateSubmit={this.props.onUserUpdate} 
        onUserLogout={this.props.onUserLogout} />;
    } else {
      loginButton = <LoginButton registerErrorMsg={this.props.registerErrorMsg} loginErrorMsg={this.props.loginErrorMsg} lang={this.props.lang} onRegisterSubmit={this.props.onRegisterSubmit} onLoginSubmit={this.props.onLoginSubmit} />;
    }

    return (
      <div className="header">
        {loginButton}
      </div>
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
    
    this.refs.user.value = ''; 
    this.refs.password.value = ''; 
    return false;
  },
  render: function(){
    return (
      <Modal isOpen={this.props.loginModalIsOpen} onRequestClose={this.props.onRequestClose} style={customStyles} >
        <h2>Login</h2>
        <p>{this.props.loginErrorMsg}</p>
        <button onClick={this.props.onRequestClose}>close</button>
        <form onSubmit={this.handleSubmit} action="index.php?controller=user&amp;action=login" method="post">
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

var RegisterModal = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    
    var register = this.refs.register.value;
    var user = this.refs.user.value.trim();
    var pwd = this.refs.pwd.value.trim();
    var email = this.refs.email.value.trim();
    if (!user || !pwd || !email) return;
    
    this.props.onRegisterSubmit({ register: register, user: user, pwd: pwd, email: email}); 
    
    /*
    this.refs.user.value = ''; 
    this.refs.password.value = ''; 
    */
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

var UserUpdateModal = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var uid = this.refs.uid.value.trim();
    var user = this.refs.user.value.trim();
    var pwd = this.refs.pwd.value.trim();
    var email = this.refs.email.value.trim();
    if (!uid || !user || !pwd || !email) return;
    
    this.props.onUserUpdateSubmit({ uid: uid, user: user, pwd: pwd, email: email}); 
    
    // TODO Clear the inputs.
    //this.refs.user.value = ''; 
    //this.refs.password.value = ''; 
    return false;
  },
  render: function(){
    return (
      <Modal isOpen={this.props.userUpdateModalIsOpen} onRequestClose={this.closeLoginModal} style={customStyles} >
        <h2>Update profile</h2>
        <p>{this.props.userUpdateErrorMsg}</p>
        <button onClick={this.props.onRequestClose}>close</button>
        <form onSubmit={this.handleSubmit} action="index.php?controller=user&amp;action=update&amp" method="post">
        <input type="hidden" ref="uid" value={this.props.userDetailedData.uid} />        
          <dl>
          <dt>{this.props.lang.USERNAME}</dt>
          <dd><input type="text" readOnly="readonly" defaultValue={this.props.userDetailedData.username} ref="user" size="20"  />
          </dd>
          </dl>
          <dl>
          <dt>{this.props.lang.PASSWORD}</dt>
          <dd><input type="password" defaultValue={this.props.userDetailedData.password} ref="pwd" size="20"  />
          </dd>
          </dl>
          <dl>
          <dt>{this.props.lang.EMAIL}</dt>
          <dd><input type="text" defaultValue={this.props.userDetailedData.email} ref="email" size="20"  />
          </dd>
          </dl>
          <dl>
              <dt><input type="submit" value={this.props.lang.UPDATE} /></dt>
          </dl>
        </form>
      </Modal>
    );
  }
});

var LogoutButton = React.createClass({
  getInitialState: function() {
    return {
      userUpdateModalIsOpen: false
    };
  },
  openUserUpdateModal: function() {
    this.setState({userUpdateModalIsOpen: true});
  },
  closeUserUpdateModal: function() {
    this.setState({userUpdateModalIsOpen: false});
  },
  render: function() {
    var updateButton = ' ';
    if (this.props.user.user) {
      updateButton = <UserUpdateButton lang={this.props.lang} onShowUpdateModal={this.openUserUpdateModal} />;
    }
    return (
      <div>
        {updateButton}&nbsp;
        <a href='index.php?controller=user&amp;action=logout' onClick={this.props.onUserLogout}>{this.props.lang.LOGOUT}</a>
        <UserUpdateModal 
          user={this.props.user}
          userDetailedData={this.props.userDetailedData}
          userUpdateErrorMsg={this.props.userUpdateErrorMsg} 
          onUserUpdateSubmit={this.props.onUserUpdateSubmit} 
          userUpdateModalIsOpen={this.state.userUpdateModalIsOpen} 
          onRequestClose={this.closeUserUpdateModal} 
          lang={this.props.lang} />
      </div>
    );
  }
});

var UserUpdateButton = React.createClass({
  render: function() {
    return (
      <a href="javascript:void(0);" onClick={this.props.onShowUpdateModal}>{this.props.lang.UPDATE}</a>
    );
  }
});

var LoginButton = React.createClass({
  getInitialState: function() {
    return {
      registerModalIsOpen: false,
      loginModalIsOpen: false
    };
  },
  openLoginModal: function() {
    this.setState({loginModalIsOpen: true});
  },
  openRegisterModal: function() {
    this.setState({registerModalIsOpen: true});
  },
  closeLoginModal: function() {
    this.setState({loginModalIsOpen: false});
  },
  closeRegisterModal: function() {
    this.setState({registerModalIsOpen: false});
  },
  render: function() {
    return (
      <div>
        <a href='javascript:void(0);' onClick={this.openRegisterModal}>{this.props.lang.REGISTER}</a>&nbsp;
        <a href='javascript:void(0);' onClick={this.openLoginModal}>{this.props.lang.LOGIN}</a>
        <LoginModal 
          loginErrorMsg={this.props.loginErrorMsg} 
          onLoginSubmit={this.props.onLoginSubmit} 
          loginModalIsOpen={this.state.loginModalIsOpen} 
          onRequestClose={this.closeLoginModal} 
          lang={this.props.lang} />
        <RegisterModal 
          registerErrorMsg={this.props.registerErrorMsg} 
          onRegisterSubmit={this.props.onRegisterSubmit} 
          registerModalIsOpen={this.state.registerModalIsOpen} 
          onRequestClose={this.closeRegisterModal} 
          lang={this.props.lang} />
      </div>
    );
  }
});

module.exports = Header;