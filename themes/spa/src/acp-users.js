var React = require('react');
var UserUpdateModal = require('./acp-userUpdateModal.js');
var dataProvider = require('./dataProvider.js');

var UserItem = React.createClass({
  /**
   * Tested 1.
   */
  deleteUser: function(e) {
    e.preventDefault();
    dataProvider.deleteUser(this.props.data.uid, function(res) {
      if (res.statusCode === 200) {
        this.props.onUserDeleted();
      }
    }.bind(this));
  },
  /**
   * Tested 1.
   */
  updateUser: function(e) {
    e.preventDefault();
    this.props.onOpenUserUpdateModal(this.props.data);
  },
  render: function() {
    var user = this.props.data;
    var lang = this.props.lang;
    return (
      <tr>
        <td><input type='checkbox' name='select_uid[]' value={user.uid} /></td>
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
  /**
   * Tested 1.
   */
  getInitialState: function() {
    return {
      users: [],
      updateErrorMsg: '',
      updateModalIsOpen: false,
      updatedModalUserData: null,
    };
  },
  /**
   * Tested 1
   */
  componentDidMount: function() {
    this.loadAllUsersFromServer();
  },
  /**
   * Tested 1.
   */
  loadAllUsersFromServer: function() {
    dataProvider.getAllUsers(function(res){
      if (res.statusCode === 200) {
        this.setState({users: res.response});
      }
    }.bind(this));
  },
  /**
   * Tested 1.
   */
  handleUserDeleted: function() {
    this.loadAllUsersFromServer();
  },
  /**
   * Tested 1.
   */
  handleUpdateSubmit: function(newUserData) {
    dataProvider.updateUser(newUserData, function(res){
      if (res.statusCode === 200) {
        this.setState({
          updateErrorMsg: '',
          updatedModalUserData: null,
          updateModalIsOpen: false
        });
        this.loadAllUsersFromServer();
      }
    }.bind(this));
  },
  /**
   * Tested 1.
   */
  closeUpdateModal: function() {
    this.setState({
      updateErrorMsg: '',
      updatedModalUserData: null,
      updateModalIsOpen: false
    });
  },
  /**
   * Tested 1.
   */
  openUserUpdateModal: function(userData) {
    this.setState({
        updateErrorMsg: '',
        updatedModalUserData: userData,
        updateModalIsOpen: true
      });
  },
  /**
   * Tested 1.
   */
  deleteAllUsers: function(e) {
    e.preventDefault();
    dataProvider.deleteAllUsers(function(res){
      if (res.statusCode === 200) {
        this.loadAllUsersFromServer();
      }
    }.bind(this));
  },
  render: function() {
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
        />
      );
    };
    return (
      <div className={cssClass}>
        <form action="index.php?controller=user&amp;action=delete_multi" method="post">
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
                  <span className="check_span"><a href="#" id="m_checkall">{lang.CHECK_ALL}</a> &nbsp;
                  <a href="#" id="m_checknone">{lang.CHECK_NONE}</a> &nbsp;
                  <a href="#" id="m_checkxor">{lang.CHECK_INVERT}</a>&nbsp;</span>
                  <input type='submit' value={lang.DELETE_CHECKED} />&nbsp;
                  <a onClick={this.deleteAllUsers} href="index.php?controller=post&amp;action=deleteAll">{lang.DELETE_ALL}</a>&nbsp;
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