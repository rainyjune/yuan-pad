var React = require('react');
var Modal = require('react-modal');

var SignIn = require('./signIn.js');

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
    return (!this.props.user.admin && !this.props.user.user) ?
           null :
           (<a href='javascript:void(0);' onClick={this.props.onUserLogout}>{this.props.lang.LOGOUT}</a>);
  }
});

var RegisterButton = React.createClass({
  render: function() {
    return (this.props.user.admin || this.props.user.user) ?
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

var UserUpdateButton = React.createClass({
  render: function() {
    return this.props.user.user ? (<a href="javascript:void(0);" onClick={this.props.onShowUpdateModal}>{this.props.lang.UPDATE}</a>) : null;
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

var Header = React.createClass({
  getInitialState: function() {
    return {
      registerModalIsOpen: false,
      loginModalIsOpen: false
    };
  },
  
  openRegisterModal: function() {
    this.setState({registerModalIsOpen: true});
  },
  
  closeRegisterModal: function() {
    this.setState({registerModalIsOpen: false});
  },
  render: function() {
    return (
      <div className="header">
        <SignIn 
          user={this.props.user} 
          lang={this.props.lang} 
          onUserSignedIn={this.props.onUserSignedIn}
        />
        <LogoutButton 
          user={this.props.user} 
          userDetailedData={this.props.userDetailedData}
          lang={this.props.lang} 
          onUserUpdateSubmit={this.props.onUserUpdate} 
          onUserLogout={this.props.onUserLogout} 
        />
        <RegisterButton
          user={this.props.user} 
          lang={this.props.lang} 
          onOpenRegisterModal={this.openRegisterModal}
        />
        <RegisterModal 
          registerErrorMsg={this.props.registerErrorMsg} 
          onRegisterSubmit={this.props.onRegisterSubmit} 
          registerModalIsOpen={this.state.registerModalIsOpen} 
          onRequestClose={this.closeRegisterModal} 
          lang={this.props.lang} 
        />
        <UserUpdateButton
          user={this.props.user}
          lang={this.props.lang} 
          onShowUpdateModal={this.openUserUpdateModal} 
        />
        <UserUpdateModal 
          user={this.props.user}
          userDetailedData={this.props.userDetailedData}
          userUpdateErrorMsg={this.props.userUpdateErrorMsg} 
          onUserUpdateSubmit={this.props.onUserUpdateSubmit} 
          userUpdateModalIsOpen={this.state.userUpdateModalIsOpen} 
          onRequestClose={this.closeUserUpdateModal} 
          lang={this.props.lang} 
        />
      </div>
    );
  }
});

module.exports = Header;