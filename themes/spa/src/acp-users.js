var React = require('react');
var UserUpdateModal = require('./acp-userUpdateModal.js');
var dataProvider = require('./dataProvider.js');

var UserItem = React.createClass({
  deleteUser: function(e) {
    var uid = e.target.getAttribute('data-uid');
    e.preventDefault();
    dataProvider.deleteUser(uid, function(response) {
      // if OK
      this.props.onUserDeleted();
    }.bind(this));
  },
  updateUser: function(e) {
    var uid = e.target.getAttribute('data-uid');
    e.preventDefault();
    this.props.onOpenUserUpdateModal(uid);
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
          <a data-uid={user.uid} onClick={this.deleteUser} href="#">{lang.DELETE}</a>
          <a data-uid={user.uid} onClick={this.updateUser} href={'index.php?controller=user&amp;action=update&amp;uid=' + user.uid}>{lang.UPDATE}</a>
        </td>
      </tr>
    );
  }
});

var ACPUser = React.createClass({
  getInitialState: function() {
    return {
      users: [],
      updateErrorMsg: '',
      updateModalIsOpen: false,
      updatedModalUserData: null,
    };
  },
  componentDidMount: function() {
    dataProvider.getAllUsers(function(data){
      this.setState({users: data});
    }.bind(this));
  },
  handleUserDeleted: function() {
    dataProvider.getAllUsers(function(data){
      this.setState({users: data});
    }.bind(this));
  },
  handleUpdateSubmit: function(newUserData) {
    dataProvider.updateUser(newUserData, function(response){
      this.setState({
        updateErrorMsg: '',
        updatedModalUserData: null,
        updateModalIsOpen: false
      });
      dataProvider.getAllUsers(function(data){
        this.setState({users: data});
      }.bind(this));
    }.bind(this));
  },
  closeUpdateModal: function() {
    this.setState({
      updateErrorMsg: '',
      updatedModalUserData: null,
      updateModalIsOpen: false
    });
  },
  openUserUpdateModal: function(uid) {
    dataProvider.loadUserDataFromServer(uid, function(response){
      this.setState({
        updateErrorMsg: '',
        updatedModalUserData: response,
        updateModalIsOpen: true
      });
    }.bind(this));return;
    
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
                  <a id="deleteallLink" href="index.php?controller=post&amp;action=deleteAll">{lang.DELETE_ALL}</a>&nbsp;
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