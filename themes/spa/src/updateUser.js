let React = require('react');
let Modal = require('react-modal');
let dataProvider = require('./dataProvider.js');

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

let UserUpdate = React.createClass({
  getInitialState() {
    return {
      userUpdateErrorMsg: '',
      userUpdateModalIsOpen: false
    };
  },
  openUserUpdateModal() {
    this.setState({userUpdateModalIsOpen: true});
  },
  closeUserUpdateModal() {
    this.setState({userUpdateModalIsOpen: false});
  },
  handleUserUpdate(userData) {
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
  render() {
    return this.props.user.user_type === "regular" ?
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

let UserUpdateButton = React.createClass({
  render() {
    return (
      <a href="javascript:void(0);" onClick={this.props.onShowUpdateModal}>{this.props.lang.UPDATE}</a>
    );
  }
});

let UserUpdateModal = React.createClass({
  handleSubmit(e) {
    e.preventDefault();
    let uid = this.refs.uid.value.trim(),
        user = this.refs.user.value.trim(),
        pwd = this.refs.pwd.value.trim(),
        email = this.refs.email.value.trim();
    if (!uid || !user || !email) return;
    this.props.onUserUpdateSubmit({ uid, user, pwd, email}); 
    return false;
  },
  render(){
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