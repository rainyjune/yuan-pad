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

var UserUpdateModal = React.createClass({
  getInitialState: function() {
    return {
      uid: '',
      user: '',
      pwd: '',
      email: ''
    };
  },
  componentWillReceiveProps: function(nextProps) {
    if (nextProps.userData) {
      var userData = nextProps.userData;
      this.setState({
        uid: userData.uid,
        user: userData.username,
        pwd: userData.password,
        email: userData.email
      });
    }
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var user = this.state.user.trim();
    var pwd = this.state.pwd.trim();
    var email = this.state.email.trim();
    if (!user || !pwd || !email) return;
    this.props.onUpdateSubmit(this.state);
    return false;
  },
  updatePassword: function(e) {
    this.setState({
      pwd: e.target.value
    });
  },
  updateEmail: function(e) {
    this.setState({
      email: e.target.value
    });
  },
  render: function(){
    var lang = this.props.lang;
    return (
      <Modal isOpen={this.props.modalIsOpen} onRequestClose={this.props.onRequestClose} style={customStyles} >
        <div>{this.props.errorMsg}</div>
        <form onSubmit={this.handleSubmit} action="index.php?controller=user&amp;action=update&amp;uid=<?php echo $_GET['uid'];?>" method="post">
          <div className="inputbox">
            <dl>
              <dt>{lang.USERNAME}</dt>
              <dd><input type="text" readonly="readonly" value={this.state.user} name="user" size="20" /></dd>
            </dl>
            <dl>
              <dt>{lang.PASSWORD}</dt>
              <dd><input type="password" value={this.state.pwd} onChange={this.updatePassword} name="pwd" size="20" /></dd>
            </dl>
            <dl>
              <dt>{lang.EMAIL}</dt>
              <dd><input type="text" value={this.state.email} onChange={this.updateEmail} name="email" size="20" /></dd>
            </dl>
          </div>
          <div className="butbox">
            <dl>
              <dt><input type="submit" value={lang.UPDATE} /></dt>
            </dl>
          </div>
        </form>
      </Modal>
    );
  }
});

module.exports = UserUpdateModal;