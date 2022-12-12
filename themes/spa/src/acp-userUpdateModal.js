let React = require('react');
let Modal = require('react-modal');
let dataProvider = require('./dataProvider.js');
const createReactClass = require('create-react-class');

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

let UserUpdateModal = createReactClass({
  getInitialState() {
    return {
      uid: '',
      user: '',
      pwd: '',
      email: ''
    };
  },
  componentWillReceiveProps(nextProps) {
    if (nextProps.userData) {
      let userData = nextProps.userData;
      this.setState({
        uid: userData.uid,
        user: userData.username,
        pwd: userData.password,
        email: userData.email
      });
    }
  },
  handleSubmit(e) {
    e.preventDefault();
    let user = this.state.user.trim(),
        pwd = this.state.pwd.trim(),
        email = this.state.email.trim();
    if (!user || !email) return;
    this.props.onUpdateSubmit(this.state);
    return false;
  },
  updatePassword(e) {
    this.setState({
      pwd: e.target.value
    });
  },
  updateEmail(e) {
    this.setState({
      email: e.target.value
    });
  },
  render(){
    let lang = this.props.lang;
    return (
      <Modal ariaHideApp={false} isOpen={this.props.modalIsOpen} onRequestClose={this.props.onRequestClose} style={customStyles} >
        <div>{this.props.errorMsg}</div>
        <form onSubmit={this.handleSubmit} action="index.php?controller=user&amp;action=update&amp;uid=<?php echo $_GET['uid'];?>" method="post">
          <div className="inputbox">
            <dl>
              <dt>{lang.USERNAME}</dt>
              <dd><input type="text" readOnly="readonly" value={this.state.user} name="user" size="20" /></dd>
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