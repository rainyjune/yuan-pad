import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import dataProvider from '../common/dataProvider';
import ReplyModal from './acp-replyModal';
import CommentUpdateModal from './acp-updateCommentModal';

function Reply(props: any) {
  const [state, setState] = useState({
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
  });
  useEffect(() => {
    let data = props.data;
    if (data) {
      setState({
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
  }, [props.data]);

  const deleteReply = (e: any) => {
    e.preventDefault();
    if (!confirm(props.lang.DEL_REPLY_CONFIRM)) {
      return false;
    }
    dataProvider.deleteReply(state.id, response => {
      setState(_.extend({}, state, { reply_content: '' }));
    });
  }
  let lang = props.lang,
      data = state;
  if (!data || !data.reply_content) {
    return null;
  }
  return (
    <div>
      {lang.YOU_REPLIED && lang.YOU_REPLIED.replace('{reply_time}', data.reply_time).replace('{reply_content}', data.reply_content)}
      <span>&nbsp;<a onClick={deleteReply} href="#">{lang.DELETE_THIS_REPLY}</a></span>
    </div>
  );
}

function Comment(props: any) {
  const banIP = (e: any) => {
    let dom = e.target;
    e.preventDefault();
    let ip = props.data.ip;
    dataProvider.banIP(ip, () => {
      props.onActiveTabChanged('ban_ip');
    });
  };
  const deleteComment = (e: any) => {
    e.preventDefault();
    let data = props.data;
    let commentId = data.id;
    let reply = data.reply ? "1" : "0";
    if (!confirm(props.lang.DEL_COMMENT_CONFIRM)) {
      return false;
    }
    // TODO
    dataProvider.deleteComment(commentId, reply, response => {
      props.onCommentDeleted();
    });
  };
  const replyComment = (e: any) => {
    e.preventDefault();
    props.onReplyComment(props.data);
  };
  const updateComment = (e: any) => {
    e.preventDefault();
    props.onUpdateComment(props.data);
  };
  const toggleItem = () => {
    props.onToggleItem(props.data);
  };
  let data = props.data;
  let lang = props.lang;
  return (
    <tr className="row">
      <td className="col-xs-1 col-sm-1 col-md-1">
        <input type='checkbox' checked={props.data.checked} onChange={toggleItem} />
        <input type='hidden' name={props.data.id} value={data.reply ? 1 : 0} />
      </td>
      <td className="col-xs-3 col-sm-3 col-md-3">
        {parseInt(data.uid) ? data.b_username : data.uname}
      </td>
      <td className='col-xs-6 col-sm-6 col-md-6'>
        {data.post_content}<br />{lang.TIME}：{data.time}
        <Reply lang={lang} data={data} />
      </td>
      <td className="col-xs-2 col-sm-2 col-md-2">
        <button className="btn btn-danger btn-sm" onClick={deleteComment}>
          <span className="glyphicon glyphicon-remove-circle" aria-hidden="true"></span>
        </button>
        <button className="btn btn-default btn-sm" onClick={replyComment}>
          <img src="./themes/spa/images/reply.png" width="12" height="12" />
        </button>
        <button className="btn btn-default btn-sm" onClick={updateComment}>
          <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
        </button>
        <button className="btn btn-default btn-sm" onClick={banIP} data-ip={data.ip}>
          <span className="glyphicon glyphicon-ban-circle" aria-hidden="true"></span>
        </button>
      </td>
    </tr>
  );
}

function ACPMessages(props: any) {
  const [comments, setComments] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalType, setModalType] = useState(''); // "reply" or "update" 
  const [modalCommentModel, setModalCommentModel] = useState(null);
  const [modalErrorMsg, setModalErrorMsg] = useState('');
  const addSelectedFlag = (arr: Array<any>) => {
    if (Array.isArray(arr)) {
      arr.forEach((currentValue, index) => {
        currentValue['checked'] = false;
      });
    }
  };
  const toggle = (itemToToggle: any) => {
    let data = comments.map((currentValue: any, index) => {
      if (currentValue === itemToToggle) {
        currentValue['checked'] = !currentValue['checked'];
      }
      return currentValue;
    });
    setMixState(data);
  };
  const toggleInputClicked = (e: any) => {
    toggleAll(e.target.checked);
  };
  const toggleAll = (checked: boolean) => {
    let data = comments.map((currentValue: any, index) => {
      currentValue['checked'] = checked;
      return currentValue;
    });
    setMixState(data);
  };
  const getCheckedItems = () => {
    let arr: any = [];
    let key = getItemKey();
    let field = getMixinAttr();
    comments.forEach((currentValue: any, index) => {
      if (currentValue.checked) {
        arr.push(currentValue[key]);
      }
    });
    return arr;
  };
  const getMixinAttr = () => {
    return 'comments';
  };
  const getItemKey = () => {
    return 'id';
  };
  const setMixState = (data: any) => {
    setComments(data);
  };
  const deleteAllComments = (e: any) => {
    e.preventDefault();
    if (!confirm(props.lang.DEL_ALL_CONFIRM)) {
      return false;
    }
    dataProvider.deleteAllComments(res => {
      if (res.statusCode === 200) {
        setComments([]);
      } else {
        alert('Error');
      }
    });
  };
  /**
   * Tested 1
   */
  const deleteAllReplies = (e: any) => {
    e.preventDefault();
    if (!confirm(props.lang.DEL_ALL_REPLY_CONFIRM)) {
      return false;
    }
    dataProvider.deleteAllReplies(res => {
      if (res.statusCode === 200) {
        loadCommentsFromServer();
      } else {
        alert('ERROR')
      }
    });
  };
  const deleteSelected = (e: any) => {
    e.preventDefault();
    let checkedItems = getCheckedItems();
    if (checkedItems.length === 0) {
      return false;
    }
    if (!confirm(props.lang.DEL_SELECTEDCOMMENTS_CONFIRM)) {
      return false;
    }
    dataProvider.deleteMutiComments(checkedItems, res => {
      if (res.statusCode === 200) {
        loadCommentsFromServer();
      } else {
        alert('delete error');
      }
    });
  };
  const handleReplyComment = (commentTobeReplied: any) => {
    openModal('reply', commentTobeReplied);
  };
  const closeModal = () => {
    setModalIsOpen(false);
    setModalType('');
    setModalCommentModel(null);
    setModalErrorMsg('')
  };
  const openModal = (type = 'reply', commentData: any) => {
    setModalIsOpen(true);
    setModalType(type);
    setModalCommentModel(commentData);
    setModalErrorMsg('');
  };
  const handleReplyFormSubmitted = () => {
    closeModal();
    loadCommentsFromServer();
  };
  const handleUpdateComment = (commentTobeUpdated: any) => {
    openModal('update', commentTobeUpdated);
  };
  const handleCommentUpdated = () => {
    closeModal();
    loadCommentsFromServer();
  };
  const loadCommentsFromServer = () => {
    dataProvider.loadAllCommentsFromServer(res => {
      if (res.statusCode === 200 || res.statusCode === 404) {
        let data = res.response.comments;
        addSelectedFlag(data)
        //setState({comments: data});
        setComments(data);
      } else {
        // TODO .
        alert('error');
      }
    });
  };
  useEffect(() => {
    loadCommentsFromServer();
  }, []);
  const handleToggleItem = (item: any) => {
    toggle(item);
  };
  const handleCommentDeleted = () => {
    loadCommentsFromServer();
    props.onCommentDeleted();
  };
  const lang = props.lang;
  
  let modalProps = {
    comment: modalCommentModel,
    modalErrorMsg: modalErrorMsg,
    onRequestClose: closeModal
  };
  return (
    <div className={props.activeTab === "message" ? "message_container selectTag" : "message_container"}>
      <form onSubmit={deleteSelected} action="#" method="post">
        <table className="table table-striped table-hover">
          <thead>
            <tr className="header row">
              <th className="col-xs-1 col-sm-1 col-md-1"><input type="checkbox" onClick={toggleInputClicked} /></th>
              <th className="col-xs-3 col-sm-3 col-md-3">{lang.NICKNAME}</th>
              <th className="col-xs-6 col-sm-6 col-md-6">{lang.MESSAGE}</th>
              <th className="col-xs-2 col-sm-2 col-md-2">{lang.OPERATION}</th>
            </tr>
          </thead>
          <tbody>
            {(() => {
              let commentArr: any = [];
              let createComment = function(comment: any) {
                commentArr.push(
                  <Comment
                    lang={lang}
                    data={comment}
                    key={comment.id}
                    onActiveTabChanged={props.onActiveTabChanged}
                    onReplyComment={handleReplyComment}
                    onCommentDeleted={handleCommentDeleted}
                    onUpdateComment={handleUpdateComment}
                    onToggleItem={handleToggleItem}
                  />
                );
              };
              comments && comments.map(createComment, this);
              return commentArr;
            })()}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={4}>
                <input type='submit' value={lang.DELETE_CHECKED} />
                <button onClick={deleteAllComments}>{lang.DELETE_ALL}</button>
                <button onClick={deleteAllReplies}>{lang.DELETE_ALL_REPLY}</button>
              </td>
            </tr>
          </tfoot>
        </table>
      </form>
      <ReplyModal
        {...modalProps}
        modalIsOpen = {modalIsOpen && modalType === "reply"}
        onReplySubmit={handleReplyFormSubmitted}
      />
      <CommentUpdateModal
        {...modalProps}
        modalIsOpen = {modalIsOpen && modalType === "update"}
        onCommentUpdated={handleCommentUpdated}
      />
    </div>
  );
}

export default ACPMessages;