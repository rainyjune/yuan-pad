var React = require('react');
var Modal = require('react-modal');
var dataProvider = require('./dataProvider.js');

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

var ReplyModal = React.createClass({
  getInitialState: function() {
    return {
      rid: '',
      pid: '',
      content: '',
      r_time: ''
    };
  },
  componentWillReceiveProps: function(nextProps) {
    var commentData = nextProps.comment;
    if (commentData) {
      this.setState({
        rid: commentData.reply_id,
        pid: commentData.id,
        content: commentData.reply_content
      });
    }
  },
  handleSubmit: function(e) {
    e.preventDefault();
    if (!this.state.pid || !this.state.content.trim()) return;
    var action = this.state.rid ? 'updateReply' : 'createReply';
    dataProvider[action](this.state, function(res){
      if (res.statusCode === 200) {
        this.props.onReplySubmit();
      }
    }.bind(this), function(e){
      debugger;
    }.bind(this));
    return false;
  },
  changeContent: function(e) {
    this.setState({content: e.target.value});
  },
  render: function(){
    return (
      <Modal isOpen={this.props.replyModalIsOpen} onRequestClose={this.props.onRequestClose} style={customStyles} >
        <div>{this.props.replyErrorMsg}</div>
        <form onSubmit={this.handleSubmit} action="#" method="post">
          <textarea value={this.state.content} onChange={this.changeContent}></textarea>
          <input type="submit" />
        </form>
      </Modal>
    );
  }
});

module.exports = ReplyModal;