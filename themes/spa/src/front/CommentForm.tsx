import { useRef, useState, useContext, FormEvent, ChangeEvent } from 'react';
import LanguageContext from '../common/languageContext';
import AppConfigContext from '../common/appConfigContext';
import userContext from '../common/userContext';
import dataProvider from '../common/dataProvider';
import Captcha from './Captcha';

export default function CommentForm(props: any) {
  const user = useContext(userContext);
  const captchaRef = useRef<any>(null);
  const [text, setText] = useState('');
  const [valid_code, setValid_code] = useState('');
  const lang: any = useContext(LanguageContext);
  const appConfig: any = useContext(AppConfigContext);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const author = user?.username?.trim() || 'anonymous',
        text1 = text.trim(),
        valid_code1 = valid_code.trim();
    if (!author || !text1) return;

    setValid_code('');
    
    dataProvider.createPost({ user: author, content: text1, valid_code: valid_code1}).then(res => {
        if (res.data.statusCode !== 200) {
          alert(res.data.response);
          return;
        }
        captchaRef.current?.refresh();
        // Clear the text in the textarea.
        setText('');
        props.onCommentCreated();
    });
    return false;
  };
  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };
  const handleCaptchaChange = (e: any) => {
    setValid_code(e.target.value);
  };
  return (
    <form onSubmit={handleSubmit} className="commentForm form-horizontal" >
      <div className="form-group">
        <span className="col-sm-2 col-lg-2 control-label">{lang.NICKNAME}</span>
        <div className="col-sm-5 col-lg-5">
          <span className="control-label">{ user?.username || 'anonymous'}</span>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="inputContent" className="col-sm-2 col-lg-2 control-label">{lang.CONTENT}</label>
        <div className="col-sm-10 col-lg-10">
          <textarea id="inputContent" className="form-control" rows={3} onChange={handleTextChange} value={text}></textarea>
        </div>
      </div>
      {
        (appConfig.valid_code_open == 1) ?
          <Captcha
            ref={captchaRef}
            valid_code={valid_code}
            onCaptchaChange={handleCaptchaChange}
          /> : null
      }
      <div className="form-group">
        <div className="col-sm-offset-2 col-sm-10 col-lg-offset-2 col-lg-10">
          <button className="btn btn-default" type="submit">{lang.SUBMIT}</button>
        </div>
      </div>
    </form>
  );
};