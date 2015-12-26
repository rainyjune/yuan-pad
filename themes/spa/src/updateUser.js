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

let UserUpdate = React.createClass({
  getInitialState() {
    return {
      errorMsg: '',
      modalIsOpen: false
    };
  },
  openModal() {
    this.setState({modalIsOpen: true});
  },
  closeModal() {
    this.setState({modalIsOpen: false});
  },
  handleSubmit(e) {
    e.preventDefault();
    let uid = this.refs.uid.value.trim(),
        user = this.refs.user.value.trim(),
        pwd = this.refs.pwd.value.trim(),
        email = this.refs.email.value.trim();
    if (!uid || !user || !email) return;
    dataProvider.updateUser({ uid, user, pwd, email},  res => {
      if (this.isMounted()) {
        if (res.statusCode === 200) {
          this.setState({errorMsg: '', modalIsOpen: false});
          this.props.onCurrentUserUpdated(res.response);
        } else {
          alert(res.response);
          this.setState({errorMsg: res.response});
        }
      }
    });
    return false;
  },
  render() {
    let language = this.props.lang,
        state = this.state,
        user = this.props.user;
        
    return (
      <div className="updateUser">
        <a href="javascript:void(0);" onClick={this.openModal}>{language.UPDATE}</a>
        <Modal isOpen={state.modalIsOpen} onRequestClose={this.closeModal} style={customStyles}>
          <p>{state.errorMsg}</p>
          <button onClick={this.closeModal}>close</button>
          <form onSubmit={this.handleSubmit} action="#" method="post">
            <input type="hidden" ref="uid" value={user.uid} />        
            <dl>
            <dt>{language.USERNAME}</dt>
            <dd><input type="text" readOnly="readonly" defaultValue={user.username} ref="user" size="20"  />
            </dd>
            </dl>
            <dl>
            <dt>{language.PASSWORD}</dt>
            <dd><input type="password" defaultValue={user.password} ref="pwd" size="20"  />
            </dd>
            </dl>
            <dl>
            <dt>{language.EMAIL}</dt>
            <dd><input type="text" defaultValue={user.email} ref="email" size="20"  />
            </dd>
            </dl>
            <dl>
              <dt><input type="submit" value={language.UPDATE} /></dt>
            </dl>
          </form>
        </Modal>
      </div>
    );
  }
});

module.exports = UserUpdate;