let React = require('react');
let dataProvider = require('./dataProvider.js');
let SignInMixIn = require('./SignInMixin.js');
let Modal = require('react-modal');

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

let ACPLogin = React.createClass({
  mixins: [SignInMixIn], // Use the mixin
  getInitialState() {
    return {
      errorMsg: '',
      modalIsOpen: true
    };
  },
  handleSubmit(e) {
    e.preventDefault();
    let user = this.refs.user.value.trim(),
        pwd = this.refs.password.value.trim();
    if (!user || !pwd) return;
    this.handleSignIn({ user, password: pwd});
    return false;
  },
  goToHome() {
    window.location.href = 'index.php';
  },
  render() {
    let language = this.props.lang,
        state = this.state;
    return (
      <div className="signIn">
        <Modal isOpen={state.modalIsOpen} style={customStyles}>
          <p>{state.errorMsg}</p>
          <p>
            <button onClick={this.goToHome} type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          </p>
          <form onSubmit={this.handleSubmit} action="#" method="post">
            <table>
              <tbody>
                <tr>
                  <td><label>{language.USERNAME}</label></td>
                  <td><input type="text" ref="user" size="20" /></td>
                </tr>
                <tr>
                  <td><label>{language.ADMIN_PWD}</label></td>
                  <td><input type="password" ref="password" size="20" /></td>
                </tr>
                <tr>
                  <td colSpan="2">
                    <input type="submit" value={language.SUBMIT} />
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </Modal>
      </div>
    );
  }
});

module.exports = ACPLogin;