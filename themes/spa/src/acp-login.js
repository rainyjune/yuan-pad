import React from 'react';
import Modal from 'react-modal';

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

class ACPLogin extends React.Component {
  openModal() {
    this.setState({modalIsOpen: true});
  }
  closeModal() {
    this.setState({modalIsOpen: false});
  }
  handleSignIn(loginData) {
    dataProvider.signIn(loginData, res => {
      if (this._isMounted) {
        if (res.statusCode === 200) {
          this.setState({errorMsg: '', modalIsOpen: false});
          this.props.onCurrentUserUpdated(res.response);
        } else if (res.statusCode === 304) {
          // The user had signed in before.
        } else {
          this.setState({errorMsg: res.response});
        }
      }
    });
  }
  constructor(props) {
    super(props);
    this.state = {
      errorMsg: '',
      modalIsOpen: true
    };
    this._isMounted = false;
  }
  componentDidMount() {
    this._isMounted = true;
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  handleSubmit(e) {
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
  dismissAlert() {
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
        <Modal ariaHideApp={false} isOpen={state.modalIsOpen} style={customStyles}>
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
}

export default ACPLogin;