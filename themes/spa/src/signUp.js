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

let RegisterModal = React.createClass({
  handleSubmit(e) {
    e.preventDefault();
    let user = this.refs.user.value.trim(),
        pwd = this.refs.pwd.value.trim(),
        email = this.refs.email.value.trim();
    if (!user || !pwd || !email) return;
    this.props.onRegisterSubmit({user, pwd, email}); 
    return false;
  },
  render(){
    return (
      <Modal isOpen={this.props.registerModalIsOpen} onRequestClose={this.props.onRequestClose} style={customStyles}>
        <p>{this.props.registerErrorMsg}</p>
        <button onClick={this.props.onRequestClose}>close</button>
        <form onSubmit={this.handleSubmit} action="#" method="post">
          <fieldset>
            <legend>{this.props.lang.REGISTER}</legend>
            <dl>
              <dt>{this.props.lang.USERNAME}</dt>
              <dd><input type="text" ref="user" size="20" /></dd>
            </dl>
            <dl>
              <dt>{this.props.lang.PASSWORD}</dt>
              <dd><input type="password" ref="pwd" size="20" /></dd>
            </dl>
            <dl>
              <dt>{this.props.lang.EMAIL}</dt>
              <dd><input type="text" ref="email" size="20" /></dd>
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

let SignUp = React.createClass({
  getInitialState() {
    return {
      registerErrorMsg: '',
      registerModalIsOpen: false
    };
  },
  openRegisterModal(e) {
    e.preventDefault();
    this.setState({registerModalIsOpen: true});
  },
  closeRegisterModal() {
    this.setState({registerModalIsOpen: false});
  },
  handleSignUp(userData) {
    dataProvider.signUp(userData, res => {
        console.log('create user result:', res);
        if (res.statusCode !== 200) {
          if (this.isMounted()) {
            this.setState({registerErrorMsg: res.response});
          }
        } else {
          if (this.isMounted()) {
            this.setState({registerErrorMsg: '', registerModalIsOpen: false})//, currentUser: data});
          }
          this.props.onSignedUp(res.response);
        }
      },
      function(xhr, status, err) {
        debugger;
      }.bind(this)
    );
  },
  render() {
    return (this.props.user.user_type != 'guest') ?
           null :
      (
        <div className="signUp">
          <a href='#' onClick={this.openRegisterModal}>{this.props.lang.REGISTER}</a>
          <RegisterModal 
            registerErrorMsg={this.state.registerErrorMsg} 
            onRegisterSubmit={this.handleSignUp} 
            registerModalIsOpen={this.state.registerModalIsOpen} 
            onRequestClose={this.closeRegisterModal} 
            lang={this.props.lang} 
          />
        </div>
      );
  }
});

module.exports = SignUp;