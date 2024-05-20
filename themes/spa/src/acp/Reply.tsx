import { MouseEvent } from 'react';
import { useTranslation, useDeleteReply } from '../common/dataHooks';
import type { ACPReplyProps } from '../common/types';
import { mutate } from 'swr';

export default function Reply({ data }: ACPReplyProps) {
  const { data: lang } = useTranslation();
  const { trigger } = useDeleteReply();

  function deleteReply(e: MouseEvent) {
    e.preventDefault();
    if (!confirm(lang.DEL_REPLY_CONFIRM)) {
      return;
    }
    trigger(data.id);
    mutate('loadAllCommentsFromServer');
  }
  if (!data.reply_content) {
    return null;
  }
  return (
    <div>
      <div
        dangerouslySetInnerHTML={{
          __html: lang.YOU_REPLIED.replace('{reply_time}', data.reply_time).replace(
            '{reply_content}',
            data.reply_content,
          ),
        }}
      ></div>
      <span>
        &nbsp;
        <a onClick={deleteReply} href="#">
          {lang.DELETE_THIS_REPLY}
        </a>
      </span>
    </div>
  );
}
