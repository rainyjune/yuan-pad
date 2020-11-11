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

Modal.setAppElement('#content');

class UserUpdate extends React.Component {
  getInitialState() {
    return {
      errorMsg: '',
      modalIsOpen: false
    };
  }
  openModal() {
    this.setState({modalIsOpen: true});
  }
  closeModal() {
    this.setState({modalIsOpen: false});
  }
  handleSubmit(e) {
    e.preventDefault();
    let uid = this.refs.uid.value.trim(),
        user = this.refs.user.value.trim(),
        pwd = this.refs.pwd.value.trim(),
        email = this.refs.email.value.trim();
    if (!uid || !user || !email) return;
    dataProvider.updateUser({ uid, user, pwd, email},  res => {
      if (res.statusCode === 200) {
        this.setState({errorMsg: '', modalIsOpen: false});
        this.props.onCurrentUserUpdated(res.response);
      } else {
        alert(res.response);
        this.setState({errorMsg: res.response});
      }
    });
    return false;
  }
  render() {
    let language = this.props.lang,
        state = this.state,
        user = this.props.user;
        
    return (
      <div className="updateUser">
        <a role="button" className="btn btn-default" href="#" onClick={this.openModal}>{language.UPDATE}</a>
        <Modal isOpen={state.modalIsOpen} onRequestClose={this.closeModal} style={customStyles}>
          <p>{state.errorMsg}</p>
          <button onClick={this.closeModal}>close</button>
          <form onSubmit={this.handleSubmit} action="#" method="post">
            <input type="hidden" ref="uid" value={user.uid} />
            <div className="form-group">
              <label htmlFor="inputUser">{language.USERNAME}</label>
              <input type="text" ref="user" readOnly="readonly" defaultValue={user.username} className="form-control" id="inputUser" />
            </div>
            <div className="form-group">
              <label htmlFor="inputPassword">{language.PASSWORD}</label>
              <input type="password" defaultValue={user.password} ref="pwd" className="form-control" id="inputPassword" />
            </div>
            <div className="form-group">
              <label htmlFor="inputEmail">{language.EMAIL}</label>
              <input type="email" defaultValue={user.email} ref="email" className="form-control" id="inputEmail" />
            </div>
            <button type="submit" className="btn btn-default">{language.UPDATE}</button>
          </form>
        </Modal>
      </div>
    );
  }
}

module.exports = UserUpdate;