var React = require('react');
var dataProvider = require('./dataProvider.js');

var UserItem = React.createClass({
  render: function() {
    var user = this.props.data;
    var lang = this.props.lang;
    return (
      <tr>
        <td><input type='checkbox' name='select_uid[]' value={user.uid} /></td>
        <td>{user.username}</td>
        <td>{user.email}</td>
        <td><a href={'index.php?controller=user&amp;action=delete&amp;uid=' + user.uid}>{lang.DELETE}</a>
          <a className="ex2trigger" href={'index.php?controller=user&amp;action=update&amp;uid=' + user.uid}>{lang.UPDATE}</a>
        </td>
      </tr>
    );
  }
});

var ACPUser = React.createClass({
  getInitialState: function() {
    return {
      users: []
    };
  },
  componentDidMount: function() {
    dataProvider.getAllUsers(function(data){
      this.setState({users: data});
    }.bind(this));
  },
  render: function() {
    var lang = this.props.lang;
    var cssClass = this.props.activeTab === "user" ? "user_container selectTag" : "user_container";
    var createUserItem = function(user) {
      return (
        <UserItem data={user} lang={lang} key={user.uid} />
      );
    };
    return (
      <div className={cssClass}>
        <form id="user_manage" action="index.php?controller=user&amp;action=delete_multi" method="post">
          <table width="800px">
            <thead>
              <tr className="header">
                <th className="span-1">{lang.SELECT}</th>
                <th className="span-3">{lang.NICKNAME}</th>
                <th className="span-6">{lang.EMAIL}</th>
                <th>{lang.OPERATION}</th>
              </tr>
            </thead>
            <tbody>
              {this.state.users.map(createUserItem)}
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
        </form>
      </div>
    );
  }
});

module.exports = ACPUser;