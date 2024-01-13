import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react';
import dataProvider from '../common/dataProvider';
import LanguageContext from '../common/languageContext';
import AppConfigContext from '../common/appConfigContext';
import type { ITranslationData } from '../common/types';

function ACPConfig(props: any) {
  const appConfig = useContext(AppConfigContext);
  const lang: ITranslationData = useContext(LanguageContext);
  const [state, setState] = useState(appConfig);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    dataProvider.updateSiteConfig(state).then((res) => {
      console.log('ACPConfig state:', state);
      if (res.data.statusCode === 200) {
        // TODO show friendly message.
        alert('OK');
        setState({
          ...state,
          password: '',
        }); // Empty the password input value.
        props.onConfigUpdated();
      } else {
        // TODO User friendly message.
        alert('failed');
      }
    });
  }
  function toggleSiteClose(e: ChangeEvent) {
    setState({
      ...state,
      site_close: Number((e.target as HTMLInputElement).value),
    });
  }
  function toggleCaptcha(e: ChangeEvent) {
    setState({
      ...state,
      valid_code_open: Number((e.target as HTMLInputElement).value),
    });
  }
  function togglePagination(e: ChangeEvent) {
    setState({
      ...state,
      page_on: Number((e.target as HTMLInputElement).value),
    });
  }
  function toggleFilterType(e: ChangeEvent) {
    setState({
      ...state,
      filter_type: Number((e.target as HTMLInputElement).value),
    });
  }
  function handleInput(e: ChangeEvent) {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    setState({
      ...state,
      [target.name]: target.value.trim(),
    });
  }
  const acpData = props.systemInformation;
  return (
    <div className={'configContainer selectTag'}>
      <form onSubmit={handleSubmit} action="index.php?controller=config&amp;action=update" method="post">
        <fieldset>
          <legend>{lang.SYS_CONF}</legend>
          <table className="table">
            <tbody>
              <tr>
                <td>{lang.BOARD_NAME}:</td>
                <td>
                  <input name="board_name" type="text" size={20} value={state.board_name} onChange={handleInput} />
                </td>
              </tr>
              <tr>
                <td>{lang.CLOSE_BOARD}:</td>
                <td>
                  <input type="radio" value="1" checked={state.site_close == 1} onChange={toggleSiteClose} />
                  {lang.YES}
                  <input type="radio" value="0" checked={state.site_close != 1} onChange={toggleSiteClose} />
                  {lang.NO}
                </td>
              </tr>
              <tr>
                <td>{lang.CLOSE_REASON}:</td>
                <td>
                  <textarea
                    name="close_reason"
                    value={state.close_reason}
                    onChange={handleInput}
                    cols={30}
                    rows={3}
                  ></textarea>
                </td>
              </tr>
              <tr>
                <td>{lang.ADMIN_EMAIL}:</td>
                <td>
                  <input name="admin_email" value={state.admin_email} type="text" size={20} onChange={handleInput} />
                </td>
              </tr>
              <tr>
                <td>{lang.COPY_INFO}:</td>
                <td>
                  <textarea
                    name="copyright_info"
                    value={state.copyright_info}
                    cols={30}
                    rows={3}
                    onChange={handleInput}
                  ></textarea>
                </td>
              </tr>
              <tr>
                <td>{lang.SYS_THEME}:</td>
                <td>
                  <select name="theme" value={state.theme} onChange={handleInput}>
                    {(() => {
                      const themes = acpData.themes,
                        themeOptions = [];
                      for (const i in themes) {
                        const theme = themes[i];
                        themeOptions.push(
                          <option key={theme} value={theme}>
                            {theme}
                          </option>,
                        );
                      }
                      return themeOptions;
                    })()}
                  </select>
                </td>
              </tr>
              <tr>
                <td>{lang.TIMEZONE}:</td>
                <td>
                  <select name="timezone" value={state.timezone} onChange={handleInput}>
                    {(() => {
                      const timeZones = acpData.timezones,
                        timezoneOptions = [];
                      for (const i in timeZones) {
                        const timezone = timeZones[i];
                        timezoneOptions.push(
                          <option key={i} value={i}>
                            {timezone}
                          </option>,
                        );
                      }
                      return timezoneOptions;
                    })()}
                  </select>
                </td>
              </tr>
              <tr>
                <td>{lang.LANG}:</td>
                <td>
                  <select name="lang" value={state.lang} onChange={handleInput}>
                    {(() => {
                      const languages = acpData.languages,
                        languageOptions = [];
                      for (const i in languages) {
                        const language = languages[i];
                        languageOptions.push(
                          <option key={i} value={language}>
                            {language}
                          </option>,
                        );
                      }
                      return languageOptions;
                    })()}
                  </select>
                </td>
              </tr>
              <tr>
                <td>{lang.DATE_FORMAT}:</td>
                <td>
                  <select name="dateformat" value={state.dateformat} onChange={handleInput}>
                    {(() => {
                      const dateFormateList = acpData.dateFormates,
                        formatOptions = [];
                      for (const i in dateFormateList) {
                        const format = dateFormateList[i];
                        formatOptions.push(
                          <option key={i} value={i}>
                            {format}
                          </option>,
                        );
                      }
                      return formatOptions;
                    })()}
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
        </fieldset>
        <fieldset>
          <legend>{lang.POST_CONF}</legend>
          <table className="table">
            <tbody>
              <tr>
                <td>{lang.FILTER_WORDS}:</td>
                <td>
                  <textarea
                    name="filter_words"
                    value={state.filter_words}
                    onChange={handleInput}
                    cols={20}
                    rows={3}
                  ></textarea>
                </td>
              </tr>
              <tr>
                <td>{lang.ENABLE_CAPTCHA}:</td>
                <td>
                  {(() => {
                    const captchaInputs = [];
                    captchaInputs.push(
                      <label key="1">
                        <input type="radio" value="1" checked={state.valid_code_open == 1} onChange={toggleCaptcha} />
                        {lang.YES}
                      </label>,
                    );
                    captchaInputs.push(
                      <label key="0">
                        <input type="radio" value="0" checked={state.valid_code_open != 1} onChange={toggleCaptcha} />
                        {lang.NO}
                      </label>,
                    );
                    if (acpData.gd_loaded === false) {
                      captchaInputs.push(<span>{lang.GD_DISABLED_NOTICE}</span>);
                    }
                    return captchaInputs;
                  })()}
                </td>
              </tr>
              <tr>
                <td>{lang.ENABLE_PAGE}</td>
                <td>
                  <label>
                    <input type="radio" value="1" checked={state.page_on == 1} onChange={togglePagination} />
                    {lang.YES}
                  </label>
                  <label>
                    <input type="radio" value="0" checked={state.page_on != 1} onChange={togglePagination} />
                    {lang.NO}
                  </label>
                </td>
              </tr>
              <tr>
                <td>{lang.POST_PERPAGE}:</td>
                <td>
                  <input name="num_perpage" value={state.num_perpage} onChange={handleInput} type="text" />
                  {lang.PAGINATION_TIP}
                </td>
              </tr>
              <tr>
                <td>{lang.FILTER_HTML_TAGS}:</td>
                <td>
                  <label>
                    <input type="radio" value="1" checked={state.filter_type == 1} onChange={toggleFilterType} />
                    {lang.STRIP_DISALLOWED_TAGS}
                  </label>
                  <label>
                    <input type="radio" value="2" checked={state.filter_type == 2} onChange={toggleFilterType} />
                    {lang.ESCAPE_ALL_TAGS}
                  </label>
                </td>
              </tr>
              <tr>
                <td>{lang.ALLOWED_HTML_TAGS}:</td>
                <td>
                  <input name="allowed_tags" value={state.allowed_tags} onChange={handleInput} type="text" />
                </td>
              </tr>
            </tbody>
          </table>
        </fieldset>
        <fieldset>
          <legend>{lang.ADMIN_CONF}</legend>
          <table className="table">
            <tbody>
              <tr>
                <td>{lang.CHANGE_PWD}:</td>
                <td>
                  <input type="password" name="password" value={state.password} onChange={handleInput} />
                  &nbsp;{lang.PWD_TIP}
                </td>
              </tr>
            </tbody>
          </table>
        </fieldset>
        <input type="submit" value={lang.SUBMIT} />
        <input type="reset" value={lang.RESET} />
      </form>
    </div>
  );
}

export default ACPConfig;
