var React = require('react');
var dataProvider = require('./dataProvider.js');

var Reply = React.createClass({
  getInitialState: function() {
    return {
      b_username: null,
      id: 0,
      ip: "::1",
      post_content: "",
      reply_content: "",
      reply_time: "",
      time: "",
      uid: null,
      uname: "",
      user: ""
    };
  },
  componentWillReceiveProps: function(nextProps) {
    var data = nextProps.data;
    if (data) {
      this.setState({
        b_username: data.b_username,
        id: data.id,
        ip: data.ip,
        post_content: data.post_content,
        reply_content: data.reply_content,
        reply_time: data.reply_time,
        time: data.time,
        uid: data.uid,
        uname: data.uname,
        user: data.user
      });
    }
  },
  deleteReply: function(e) {
    e.preventDefault();
    dataProvider.deleteReply(e.target.getAttribute("data-commentid"), function(response) {
      this.setState({reply_content: ''});
    }.bind(this));
  },
  render: function() {
    var lang = this.props.lang,
        data = this.state;
    if (!data || !data.reply_content) {
      return null;
    }
    return (
      <div>
        {lang.YOU_REPLIED.replace('{reply_time}', data.reply_time).replace('{reply_content}', data.reply_content)}
        <span>&nbsp;<a onClick={this.deleteReply} data-commentid={data.id} href="#">{lang.DELETE_THIS_REPLY}</a></span>
      </div>
    );
  }
});

var Comment = React.createClass({
  banIP: function(e) {
    var dom = e.target;
    e.preventDefault();
    var ip = dom.getAttribute('data-ip');
    dataProvider.banIP(ip, function(){
      this.props.onActiveTabChanged('ban_ip');
    }.bind(this));
  },
  deleteComment: function(e) {
    e.preventDefault();
    var dom = e.target;
    var commentId = dom.getAttribute("data-commentid");
    var reply = dom.getAttribute("data-reply");
    // TODO
    dataProvider.deleteComment(commentId, reply, function(response) {
      this.props.onCommentDeleted();
    }.bind(this));
  },
  replyComment: function(e) {
    e.preventDefault();
    var dom = e.target;
    var commentId = dom.getAttribute('data-commentid');
    this.props.onReplyComment(commentId);
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
          <Reply lang={lang} data={data} />
        </td>
        <td>
          <a onClick={this.deleteComment} data-commentid={data.id} data-reply={data.reply ? "1" : "0"} href='#'>{lang.DELETE}</a>
          <a onClick={this.replyComment} data-commentid={data.id} href="#">{lang.REPLY}</a>
          <a onClick={this.updateComment} href="#">{lang.UPDATE}</a>
          <a onClick={this.banIP} data-ip={data.ip} href="#">{lang.BAN}</a></td>
      </tr>
    );
  }
});

var ACPMessages = React.createClass({
  checkAll: function(e) {
    e.preventDefault();
  },
  clearAll: function(e) {
    e.preventDefault();
  },
  deleteAllComments: function(e) {
    e.preventDefault();
    // TODO
    dataProvider.deleteAllComments();
  },
  deleteAllReplies: function(e) {
    e.preventDefault();
    // TODO
    dataProvider.deleteAllReplies();
  },
  deleteSelected: function(e) {
    e.preventDefault();
    // TODO
    dataProvider.deleteMutiComments();
  },
  invertCheck: function(e) {
    e.preventDefault();
  },
  render: function() {
    var lang = this.props.lang;
    var comments = this.props.systemInformation.data;
    var cssClass = this.props.activeTab === "message" ? "message_container selectTag" : "message_container";
    var createComment = function(comment) {
      return (
        <Comment
          lang={lang}
          data={comment}
          key={comment.id}
          onActiveTabChanged={this.props.onActiveTabChanged}
          onReplyComment={this.handleReplyComment}
          onCommentDeleted={this.props.onCommentDeleted}
        />
      );
    };
    return (
      <div className={cssClass}>
        <form onSubmit={this.deleteSelected} action="#" method="post">
          <table>
            <thead>
              <tr className="header">
                <th>{lang.SELECT}</th>
                <th>{lang.NICKNAME}</th>
                <th>{lang.MESSAGE}</th>
                <th>{lang.OPERATION}</th>
              </tr>
            </thead>
            <tbody>
              {comments && comments.map(createComment, this)}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan='4'>
                  <a href="#" onClick={this.checkAll}>{lang.CHECK_ALL}</a> &nbsp;
                  <a href="#" onClick={this.clearAll}>{lang.CHECK_NONE}</a> &nbsp;
                  <a href="#" onClick={this.invertCheck}>{lang.CHECK_INVERT}</a>&nbsp;
                  <input type='submit' value={lang.DELETE_CHECKED} />&nbsp;
                  <a onClick={this.deleteAllComments}>{lang.DELETE_ALL}</a>&nbsp;
                  <a onClick={this.deleteAllReplies}>{lang.DELETE_ALL_REPLY}</a>
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