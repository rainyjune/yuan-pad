import React from 'react';
import Modal from 'react-modal';
import dataProvider from './dataProvider.js';

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

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMsg: '',
      modalIsOpen: false
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this._isMounted = false;
  }
  componentDidMount() {
    this._isMounted = true;
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  openModal(e) {
    e && e.preventDefault();
    this.setState({modalIsOpen: true});
  }
  closeModal(e) {
    e && e.preventDefault();
    this.setState({modalIsOpen: false});
  }
  handleSubmit(e) {
    e.preventDefault();
    let user = this.refs.user.value.trim(),
        pwd = this.refs.pwd.value.trim(),
        email = this.refs.email.value.trim();
    if (!user || !pwd || !email) return;
    
    dataProvider.signUp({user, pwd, email}, res => {
      if (this._isMounted) {
        if (res.statusCode !== 200) {
          this.setState({errorMsg: res.response});
        } else {
          this.setState({errorMsg: '', modalIsOpen: false});
          this.props.onCurrentUserUpdated(res.response);
        }
      }
    });
    return false;
  }
  render() {
    let language = this.props.lang,
        state = this.state;
        
    return (
      <div className="signUp">
        <a role="button" className="btn btn-default" href='#' onClick={this.openModal}>{language.REGISTER}</a>
        <Modal isOpen={state.modalIsOpen} onRequestClose={this.closeModal} style={customStyles}>
          <p>{state.errorMsg}</p>
          <button onClick={this.closeModal}>close</button>
          <form onSubmit={this.handleSubmit} action="#" method="post">
            <fieldset>
              <legend>{language.REGISTER}</legend>
              <div className="form-group">
                <label htmlFor="inputUser">{language.USERNAME}</label>
                <input type="text" ref="user" className="form-control" id="inputUser" placeholder="Username" />
              </div>
              <div className="form-group">
                <label htmlFor="inputPassword">{language.PASSWORD}</label>
                <input type="password" ref="pwd" className="form-control" id="inputPassword" placeholder="Password" />
              </div>
              <div className="form-group">
                <label htmlFor="inputEmail">{language.EMAIL}</label>
                <input type="email" ref="email" className="form-control" id="inputEmail" placeholder="" />
              </div>
              <button type="submit" className="btn btn-default">{language.REGISTER}</button>
            </fieldset>
          </form>
        </Modal>
      </div>
    );
  }
}

export default SignUp;