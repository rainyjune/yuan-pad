import { MouseEvent, useContext } from 'react';
import dataProvider from '../common/dataProvider';
import LanguageContext from '../common/languageContext';

export default function Reply({ data, onDelete }: { data: any; onDelete: () => void }) {
  const lang = useContext(LanguageContext);

  function deleteReply(e: MouseEvent) {
    e.preventDefault();
    if (!confirm(lang.DEL_REPLY_CONFIRM)) {
      return false;
    }
    dataProvider.deleteReply(data.id).then(() => {
      onDelete();
    });
  }
  if (!data || !data.reply_content) {
    return null;
  }
  return (
    <div>
      {lang.YOU_REPLIED &&
        lang.YOU_REPLIED.replace('{reply_time}', data.reply_time).replace('{reply_content}', data.reply_content)}
      <span>
        &nbsp;
        <a onClick={deleteReply} href="#">
          {lang.DELETE_THIS_REPLY}
        </a>
      </span>
    </div>
  );
}
