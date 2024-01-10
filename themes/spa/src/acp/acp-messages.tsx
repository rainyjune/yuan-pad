import { useEffect, useState, useReducer, useContext } from 'react';
import { messageReducer, dispatchMiddleware } from './messageReducer';
import dataProvider from '../common/dataProvider';
import ReplyModal from './acp-replyModal';
import CommentUpdateModal from './acp-updateCommentModal';
import Comment from './Comment';
import LanguageContext from '../common/languageContext';

const initialState = {
  isLoading: false,
  isError: false,
  data: [],
};

function ACPMessages(props: {
  systemInformation: object;
  onActiveTabChanged: (s: string) => void;
  onCommentDeleted: () => void;
}) {
  const lang = useContext(LanguageContext);
  const [comments, dispatchBase] = useReducer(messageReducer, initialState);
  const dispatch = dispatchMiddleware(dispatchBase);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalType, setModalType] = useState(''); // "reply" or "update"
  const [modalCommentModel, setModalCommentModel] = useState(null);
  const [modalErrorMsg, setModalErrorMsg] = useState('');
  const toggleInputClicked = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'TOGGLEALL',
      checked: e.target.checked,
    });
  };
  const getCheckedItems = () => {
    const arr: number[] = [];
    const key = 'id';
    comments.data.forEach((currentValue: any) => {
      if (currentValue.checked) {
        arr.push(currentValue[key]);
      }
    });
    return arr;
  };
  const deleteAllComments = (e: any) => {
    e.preventDefault();
    if (!confirm(lang.DEL_ALL_CONFIRM)) {
      return false;
    }
    dataProvider.deleteAllComments().then((res) => {
      if (res.data.statusCode === 200) {
        dispatch({ type: 'LOAD' });
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
    if (!confirm(lang.DEL_ALL_REPLY_CONFIRM)) {
      return false;
    }
    dataProvider.deleteAllReplies().then((res) => {
      if (res.data.statusCode === 200) {
        dispatch({ type: 'LOAD' });
      } else {
        alert('ERROR');
      }
    });
  };
  const deleteSelected = (e: any) => {
    e.preventDefault();
    const checkedItems = getCheckedItems();
    if (checkedItems.length === 0) {
      return false;
    }
    if (!confirm(lang.DEL_SELECTEDCOMMENTS_CONFIRM)) {
      return false;
    }
    dataProvider.deleteMutiComments(checkedItems).then((res) => {
      if (res.data.statusCode === 200) {
        dispatch({ type: 'LOAD' });
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
    setModalErrorMsg('');
  };
  const openModal = (type = 'reply', commentData: any) => {
    setModalIsOpen(true);
    setModalType(type);
    setModalCommentModel(commentData);
    setModalErrorMsg('');
  };
  const handleReplyFormSubmitted = () => {
    closeModal();
    dispatch({ type: 'LOAD' });
  };
  const handleUpdateComment = (commentTobeUpdated: any) => {
    openModal('update', commentTobeUpdated);
  };
  const handleCommentUpdated = () => {
    closeModal();
    dispatch({ type: 'LOAD' });
  };
  useEffect(() => {
    dispatch({ type: 'LOAD' });
  }, []);
  const handleToggleItem = (id: number) => {
    dispatch({
      type: 'TOGGLE',
      id: id,
    });
  };
  const handleCommentDeleted = (commentId, reply) => {
    dispatch({ type: 'DELETE', commentId: commentId, reply: reply });
    dispatch({ type: 'LOAD' });
    props.onCommentDeleted();
  };

  const modalProps = {
    comment: modalCommentModel,
    modalErrorMsg: modalErrorMsg,
    onRequestClose: closeModal,
  };
  return (
    <div className={'message_container selectTag'}>
      <form onSubmit={deleteSelected} action="#" method="post">
        <table className="table table-striped table-hover">
          <thead>
            <tr className="header row">
              <th className="col-xs-1 col-sm-1 col-md-1">
                <input type="checkbox" onChange={toggleInputClicked} />
              </th>
              <th className="col-xs-3 col-sm-3 col-md-3">{lang.NICKNAME}</th>
              <th className="col-xs-6 col-sm-6 col-md-6">{lang.MESSAGE}</th>
              <th className="col-xs-2 col-sm-2 col-md-2">{lang.OPERATION}</th>
            </tr>
          </thead>
          <tbody>
            {comments.data.map((comment: any) => {
              return (
                <Comment
                  data={comment}
                  key={comment.id}
                  onActiveTabChanged={props.onActiveTabChanged}
                  onReplyComment={handleReplyComment}
                  onCommentDeleted={handleCommentDeleted}
                  onUpdateComment={handleUpdateComment}
                  onToggleItem={handleToggleItem}
                />
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={4}>
                <input type="submit" value={lang.DELETE_CHECKED} />
                <button onClick={deleteAllComments}>{lang.DELETE_ALL}</button>
                <button onClick={deleteAllReplies}>{lang.DELETE_ALL_REPLY}</button>
              </td>
            </tr>
          </tfoot>
        </table>
      </form>
      <ReplyModal
        {...modalProps}
        modalIsOpen={modalIsOpen && modalType === 'reply'}
        onReplySubmit={handleReplyFormSubmitted}
      />
      <CommentUpdateModal
        {...modalProps}
        modalIsOpen={modalIsOpen && modalType === 'update'}
        onCommentUpdated={handleCommentUpdated}
      />
    </div>
  );
}

export default ACPMessages;
