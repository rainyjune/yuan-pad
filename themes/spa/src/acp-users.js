let React = require('react');
let UserUpdateModal = require('./acp-userUpdateModal.js');
let dataProvider = require('./dataProvider.js');
let FormItemMixin = require('./formItemMixin.js');

let UserItem = React.createClass({
  /**
   * Tested 1.
   */
  deleteUser(e) {
    e.preventDefault();
    dataProvider.deleteUser(this.props.data.uid, res=> {
      if (res.statusCode === 200) {
        this.props.onUserDeleted();
      }
    });
  },
  /**
   * Tested 1.
   */
  updateUser(e) {
    e.preventDefault();
    this.props.onOpenUserUpdateModal(this.props.data);
  },
  /**
   * Tested 1.
   */
  toggleItem() {
    this.props.onToggleItem(this.props.data);
  },
  render() {
    let user = this.props.data;
    let lang = this.props.lang;
    return (
      <tr className="row">
        <td className="col-xs-1 col-sm-1 col-md-1"><input type='checkbox' checked={this.props.data.checked} onChange={this.toggleItem} /></td>
        <td className="col-xs-3 col-sm-3 col-md-3">{user.username}</td>
        <td className="col-xs-6 col-sm-6 col-md-6">{user.email}</td>
        <td className="col-xs-2 col-sm-2 col-md-2">
          <a className="btn btn-danger btn-sm" onClick={this.deleteUser} href="#">{lang.DELETE}</a>
          <a className="btn btn-default btn-sm" onClick={this.updateUser} href='#'>{lang.UPDATE}</a>
        </td>
      </tr>
    );
  }
});

let ACPUser = React.createClass({
  mixins: [FormItemMixin],
  /**
   * Tested 1.
   */
  getInitialState() {
    return {
      users: [],
      updateErrorMsg: '',
      updateModalIsOpen: false,
      updatedModalUserData: null,
    };
  },
  getMixinAttr() {
    return 'users';
  },
  getItemKey() {
    return 'uid';
  },
  setMixState(data) {
    this.setState({users: data});
  },
  /**
   * Tested 1
   */
  componentDidMount() {
    this.loadAllUsersFromServer();
  },
  /**
   * Tested 1.
   */
  loadAllUsersFromServer() {
    dataProvider.getAllUsers(res => {
      if (res.statusCode === 200) {
        let data = res.response;
        this.addSelectedFlag(data);
        this.setState({users: data});
      }
    });
  },
  /**
   * Tested 1.
   */
  handleUserDeleted() {
    this.loadAllUsersFromServer();
  },
  /**
   * Tested 1.
   */
  handleUpdateSubmit(newUserData) {
    dataProvider.updateUser(newUserData, res => {
      if (res.statusCode === 200) {
        this.setState({
          updateErrorMsg: '',
          updatedModalUserData: null,
          updateModalIsOpen: false
        });
        this.loadAllUsersFromServer();
      }
    });
  },
  /**
   * Tested 1.
   */
  closeUpdateModal() {
    this.setState({
      updateErrorMsg: '',
      updatedModalUserData: null,
      updateModalIsOpen: false
    });
  },
  /**
   * Tested 1.
   */
  openUserUpdateModal(userData) {
    this.setState({
        updateErrorMsg: '',
        updatedModalUserData: userData,
        updateModalIsOpen: true
      });
  },
  /**
   * Tested 1.
   */
  deleteAllUsers(e) {
    e.preventDefault();
    dataProvider.deleteAllUsers(res => {
      if (res.statusCode === 200) {
        this.loadAllUsersFromServer();
      }
    });
  },
  /**
   * Tested 1.
   */
  handleDeleteMulti(e) {
    e.preventDefault();
    let checkedUids = this.getCheckedItems();
    if (checkedUids.length === 0) {
      return false;
    }
    dataProvider.deleteMutiUsers(checkedUids, res => {
      if (res.statusCode === 200) {
        this.loadAllUsersFromServer();
      } else {
        alert('delete error');
      }
    });
  },
  /**
   * Tested 1
   */
  handleToggleItem(userItem) {
    this.toggle(userItem);
  },
  render() {
    let lang = this.props.lang;
    let cssClass = this.props.activeTab === "user" ? "user_container selectTag" : "user_container";
    let createUserItem = function(user) {
      return (
        <UserItem
          data={user}
          lang={lang}
          key={user.uid}
          onOpenUserUpdateModal={this.openUserUpdateModal}
          onUserDeleted={this.handleUserDeleted}
          onToggleItem={this.handleToggleItem}
        />
      );
    };
    return (
      <div className={cssClass}>
        <form onSubmit={this.handleDeleteMulti} action="#" method="post">
          <table className="table table-striped table-hover">
            <thead>
              <tr className="header row">
                <th className="col-xs-1 col-sm-1 col-md-1"><input type="checkbox" onClick={this.toggleInputClicked} /></th>
                <th className="col-xs-3 col-sm-3 col-md-3">{lang.NICKNAME}</th>
                <th className="col-xs-6 col-sm-6 col-md-6">{lang.EMAIL}</th>
                <th className="col-xs-2 col-sm-2 col-md-2">{lang.OPERATION}</th>
              </tr>
            </thead>
            <tbody>
              {this.state.users.map(createUserItem, this)}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan='4'>
                  <input type='submit' value={lang.DELETE_CHECKED} />
                  <button onClick={this.deleteAllUsers}>{lang.DELETE_ALL}</button>
                </td>
              </tr>
            </tfoot>
          </table>
          <UserUpdateModal
            userData={this.state.updatedModalUserData}
            errorMsg={this.state.updateErrorMsg} 
            modalIsOpen={this.state.updateModalIsOpen} 
            onRequestClose={this.closeUpdateModal}
            onUpdateSubmit={this.handleUpdateSubmit}
            lang={this.props.lang} 
          />
        </form>
      </div>
    );
  }
});

module.exports = ACPUser;