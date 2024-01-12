import { useEffect, useState, useReducer, useContext, MouseEvent } from 'react';
import { messageReducer, dispatchMiddleware } from './messageReducer';
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
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: '', // "reply" or "update"
    error: null,
  });
  const [activeCommentId, setActiveCommentId] = useState(null);
  const [selectedIds, setSelectedIds] = useState(new Set());
  function handleToggleAll(e: React.ChangeEvent<HTMLInputElement>) {
    // Create a copy (to avoid mutation).
    let nextIds = new Set();
    if (e.target.checked) {
      nextIds = new Set(comments.data.map((comment) => comment.id));
      setSelectedIds(nextIds);
    }
    setSelectedIds(nextIds);
  }
  function deleteAllComments(e: MouseEvent) {
    e.preventDefault();
    if (!confirm(lang.DEL_ALL_CONFIRM)) {
      return false;
    }
    dispatch({
      type: 'DELETEALL',
    });
    dispatch({ type: 'LOAD' });
  }
  /**
   * Tested 1
   */
  function deleteAllReplies(e: MouseEvent) {
    e.preventDefault();
    if (!confirm(lang.DEL_ALL_REPLY_CONFIRM)) {
      return false;
    }
    dispatch({
      type: 'DELETEALLREPLIES',
    });
    dispatch({ type: 'LOAD' });
  }
  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    const checkedItems = Array.from(selectedIds);
    if (checkedItems.length === 0) {
      return false;
    }
    if (!confirm(lang.DEL_SELECTEDCOMMENTS_CONFIRM)) {
      return false;
    }
    dispatch({
      type: 'DELETEMULTI',
      data: checkedItems,
    });
    dispatch({ type: 'LOAD' });
  }
  function handleReplyComment(commentTobeReplied: any) {
    openModal('reply', commentTobeReplied);
  }
  function closeModal() {
    setModalState({
      isOpen: false,
      type: '',
      error: null,
    });
    setActiveCommentId(null);
  }
  function openModal(type = 'reply', commentData: any) {
    setModalState({
      isOpen: true,
      type: type,
      error: null,
    });
    setActiveCommentId(commentData.id);
  }
  function handleReplyFormSubmitted() {
    closeModal();
    dispatch({ type: 'LOAD' });
  }
  function handleUpdateComment(commentTobeUpdated: any) {
    openModal('update', commentTobeUpdated);
  }
  function handleCommentUpdated() {
    closeModal();
    dispatch({ type: 'LOAD' });
  }
  useEffect(() => {
    dispatch({ type: 'LOAD' });
  }, []);
  function handleToggleItem(toggledId: number) {
    // Create a copy (to avoid mutation).
    const nextIds = new Set(selectedIds);
    if (nextIds.has(toggledId)) {
      nextIds.delete(toggledId);
    } else {
      nextIds.add(toggledId);
    }
    setSelectedIds(nextIds);
  }
  function handleCommentDeleted(commentId, reply) {
    dispatch({ type: 'DELETE', commentId: commentId, reply: reply });
    dispatch({ type: 'LOAD' });
    props.onCommentDeleted();
  }
  const modalProps = {
    comment: comments.data.find((comment) => comment.id === activeCommentId),
    modalErrorMsg: modalState.error,
    onRequestClose: closeModal,
  };
  return (
    <div className={'message_container selectTag'}>
      <form onSubmit={handleFormSubmit} action="#" method="post">
        <table className="table table-striped table-hover">
          <thead>
            <tr className="header row">
              <th className="col-xs-1 col-sm-1 col-md-1">
                <input type="checkbox" onChange={handleToggleAll} />
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
                  isSelected={selectedIds.has(comment.id)}
                  onReplyDelete={() => dispatch({ type: 'LOAD' })}
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
        modalIsOpen={modalState.isOpen && modalState.type === 'reply'}
        onReplySubmit={handleReplyFormSubmitted}
      />
      <CommentUpdateModal
        {...modalProps}
        modalIsOpen={modalState.isOpen && modalState.type === 'update'}
        onCommentUpdated={handleCommentUpdated}
      />
    </div>
  );
}

export default ACPMessages;
