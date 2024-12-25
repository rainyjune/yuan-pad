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
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-2">
      <textarea
        required
        id="inputContent"
        className="w-full rounded-md p-2"
        rows={3}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
          setText(e.target.value);
        }}
        value={text}
      ></textarea>
      {Number(appConfig.valid_code_open) === 1 && (
        <Captcha
          ref={captchaRef}
          valid_code={valid_code}
          onCaptchaChange={(str: string) => {
            setValid_code(str);
          }}
        />
      )}
      <button className="w-3/5 bg-[#27B981] py-[6px] text-white rounded-[6px]" type="submit">
        {lang.SUBMIT}
      </button>
    </form>
  );
}
