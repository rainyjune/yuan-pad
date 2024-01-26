import { useState, MouseEvent } from 'react';
import ReplyModal from './acp-replyModal';
import CommentUpdateModal from './acp-updateCommentModal';
import Comment from './Comment';
import {
  useTranslation,
  useAllComments,
  useDeleteMutiComments,
  useDeleteAllReplies,
  useDeleteAllComments,
} from '../common/dataHooks';
import { IComment } from '../common/types';
import { mutate } from 'swr';

function ACPMessages(props: { onActiveTabChanged: (s: string) => void }) {
  const { trigger: triggerDeleteAllComments } = useDeleteAllComments();
  const { trigger: triggerDeleteAllReplies } = useDeleteAllReplies();
  const { trigger: trigerDeleteMulti } = useDeleteMutiComments();
  const { data: lang } = useTranslation();
  const { data: commentsData } = useAllComments();
  const comments = commentsData.comments ?? [];
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
      nextIds = new Set(comments.map((comment: IComment) => comment.id));
      setSelectedIds(nextIds);
    }
    setSelectedIds(nextIds);
  }
  async function deleteAllComments(e: MouseEvent) {
    e.preventDefault();
    if (!confirm(lang.DEL_ALL_CONFIRM)) {
      return;
    }
    try {
      await triggerDeleteAllComments();
      mutate('loadAllCommentsFromServer');
    } catch (e) {
      alert(e);
    }
  }
  async function deleteAllReplies(e: MouseEvent) {
    e.preventDefault();
    if (!confirm(lang.DEL_ALL_REPLY_CONFIRM)) {
      return;
    }
    try {
      await triggerDeleteAllReplies();
      mutate('loadAllCommentsFromServer');
    } catch (e) {
      alert(e);
    }
  }
  async function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    const checkedItems: number[] = Array.from(selectedIds);
    if (checkedItems.length === 0) {
      return;
    }
    if (!confirm(lang.DEL_SELECTEDCOMMENTS_CONFIRM)) {
      return;
    }
    try {
      trigerDeleteMulti(checkedItems);
      mutate('loadAllCommentsFromServer');
    } catch (e) {
      alert(e);
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
  const modalProps = {
    comment: comments.find((comment: IComment) => comment.id === activeCommentId),
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
            {comments.map((comment: IComment) => {
              return (
                <Comment
                  data={comment}
                  key={comment.id}
                  onActiveTabChanged={props.onActiveTabChanged}
                  onReplyComment={(id: number) => {
                    openModal('reply', id);
                  }}
                  onUpdateComment={(id: number) => openModal('update', Number(id))}
                  onToggleItem={handleToggleItem}
                  isSelected={selectedIds.has(comment.id)}
                  onReplyDelete={() => {}}
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
      />
      <CommentUpdateModal
        key={`update-${activeCommentId}`}
        {...modalProps}
        modalIsOpen={modalState.isOpen && modalState.type === 'update'}
      />
    </div>
  );
}

export default ACPMessages;
