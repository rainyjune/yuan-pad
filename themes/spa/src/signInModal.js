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

var LoginModal = React.createClass({
  handleSubmit(e) {
    e.preventDefault();
    var user = this.refs.user.value.trim();
    var pwd = this.refs.password.value.trim();
    if (!user || !pwd) return;
    this.props.onLoginSubmit({ user, password: pwd});
    return false;
  },
  render(){
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

module.exports = LoginModal;