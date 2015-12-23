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

let SignUp = React.createClass({
  getInitialState() {
    return {
      errorMsg: '',
      modalIsOpen: false
    };
  },
  openModal(e) {
    e && e.preventDefault();
    this.setState({modalIsOpen: true});
  },
  closeModal(e) {
    e && e.preventDefault();
    this.setState({modalIsOpen: false});
  },
  handleSubmit(e) {
    e.preventDefault();
    let user = this.refs.user.value.trim(),
        pwd = this.refs.pwd.value.trim(),
        email = this.refs.email.value.trim();
    if (!user || !pwd || !email) return;
    
    dataProvider.signUp({user, pwd, email}, res => {
      if (this.isMounted()) {
        if (res.statusCode !== 200) {
          this.setState({errorMsg: res.response});
        } else {
          this.setState({errorMsg: '', modalIsOpen: false});
          this.props.onCurrentUserUpdated(res.response);
        }
      }
    });
    return false;
  },
  render() {
    let language = this.props.lang,
        state = this.state;
        
    return (
      <div className="signUp">
        <a href='#' onClick={this.openModal}>{language.REGISTER}</a>
        <Modal isOpen={state.modalIsOpen} onRequestClose={this.closeModal} style={customStyles}>
          <p>{state.errorMsg}</p>
          <button onClick={this.closeModal}>close</button>
          <form onSubmit={this.handleSubmit} action="#" method="post">
            <fieldset>
              <legend>{language.REGISTER}</legend>
              <dl>
                <dt>{language.USERNAME}</dt>
                <dd><input type="text" ref="user" size="20" /></dd>
              </dl>
              <dl>
                <dt>{language.PASSWORD}</dt>
                <dd><input type="password" ref="pwd" size="20" /></dd>
              </dl>
              <dl>
                <dt>{language.EMAIL}</dt>
                <dd><input type="text" ref="email" size="20" /></dd>
              </dl>
              <dl>
                <dt><input type="submit" value={language.REGISTER} /></dt>
              </dl>
            </fieldset>
          </form>
        </Modal>
      </div>
    );
  }
});

module.exports = SignUp;