import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import _ from 'lodash';
import dataProvider from './dataProvider';

function ACPConfig(props: any) {
  const [state, setState] = useState({
    board_name: '',
    site_close: 0,
    close_reason: '',
    admin_email: '',
    copyright_info: '',
    theme: 'spa',
    timezone: 0,
    lang: 'en',
    dateformat: '',
    filter_words: '',
    valid_code_open: 0,
    page_on: 0,
    num_perpage: 10,
    filter_type: 1,
    allowed_tags: '',
    password: ''
  });

  useEffect(() => {
    let propAppConfig = props.appConfig;
    let computedState: any = {};
    for (let i in propAppConfig) {
      if (state.hasOwnProperty(i)) {
        computedState[i] = propAppConfig[i] === null ? 0 : propAppConfig[i];
      }
    }
    setState(_.extend({}, state, computedState));
  }, [props.appConfig]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dataProvider.updateSiteConfig(state, res => {
      console.log('ACPConfig state:', state);
      if (res.statusCode === 200) {
        // TODO show friendly message.
        alert('OK');
        setState(_.extend({}, state, {
          password: ''
        }));// Empty the password input value.
        props.onConfigUpdated();
      } else {
        // TODO User friendly message.
        alert('failed');
      }
    });
  };
  const toggleSiteClose = (e: ChangeEvent) => {
    setState(_.extend({}, state, {
      site_close: (e.target as HTMLInputElement).value
    }));
  };
  const toggleCaptcha = (e: ChangeEvent) => {
    setState(_.extend({}, state, {
      valid_code_open: (e.target as HTMLInputElement).value
    }));
  };
  const togglePagination = (e: ChangeEvent) => {
    setState(_.extend({}, state, {
      page_on: (e.target as HTMLInputElement).value
    }));
  };
  const toggleFilterType = (e: ChangeEvent) => {
    setState(_.extend({}, state, {
      filter_type: (e.target as HTMLInputElement).value
    }));
  };
  const handleInput = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    setState(_.extend({}, state, {
      [target.name]: target.value.trim()
    }));
  };
  let appConfig = state,
      acpData = props.systemInformation,
      lang = props.lang;

  return (
    <div className={props.activeTab === "siteset" ? "configContainer selectTag" : "configContainer"}>
      <form onSubmit={handleSubmit} action="index.php?controller=config&amp;action=update" method="post">
        <fieldset>
          <legend>{lang.SYS_CONF}</legend>
          <table className="table">
            <tbody>
              <tr>
                <td>{lang.BOARD_NAME}:</td>
                <td><input name='board_name' type="text" size={20} value={state.board_name} onChange={handleInput} /></td>
              </tr>
              <tr>
                <td>{lang.CLOSE_BOARD}:</td>
                <td>
                  <input type="radio" value="1" checked={appConfig.site_close == 1} onChange={toggleSiteClose} />{lang.YES}
                  <input type="radio" value="0" checked={appConfig.site_close != 1} onChange={toggleSiteClose} />{lang.NO}
                </td>
              </tr>
              <tr>
                <td>{lang.CLOSE_REASON}:</td>
                <td><textarea name='close_reason' value={appConfig.close_reason} onChange={handleInput} cols={30} rows={3}></textarea></td>
              </tr>
              <tr>
                <td>{lang.ADMIN_EMAIL}:</td>
                <td><input name='admin_email' value={appConfig.admin_email} type="text" size={20} onChange={handleInput} /></td>
              </tr>
              <tr>
                <td>{lang.COPY_INFO}:</td>
                <td><textarea name='copyright_info' value={appConfig.copyright_info} cols={30} rows={3} onChange={handleInput} ></textarea></td>
              </tr>
              <tr>
                <td>{lang.SYS_THEME}:</td>
                <td>
                  <select name='theme' value={state.theme} onChange={handleInput}>
                    {(()=>{
                      let themes = acpData.themes, themeOptions = [];
                      for (let i in themes) {
                        let theme = themes[i];
                        themeOptions.push(<option key={theme} value={theme}>{theme}</option>);
                      }
                      return themeOptions;
                    })()}
                  </select>
                </td>
              </tr>
              <tr>
                <td>{lang.TIMEZONE}:</td>
                <td>
                  <select name='timezone' value={state.timezone} onChange={handleInput}>
                    {(()=>{
                      let timeZones = acpData.timezones, timezoneOptions = [];
                      for (let i in timeZones) {
                        let timezone = timeZones[i];
                        timezoneOptions.push(<option key={i} value={i}>{timezone}</option>);
                      }
                      return timezoneOptions;
                    })()}
                  </select>
                </td>
              </tr>
              <tr>
                <td>{lang.LANG}:</td>
                <td>
                  <select name='lang' value={state.lang} onChange={handleInput}>
                    {(()=>{
                      let languages = acpData.languages, languageOptions = [];
                      for (let i in languages) {
                        let language = languages[i];
                        languageOptions.push(<option key={i} value={language}>{language}</option>);
                      }
                      return languageOptions;
                    })()}
                  </select>
                </td>
              </tr>
              <tr>
                <td>{lang.DATE_FORMAT}:</td>
                <td>
                  <select name='dateformat' value={state.dateformat} onChange={handleInput}>
                    {(()=>{
                      let dateFormateList = acpData.dateFormates, formatOptions = [];
                      for (let i in dateFormateList) {
                        let format = dateFormateList[i];
                        formatOptions.push(<option key={i} value={i}>{format}</option>);
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
                <td><textarea name='filter_words' value={state.filter_words} onChange={handleInput} cols={20} rows={3}></textarea></td>
              </tr>
              <tr>
                <td>{lang.ENABLE_CAPTCHA}:</td>
                <td>
                  {(()=>{
                    let captchaInputs = [];
                    if (acpData.gd_loaded) {
                      captchaInputs.push(<label key="1"><input type="radio" value="1" checked={appConfig.valid_code_open == 1} onChange={toggleCaptcha} />{lang.YES}</label>);
                      captchaInputs.push(<label key="0"><input type="radio" value="0" checked={appConfig.valid_code_open != 1} onChange={toggleCaptcha} />{lang.NO}</label>);
                    } else {
                      captchaInputs.push(<label key="1"><input type="radio" value="1" onChange={toggleCaptcha} />{lang.YES}</label>);
                      captchaInputs.push(<label key="0"><input type="radio" value="0" checked={true} onChange={toggleCaptcha} />{lang.NO}{lang.GD_DISABLED_NOTICE}</label>);
                    }
                    return captchaInputs;
                  })()}
                </td>
              </tr>
              <tr>
                <td>{lang.ENABLE_PAGE}</td>
                <td>
                  <label><input type="radio" value="1" checked={appConfig.page_on == 1} onChange={togglePagination} />{lang.YES}</label>
                  <label><input type="radio" value="0" checked={appConfig.page_on != 1} onChange={togglePagination} />{lang.NO}</label>
                </td>
              </tr>
              <tr>
                  <td>{lang.POST_PERPAGE}:</td>
                  <td><input name='num_perpage' value={state.num_perpage} onChange={handleInput} type="text" />{lang.PAGINATION_TIP}</td>
              </tr>
              <tr>
                <td>{lang.FILTER_HTML_TAGS}:</td>
                <td>
                  <label><input type="radio" value="1" checked={appConfig.filter_type == 1} onChange={toggleFilterType} />{lang.STRIP_DISALLOWED_TAGS}</label>
                  <label><input type="radio" value="2" checked={appConfig.filter_type == 2} onChange={toggleFilterType} />{lang.ESCAPE_ALL_TAGS}</label>
                </td>
              </tr>
              <tr>
                <td>{lang.ALLOWED_HTML_TAGS}:</td>
                <td><input name='allowed_tags' value={state.allowed_tags} onChange={handleInput} type="text" /></td>
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
                <td><input type="password" name='password' value={state.password} onChange={handleInput} />&nbsp;{lang.PWD_TIP}</td>
              </tr>
            </tbody>
          </table>
        </fieldset>
        <input type="submit" value={lang.SUBMIT} /><input type="reset" value={lang.RESET} />
      </form>
    </div>
  );
}

export default ACPConfig;