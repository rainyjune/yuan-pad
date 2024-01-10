import { useContext } from "react";
import LanguageContext from "../common/languageContext";
import AppConfigContext from "../common/appConfigContext";
// @ts-expect-error This library does not provide .d.ts file
import * as yuanjs from "@rainyjune/yuanjs";

export default function Reply(props: any) {
  const lang: any = useContext(LanguageContext);
  const appConfig: any = useContext(AppConfigContext);
  const rawMarkup = () => {
    const mapObj = {
      "{admin_name}": appConfig.admin,
      "{reply_time}": props.date,
      "{reply_content}": props.content,
    };
    return { __html: yuanjs.replaceAll(lang.ADMIN_REPLIED, mapObj) };
  };
  return <div className="reply" dangerouslySetInnerHTML={rawMarkup()}></div>;
}
