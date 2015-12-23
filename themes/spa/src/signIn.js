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

let SignIn = React.createClass({
  mixins: [SignInMixIn], // Use the mixin
  getInitialState() {
    return {
      errorMsg: '',
      modalIsOpen: false
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
  render() {
    let language = this.props.lang,
        state = this.state;
    return (
      <div className="signIn">
        <a href='javascript:void(0);' onClick={this.openModal}>{language.LOGIN}</a>
        <Modal isOpen={state.modalIsOpen} onRequestClose={this.closeModal} style={customStyles}>
          <p>{state.errorMsg}</p>
          <button onClick={this.closeModal}>close</button>
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

module.exports = SignIn;