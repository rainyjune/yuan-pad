import React from 'react';
import Modal from 'react-modal';
import dataProvider from './dataProvider.js';

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

class ReplyModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rid: '',
      pid: '',
      content: '',
      r_time: ''
    };
  }
  componentWillReceiveProps(nextProps) {
    let commentData = nextProps.comment;
    if (commentData) {
      this.setState({
        rid: commentData.reply_id,
        pid: commentData.id,
        content: commentData.reply_content
      });
    }
  }
  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.pid || !this.state.content.trim()) return;
    let action = this.state.rid ? 'updateReply' : 'createReply';
    dataProvider[action](this.state, res => {
      if (res.statusCode === 200) {
        this.props.onReplySubmit();
      }
    });
    return false;
  }
  changeContent(e) {
    this.setState({content: e.target.value});
  }
  render(){
    return (
      <Modal ariaHideApp={false} isOpen={this.props.modalIsOpen} onRequestClose={this.props.onRequestClose} style={customStyles} >
        <div>{this.props.modalErrorMsg}</div>
        <form onSubmit={this.handleSubmit} action="#" method="post">
          <textarea value={this.state.content} onChange={this.changeContent}></textarea>
          <input type="submit" />
        </form>
      </Modal>
    );
  }
}

export default ReplyModal;