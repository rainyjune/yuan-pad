import { useAppConfig, useTranslation } from '../common/dataHooks';
// @ts-expect-error This library does not provide .d.ts file
import * as yuanjs from '@rainyjune/yuanjs';

export default function Reply(props: any) {
  const { data: lang } = useTranslation();
  const { data: appConfig } = useAppConfig();
  function rawMarkup() {
    const mapObj = {
      '{admin_name}': appConfig.admin,
      '{reply_time}': props.date,
      '{reply_content}': props.content,
    };
    return { __html: yuanjs.replaceAll(lang.ADMIN_REPLIED ?? '', mapObj) };
  }
  return <div className="reply" dangerouslySetInnerHTML={rawMarkup()}></div>;
}
