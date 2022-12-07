import React from 'react';
import Modal from 'react-modal';
import dataProvider from './dataProvider';

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

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMsg: '',
      modalIsOpen: false
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this._isMounted = false;
  }
  componentDidMount() {
    this._isMounted = true;
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
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
  handleSubmit(e) {
    e.preventDefault();
    let user = this.refs.user.value.trim(),
        pwd = this.refs.password.value.trim();
    if (!user || !pwd) return;
    this.handleSignIn({ user, password: pwd});
    return false;
  }
  render() {
    let language = this.props.lang,
        state = this.state;
    return (
      <div className="signIn">
        <a href='javascript:void(0);' onClick={this.openModal} role="button" className="btn btn-default">{language.LOGIN}</a>
        <Modal isOpen={state.modalIsOpen} onRequestClose={this.closeModal} style={customStyles}>
          <p>{state.errorMsg}</p>
          <button onClick={this.closeModal}>close</button>
          <form onSubmit={this.handleSubmit} action="#" method="post">
            <div className="form-group">
              <label htmlFor="inputUsername">{language.USERNAME}</label>
              <input ref="user" type="text" className="form-control" id="inputUsername" placeholder="" />
            </div>
            <div className="form-group">
              <label htmlFor="inputPassword">{language.ADMIN_PWD}</label>
              <input ref="password" type="password" className="form-control" id="inputPassword" placeholder="" />
            </div>
            <button type="submit" className="btn btn-default">{language.SUBMIT}</button>
          </form>
        </Modal>
      </div>
    );
  }
}

export default SignIn;