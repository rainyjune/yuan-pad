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

const ACPLogin = SignInMixIn(class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMsg: '',
      modalIsOpen: true
    };
  }
  handleSubmit = (e) => {
    e.preventDefault();
    let user = this.refs.user.value.trim(),
        pwd = this.refs.password.value.trim();
    if (!user || !pwd) return;
    this.handleSignIn({ user, password: pwd});
    return false;
  }
  goToHome() {
    window.location.href = 'index.php';
  }
  dismissAlert = () => {
    this.setState({errorMsg: ''});
  }
  render() {
    let language = this.props.lang,
        state = this.state;
      
    let alertStyle = {
      display: state.errorMsg === "" ? "none" : "block"
    };
    return (
      <div className="signIn">
        <Modal isOpen={state.modalIsOpen} style={customStyles}>
          <div style={alertStyle} className="alert alert-danger" role="alert">
            <button onClick={this.dismissAlert} type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <p>{state.errorMsg}</p>
          </div>
          <form onSubmit={this.handleSubmit} action="#" method="post">
            <div className="form-group">
              <label htmlFor="inputUsername">{language.USERNAME}</label>
              <input id="inputUsername" type="text" ref="user" className="form-control" placeholder="admin" />
            </div>
            <div className="form-group">
              <label htmlFor="inputPassword">{language.ADMIN_PWD}</label>
              <input id="inputPassword" type="password" ref="password" className="form-control" placeholder="Password" />
            </div>
            <button type="submit" className="btn btn-default">{language.SUBMIT}</button>
            <button onClick={this.goToHome} type="button" className="btn btn-default">{language.CANCEL}</button>
          </form>            
        </Modal>
      </div>
    );
  }
});

module.exports = ACPLogin;