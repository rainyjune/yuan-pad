let React = require('react');
let dataProvider = require('./dataProvider.js');

let ReplyModal = require('./acp-replyModal.js');
let CommentUpdateModal = require('./acp-updateCommentModal.js');

let FormItemMixin = require('./formItemMixin.js');

let Reply = React.createClass({
  getInitialState() {
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
  componentWillReceiveProps(nextProps) {
    let data = nextProps.data;
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
  deleteReply(e) {
    e.preventDefault();
    dataProvider.deleteReply(e.target.getAttribute("data-commentid"), response => {
      this.setState({reply_content: ''});
    });
  },
  render() {
    let lang = this.props.lang,
        data = this.state;
    if (!data || !data.reply_content) {
      return null;
    }
    return (
      <div>
        {lang.YOU_REPLIED && lang.YOU_REPLIED.replace('{reply_time}', data.reply_time).replace('{reply_content}', data.reply_content)}
        <span>&nbsp;<a onClick={this.deleteReply} data-commentid={data.id} href="#">{lang.DELETE_THIS_REPLY}</a></span>
      </div>
    );
  }
});

let Comment = React.createClass({
  banIP(e) {
    let dom = e.target;
    e.preventDefault();
    let ip = dom.getAttribute('data-ip');
    dataProvider.banIP(ip, () => {
      this.props.onActiveTabChanged('ban_ip');
    });
  },
  deleteComment(e) {
    e.preventDefault();
    let dom = e.target;
    let commentId = dom.getAttribute("data-commentid");
    let reply = dom.getAttribute("data-reply");
    // TODO
    dataProvider.deleteComment(commentId, reply, response => {
      this.props.onCommentDeleted();
    });
  },
  replyComment(e) {
    e.preventDefault();
    let dom = e.target;
    let commentId = dom.getAttribute('data-commentid');
    this.props.onReplyComment(this.props.data);
  },
  updateComment(e) {
    e.preventDefault();
    this.props.onUpdateComment(this.props.data);
  },
  toggleItem() {
    //this.setState({checked: !this.state.checked});
    this.props.onToggleItem(this.props.data);
  },
  render() {
    let data = this.props.data;
    let lang = this.props.lang;
    return (
      <tr>
        <td>
          <input type='checkbox' checked={this.props.data.checked} onChange={this.toggleItem} />
          <input type='hidden' name={this.props.data.id} value={data.reply ? 1 : 0} />
        </td>
        <td>
          {data.uid ? data.b_username : data.uname}
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

let ACPMessages = React.createClass({
  mixins: [FormItemMixin],
  getInitialState() {
    return {
      comments: [],
      replyModalIsOpen: false,
      replyErrorMsg: '',
      commentTobeReplied: null,
      commentTobeUpdated: null,
      commentModalIsOpen: false,
      commentErrorMsg: ''
    };
  },
  getMixinAttr() {
    return 'comments';
  },
  getItemKey() {
    return 'id';
  },
  setMixState(data) {
    this.setState({comments: data});
  },
  deleteAllComments(e) {
    e.preventDefault();
    dataProvider.deleteAllComments(res => {
      if (res.statusCode === 200) {
        this.setState({comments: []});
      } else {
        alert('Error');
      }
    });
  },
  /**
   * Tested 1
   */
  deleteAllReplies(e) {
    e.preventDefault();
    dataProvider.deleteAllReplies(res => {
      if (res.statusCode === 200) {
        this.loadCommentsFromServer();
      } else {
        alert('ERROR')
      }
    });
  },
  deleteSelected(e) {
    e.preventDefault();
    let checkedItems = this.getCheckedItems();
    dataProvider.deleteMutiComments(checkedItems, res => {
      if (res.statusCode === 200) {
        this.loadCommentsFromServer();
      } else {
        alert('delete error');
      }
    });
  },
  handleReplyComment(commentTobeReplied) {
    this.setState({
      replyModalIsOpen: true,
      replyErrorMsg: '',
      commentTobeReplied: commentTobeReplied,
      
      commentTobeUpdated: null,
      commentModalIsOpen: false,
      commentErrorMsg: ''
    });
  },
  closeReplyModal() {
    this.setState({
      replyModalIsOpen: false,
      replyErrorMsg: ''
    });
  },
  closeCommentUpdateModal() {
    this.setState({
      commentTobeUpdated: null,
      commentModalIsOpen: false,
      commentErrorMsg: ''
    });
  },
  handleReplyFormSubmitted() {
    this.setState({
      replyModalIsOpen: false,
      replyErrorMsg: '',
      commentTobeReplied: null
    });
    this.loadCommentsFromServer();
  },
  handleUpdateComment(commentTobeUpdated) {
    this.setState({
      replyModalIsOpen: false,
      replyErrorMsg: '',
      commentTobeReplied: null,
      
      commentTobeUpdated: commentTobeUpdated,
      commentModalIsOpen: true,
      commentErrorMsg: ''
    });
  },
  handleCommentUpdated() {
    this.closeCommentUpdateModal();
    this.loadCommentsFromServer();
  },
  loadCommentsFromServer() {
    dataProvider.loadAllCommentsFromServer(res => {
      if (res.statusCode === 200 || res.statusCode === 404) {
        let data = res.response.comments;
        this.addSelectedFlag(data)
        this.setState({comments: data});
      } else {
        // TODO .
        alert('error');
      }
    });
  },
  componentDidMount() {
    this.loadCommentsFromServer();
  },
  handleToggleItem(item) {
    this.toggle(item);
  },
  render() {
    let lang = this.props.lang;
    let comments = this.state.comments;
    let cssClass = this.props.activeTab === "message" ? "message_container selectTag" : "message_container";
    let createComment = function(comment) {
      return (
        <Comment
          lang={lang}
          data={comment}
          key={comment.id}
          onActiveTabChanged={this.props.onActiveTabChanged}
          onReplyComment={this.handleReplyComment}
          onCommentDeleted={this.props.onCommentDeleted}
          onUpdateComment={this.handleUpdateComment}
          onToggleItem={this.handleToggleItem}
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
                  <a href="#" onClick={this.checkNone}>{lang.CHECK_NONE}</a> &nbsp;
                  <a href="#" onClick={this.checkXAll}>{lang.CHECK_INVERT}</a>&nbsp;
                  <input type='submit' value={lang.DELETE_CHECKED} />&nbsp;
                  <a onClick={this.deleteAllComments}>{lang.DELETE_ALL}</a>&nbsp;
                  <a onClick={this.deleteAllReplies}>{lang.DELETE_ALL_REPLY}</a>
                </td>
              </tr>
            </tfoot>
          </table>
        </form>
        <ReplyModal
          comment={this.state.commentTobeReplied}
          replyErrorMsg={this.state.replyErrorMsg}
          replyModalIsOpen={this.state.replyModalIsOpen}
          onRequestClose={this.closeReplyModal}
          onReplySubmit={this.handleReplyFormSubmitted}
        />
        <CommentUpdateModal
          comment={this.state.commentTobeUpdated}
          commentErrorMsg={this.state.commentErrorMsg}
          commentModalIsOpen={this.state.commentModalIsOpen}
          onRequestClose={this.closeCommentUpdateModal}
          onCommentUpdated={this.handleCommentUpdated}
        />
      </div>
    );
  }
});

module.exports = ACPMessages;