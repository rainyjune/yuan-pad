var React = require('react');
var UserUpdateModal = require('./acp-userUpdateModal.js');
var dataProvider = require('./dataProvider.js');
var FormItemMixin = require('./formItemMixin.js');

var UserItem = React.createClass({
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
    var user = this.props.data;
    var lang = this.props.lang;
    console.log('checked:', this.props.data.checked)
    return (
      <tr>
        <td><input type='checkbox' checked={this.props.data.checked} onChange={this.toggleItem} /></td>
        <td>{user.username}</td>
        <td>{user.email}</td>
        <td>
          <a onClick={this.deleteUser} href="#">{lang.DELETE}</a>
          <a onClick={this.updateUser} href='#'>{lang.UPDATE}</a>
        </td>
      </tr>
    );
  }
});

var ACPUser = React.createClass({
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
        var data = res.response;
        this.addSelectedFlag(data);
        this.setState({users: data}, function(){
          console.warn('users:', this.state.users);
        });
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
    var checkedUids = this.getCheckedItems();
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
    var lang = this.props.lang;
    var cssClass = this.props.activeTab === "user" ? "user_container selectTag" : "user_container";
    var createUserItem = function(user) {
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
          <table>
            <thead>
              <tr className="header">
                <th className="span-1">{lang.SELECT}</th>
                <th className="span-3">{lang.NICKNAME}</th>
                <th className="span-6">{lang.EMAIL}</th>
                <th>{lang.OPERATION}</th>
              </tr>
            </thead>
            <tbody>
              {this.state.users.map(createUserItem, this)}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan='4'>
                  <span><a href="#" onClick={this.checkAll}>{lang.CHECK_ALL}</a> &nbsp;
                  <a href="#" onClick={this.checkNone}>{lang.CHECK_NONE}</a> &nbsp;
                  <a href="#" onClick={this.checkXAll}>{lang.CHECK_INVERT}</a>&nbsp;</span>
                  <input type='submit' value={lang.DELETE_CHECKED} />&nbsp;
                  <a onClick={this.deleteAllUsers}>{lang.DELETE_ALL}</a>&nbsp;
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