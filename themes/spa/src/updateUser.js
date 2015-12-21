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

var UserUpdate = React.createClass({
  getInitialState: function() {
    return {
      userUpdateErrorMsg: '',
      userUpdateModalIsOpen: false
    };
  },
  openUserUpdateModal: function() {
    this.setState({userUpdateModalIsOpen: true});
  },
  closeUserUpdateModal: function() {
    this.setState({userUpdateModalIsOpen: false});
  },
  handleUserUpdate: function(userData) {
    dataProvider.updateUser(userData,  data => {
        console.log('update user result:', data, userData);
        if (data.error) {
          if (this.isMounted()) {
            this.setState({userUpdateErrorMsg: data.error_detail});
          }
        } else {
          if (this.isMounted()) {
            this.setState({userUpdateErrorMsg: '', userUpdateModalIsOpen: false});
            this.props.onUserUpdated();
          }
        }
      },
      function(xhr, status, err) {
        debugger;
      }.bind(this));
  },
  render: function() {
    return this.props.user.uid ?
            (
              <div className="updateUser">
                <UserUpdateButton 
                  lang={this.props.lang}
                  onShowUpdateModal={this.openUserUpdateModal}
                />
                <UserUpdateModal
                  lang={this.props.lang}
                  user={this.props.user}
                  userUpdateModalIsOpen={this.state.userUpdateModalIsOpen}
                  userUpdateErrorMsg={this.state.userUpdateErrorMsg}
                  onRequestClose={this.closeUserUpdateModal}
                  onUserUpdateSubmit={this.handleUserUpdate}
                />
              </div>
            ) : null;
  }
});

var UserUpdateButton = React.createClass({
  render: function() {
    return (
      <a href="javascript:void(0);" onClick={this.props.onShowUpdateModal}>{this.props.lang.UPDATE}</a>
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
    if (!uid || !user || !email) return;
    this.props.onUserUpdateSubmit({ uid: uid, user: user, pwd: pwd, email: email}); 
    return false;
  },
  render: function(){
    return (
      <Modal isOpen={this.props.userUpdateModalIsOpen} onRequestClose={this.props.onRequestClose} style={customStyles} >
        <h2>Update profile</h2>
        <p>{this.props.userUpdateErrorMsg}</p>
        <button onClick={this.props.onRequestClose}>close</button>
        <form onSubmit={this.handleSubmit} action="#" method="post">
        <input type="hidden" ref="uid" value={this.props.user.uid} />        
          <dl>
          <dt>{this.props.lang.USERNAME}</dt>
          <dd><input type="text" readOnly="readonly" defaultValue={this.props.user.username} ref="user" size="20"  />
          </dd>
          </dl>
          <dl>
          <dt>{this.props.lang.PASSWORD}</dt>
          <dd><input type="password" defaultValue={this.props.user.password} ref="pwd" size="20"  />
          </dd>
          </dl>
          <dl>
          <dt>{this.props.lang.EMAIL}</dt>
          <dd><input type="text" defaultValue={this.props.user.email} ref="email" size="20"  />
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

module.exports = UserUpdate;