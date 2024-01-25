import { forwardRef, MouseEvent, useRef, useImperativeHandle } from 'react';
import { useTranslation } from '../common/dataHooks';

const Captcha = forwardRef(
  (
    props: {
      valid_code: string;
      onCaptchaChange: (str: string) => void;
    },
    ref,
  ) => {
    const { data: lang } = useTranslation();
    const picRef = useRef<HTMLImageElement>(null);
    function refreshCaptch(e: MouseEvent) {
      e.preventDefault();
      refresh();
    }
    function refresh() {
      const img = picRef.current as HTMLImageElement;
      const url = img.getAttribute('data-src');
      img.src = url + '&v=' + Math.random();
    }
    useImperativeHandle(ref, () => ({ refresh }), []);
    return (
      <div className="form-group">
        <label htmlFor="inputCaptcha" className="col-sm-2 col-lg-2 control-label">
          {lang.CAPTCHA}
        </label>
        <div className="col-sm-5 col-lg-5">
          <input
            required
            id="inputCaptcha"
            type="text"
            maxLength={10}
            size={20}
            className="form-control"
            value={props.valid_code}
            onChange={(e) => props.onCaptchaChange(e.target.value)}
          />
          <img
            className="captchaImg"
            ref={picRef}
            src="index.php?action=captcha"
            data-src="index.php?action=captcha"
            onClick={refreshCaptch}
            alt="Captcha"
            title={lang.CLICK_TO_REFRESH}
          />
        </div>
      </div>
    );
  },
);
export type CaptchaCom = {
  refresh: () => void;
};

export default Captcha;
