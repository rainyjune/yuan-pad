var React = require('react');
var dataProvider = require('./dataProvider.js');

var Reply = React.createClass({
  render: function() {
    var lang = this.props.lang,
        data = this.props.data;
    if (!this.props.data || !this.props.data.reply_content) {
      return null;
    }
    var replyContent = lang.YOU_REPLIED.replace('{reply_time}', data.reply_time).replace('{reply_content}', data.reply_content);
    return (
      <div>
        {replyContent}
        <span>&nbsp;<a href="index.php?controller=reply&amp;action=delete&amp;mid={data.id}">{lang.DELETE_THIS_REPLY}</a></span>
      </div>
    );
  }
});

var Comment = React.createClass({
  checkAll: function(e) {
    e.preventDefault();
  },
  clearAll: function(e) {
    e.preventDefault();
  },
  render: function() {
    var data = this.props.data;
    var lang = this.props.lang;
    return (
      <tr>
        <td>
          <input type='checkbox' name='select_mid[]' value={data.id} />
          <input type='hidden' name={this.props.data.id} value={data.reply ? 1 : 0} />
        </td>
        <td>
          {data.uid ? data.b_username : data.user}
        </td>
        <td className='admin_message'>
          {data.post_content}<br />{lang.TIME}：{data.time}
          <Reply />
        </td>
        <td><a href={'index.php?controller=post&amp;action=delete&amp;mid='+ data.id + '&amp;reply=' + (data.reply ? "1" : "0")}>{lang.DELETE}</a>
            <a className="ex2trigger" href={'index.php?controller=reply&amp;action=reply&amp;mid=' + data.id}>{lang.REPLY}</a>
        <a className="ex2trigger" href={'index.php?controller=post&amp;action=update&amp;mid=' + data.id}>{lang.UPDATE}</a>
        <a href={'index.php?controller=badip&amp;action=create&amp;ip=' + data.ip}>{lang.BAN}</a></td>
      </tr>
    );
  }
});

var ACPMessages = React.createClass({
  render: function() {
    var lang = this.props.lang;
    var comments = this.props.acpData.data;
    var cssClass = this.props.activeTab === "message" ? "message_container selectTag" : "message_container";
    var createComment = function(comment) {
      return (
        <Comment
          lang={lang}
          data={comment}
          key={comment.id}
        />
      );
    };
    return (
      <div className={cssClass}>
        <form id="message_manage" action="index.php?controller=post&amp;action=delete_multi_messages" method="post">
          <table width="800px">
            <thead>
              <tr className="header">
                <th>{lang.SELECT}</th>
                <th>{lang.NICKNAME}</th>
                <th>{lang.MESSAGE}</th>
                <th>{lang.OPERATION}</th>
              </tr>
            </thead>
            <tbody>
              {comments && comments.map(createComment)}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan='4'>
                  <a href="#" onClick={this.checkAll} id="m_checkall">{lang.CHECK_ALL}</a> &nbsp;
                  <a href="#" onClick={this.clearAll} id="m_checknone">{lang.CHECK_NONE}</a> &nbsp;
                  <a href="#" onClick={this.invertCheck}>{lang.CHECK_INVERT}</a>&nbsp;
                  <input type='submit' value={lang.DELETE_CHECKED} />&nbsp;
                  <a id="deleteallLink" href="index.php?controller=post&amp;action=deleteAll">{lang.DELETE_ALL}</a>&nbsp;
                  <a id="deleteallreplyLink" href="index.php?controller=reply&amp;action=deleteAll">{lang.DELETE_ALL_REPLY}</a>
                </td>
              </tr>
            </tfoot>
          </table>
        </form>
      </div>
    );
  }
});

module.exports = ACPMessages;