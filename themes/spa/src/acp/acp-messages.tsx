import { useEffect, useState, useContext, MouseEvent, useCallback } from 'react';
import { initialState as messageInitalState, messageReducer } from './messageReducer';
import ReplyModal from './acp-replyModal';
import CommentUpdateModal from './acp-updateCommentModal';
import Comment from './Comment';
import LanguageContext from '../common/languageContext';
import { IComment } from '../common/types';
import useThunkReducer from '../common/useThunkReducer';
import dataProvider from '../common/dataProvider';
import { useSystemInfoDispatch } from '../common/SystemInfoContext';

function ACPMessages(props: { onActiveTabChanged: (s: string) => void }) {
  const systemInfoDispatch = useSystemInfoDispatch();
  const lang = useContext(LanguageContext);
  const [comments, dispatch] = useThunkReducer(messageReducer, messageInitalState);
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: '', // "reply" or "update"
    error: null,
  });
  const [activeCommentId, setActiveCommentId] = useState<null | number>(null);
  const [selectedIds, setSelectedIds] = useState(new Set<number>());
  function handleToggleAll(e: React.ChangeEvent<HTMLInputElement>) {
    // Create a copy (to avoid mutation).
    let nextIds = new Set<number>();
    if (e.target.checked) {
      nextIds = new Set(comments.data.map((comment: IComment) => comment.id));
      setSelectedIds(nextIds);
    }
    setSelectedIds(nextIds);
  }
  async function deleteAllComments(e: MouseEvent) {
    e.preventDefault();
    if (!confirm(lang.DEL_ALL_CONFIRM)) {
      return false;
    }
    try {
      const res = await dataProvider.deleteAllComments();
      console.log('res:', res);
      if (res.data.statusCode === 200) {
        loadMessages();
        systemInfoDispatch({
          type: 'loaded',
        });
      } else {
        throw Error(res.data);
      }
    } catch (e) {
      alert('删除失败');
    }
  }
  async function deleteAllReplies(e: MouseEvent) {
    e.preventDefault();
    if (!confirm(lang.DEL_ALL_REPLY_CONFIRM)) {
      return false;
    }
    try {
      const res = await dataProvider.deleteAllReplies();
      if (res.data.statusCode === 200) {
        loadMessages();
        systemInfoDispatch({
          type: 'loaded',
        });
      } else {
        throw Error(res.data);
      }
    } catch (e) {
      alert('删除回复失败');
    }
  }
  async function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    const checkedItems: number[] = Array.from(selectedIds);
    if (checkedItems.length === 0) {
      return false;
    }
    if (!confirm(lang.DEL_SELECTEDCOMMENTS_CONFIRM)) {
      return false;
    }
    try {
      const res = await dataProvider.deleteMutiComments(checkedItems);
      if (res.data.statusCode === 200) {
        loadMessages();
        systemInfoDispatch({
          type: 'loaded',
        });
      } else {
        throw Error(res.data);
      }
    } catch (e) {
      alert('删除失败');
    }
  }
  function closeModal() {
    setModalState({
      isOpen: false,
      type: '',
      error: null,
    });
    setActiveCommentId(null);
  }
  function openModal(type = 'reply', commentId: number) {
    setModalState({
      isOpen: true,
      type: type,
      error: null,
    });
    setActiveCommentId(commentId);
  }
  const loadMessages = useCallback(
    async function () {
      try {
        const res = await dataProvider.loadAllCommentsFromServer();
        dispatch({
          type: 'LOAD_SUCCESS',
          data: res.data.response.comments,
        });
      } catch (e) {
        dispatch({ type: 'LOAD_ERROR' });
      }
    },
    [dispatch],
  );
  useEffect(() => {
    loadMessages();
  }, [loadMessages]);
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
  async function handleCommentDeleted(commentId: number) {
    try {
      const res = await dataProvider.deleteComment(commentId);
      if (res.data.statusCode === 200) {
        loadMessages();
        systemInfoDispatch({
          type: 'loaded',
        });
      } else {
        throw Error(res.data);
      }
    } catch (e) {
      alert('删除留言失败');
    }
  }
  const modalProps = {
    comment: comments.data.find((comment: IComment) => comment.id === activeCommentId),
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
                  onReplyComment={(id: number) => {
                    openModal('reply', id);
                  }}
                  onCommentDeleted={handleCommentDeleted}
                  onUpdateComment={(id: number) => openModal('update', id)}
                  onToggleItem={handleToggleItem}
                  isSelected={selectedIds.has(comment.id)}
                  onReplyDelete={() => {
                    loadMessages();
                    systemInfoDispatch({
                      type: 'loaded',
                    });
                  }}
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
        key={`reply-${activeCommentId}`}
        {...modalProps}
        modalIsOpen={modalState.isOpen && modalState.type === 'reply'}
        onReplySubmit={() => {
          closeModal();
          loadMessages();
          systemInfoDispatch({
            type: 'loaded',
          });
        }}
      />
      <CommentUpdateModal
        key={`update-${activeCommentId}`}
        {...modalProps}
        modalIsOpen={modalState.isOpen && modalState.type === 'update'}
        onCommentUpdated={() => {
          closeModal();
          loadMessages();
          systemInfoDispatch({
            type: 'loaded',
          });
        }}
      />
    </div>
  );
}

export default ACPMessages;
