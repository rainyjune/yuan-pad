import { useRef, useState, FormEvent, ChangeEvent } from 'react';
import Captcha from './Captcha';
import type { CaptchaCom, CommentFormProps } from '../common/types';
import { useAppConfig, useUser, useTranslation, useAddComment } from '../common/dataHooks';

export default function CommentForm({ onCommentCreated }: CommentFormProps) {
  const { trigger: addComment } = useAddComment();
  const { data: lang } = useTranslation();
  const { data: appConfig } = useAppConfig();
  const { user: user } = useUser();
  const captchaRef = useRef<CaptchaCom>(null);
  const [text, setText] = useState('');
  const [valid_code, setValid_code] = useState('');
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const author = user.username || 'anonymous',
      text1 = text.trim(),
      valid_code1 = valid_code.trim();
    if (!author || !text1) return;

    setValid_code('');

    try {
      await addComment({ user: author, content: text1, valid_code: valid_code1 });
      captchaRef.current?.refresh();
      setText('');
      onCommentCreated();
    } catch (e) {
      // error handling
      alert(e);
    }
    return false;
  }
  return (
    <form onSubmit={handleSubmit} className="commentForm form-horizontal">
      <div className="form-group">
        <span className="col-sm-2 col-lg-2 control-label">{lang.NICKNAME}</span>
        <div className="col-sm-5 col-lg-5">
          <span className="control-label">{user?.username || 'anonymous'}</span>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="inputContent" className="col-sm-2 col-lg-2 control-label">
          {lang.CONTENT}
        </label>
        <div className="col-sm-10 col-lg-10">
          <textarea
            required
            id="inputContent"
            className="form-control"
            rows={3}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
              setText(e.target.value);
            }}
            value={text}
          ></textarea>
        </div>
      </div>
      {Number(appConfig.valid_code_open) === 1 && (
        <Captcha
          ref={captchaRef}
          valid_code={valid_code}
          onCaptchaChange={(str: string) => {
            setValid_code(str);
          }}
        />
      )}
      <div className="form-group">
        <div className="col-sm-offset-2 col-sm-10 col-lg-offset-2 col-lg-10">
          <button className="btn btn-default" type="submit">
            {lang.SUBMIT}
          </button>
        </div>
      </div>
    </form>
  );
}
