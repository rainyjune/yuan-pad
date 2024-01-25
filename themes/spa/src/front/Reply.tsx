import { useAppConfig, useTranslation } from '../common/dataHooks';
import type { ObjectLiteral } from '../common/types';

function replaceAll(str: string, mapObj: ObjectLiteral) {
  const re = new RegExp(Object.keys(mapObj).join('|'), 'gi');
  return str.replace(re, function (matched) {
    const str1 = matched.toLowerCase();
    return mapObj[str1];
  });
}

export default function Reply({ date, content }: { date: string; content: string }) {
  const { data: lang } = useTranslation();
  const { data: appConfig } = useAppConfig();
  function rawMarkup() {
    const mapObj = {
      '{admin_name}': appConfig.admin,
      '{reply_time}': date,
      '{reply_content}': content,
    };
    return { __html: replaceAll(lang.ADMIN_REPLIED ?? '', mapObj) };
  }
  return <div className="reply" dangerouslySetInnerHTML={rawMarkup()}></div>;
}
