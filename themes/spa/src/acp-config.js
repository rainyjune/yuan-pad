import React from 'react';
import dataProvider from './dataProvider.js';

class ACPConfig extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleSiteClose = this.toggleSiteClose.bind(this);
    this.toggleCaptcha = this.toggleCaptcha.bind(this);
    this.togglePagination = this.togglePagination.bind(this);
    this.toggleFilterType = this.toggleFilterType.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    let propAppConfig = nextProps.appConfig;
    let computedState = {};
    for (let i in propAppConfig) {
      if (this.state.hasOwnProperty(i)) {
        computedState[i] = propAppConfig[i] === null ? 0 : propAppConfig[i];
      }
    }
    this.setState(computedState);
  }
  handleSubmit(e) {
    e.preventDefault();
    dataProvider.updateSiteConfig(this.state, res => {
      console.log('ACPConfig state:', this.state);
      if (res.statusCode === 200) {
        // TODO show friendly message.
        alert('OK');
        this.setState({password: ''});// Empty the password input value.
        this.props.onConfigUpdated();
      } else {
        // TODO User friendly message.
        alert('failed');
      }
    });
  }
  toggleSiteClose(e) {
    this.setState({site_close: e.target.value});
  }
  toggleCaptcha(e) {
    this.setState({valid_code_open: e.target.value});
  }
  togglePagination(e) {
    this.setState({page_on: e.target.value});
  }
  toggleFilterType(e) {
    this.setState({filter_type: e.target.value});
  }
  handleInput(e) {
    const target = e.target;
    this.setState({
      [target.name]: target.value.trim()
    });
  }
  render() {
    let appConfig = this.state,
        props = this.props,
        acpData = props.systemInformation,
        lang = props.lang;

    return (
      <div className={props.activeTab === "siteset" ? "configContainer selectTag" : "configContainer"}>
        <form onSubmit={this.handleSubmit} action="index.php?controller=config&amp;action=update" method="post">
          <fieldset>
            <legend>{lang.SYS_CONF}</legend>
            <table className="table">
              <tbody>
                <tr>
                  <td>{lang.BOARD_NAME}:</td>
                  <td><input ref="board_name" name='board_name' type="text" size="20" value={this.state.board_name} onChange={this.handleInput} /></td>
                </tr>
                <tr>
                  <td>{lang.CLOSE_BOARD}:</td>
                  <td>
                    <input ref="site_close" type="radio" value="1" checked={appConfig.site_close == 1} onChange={this.toggleSiteClose} />{lang.YES}
                    <input ref="site_close" type="radio" value="0" checked={appConfig.site_close != 1} onChange={this.toggleSiteClose} />{lang.NO}
                  </td>
                </tr>
                <tr>
                  <td>{lang.CLOSE_REASON}:</td>
                  <td><textarea ref="close_reason" name='close_reason' value={appConfig.close_reason} onChange={this.handleInput} cols="30" rows="3"></textarea></td>
                </tr>
                <tr>
                  <td>{lang.ADMIN_EMAIL}:</td>
                  <td><input ref="admin_email" name='admin_email' value={appConfig.admin_email} type="text" size="20" onChange={this.handleInput} /></td>
                </tr>
                <tr>
                  <td>{lang.COPY_INFO}:</td>
                  <td><textarea ref="copyright_info" name='copyright_info' value={appConfig.copyright_info} cols="30" rows="3" onChange={this.handleInput} ></textarea></td>
                </tr>
                <tr>
                  <td>{lang.SYS_THEME}:</td>
                  <td>
                    <select ref="theme" name='theme' value={this.state.theme} onChange={this.handleInput}>
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
                    <select ref="timezone" name='timezone' value={this.state.timezone} onChange={this.handleInput}>
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
                    <select ref="lang" name='lang' value={this.state.lang} onChange={this.handleInput}>
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
                    <select ref="dateformat" name='dateformat' value={this.state.dateformat} onChange={this.handleInput}>
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
                  <td>{lang.FILTER_WORDS}：</td>
                  <td><textarea ref="filter_words" name='filter_words' value={this.state.filter_words} onChange={this.handleInput} cols="20" rows="3"></textarea></td>
                </tr>
                <tr>
                  <td>{lang.ENABLE_CAPTCHA}：</td>
                  <td>
                    {(()=>{
                      let captchaInputs = [];
                      if (acpData.gd_loaded) {
                        captchaInputs.push(<label key="1"><input type="radio" value="1" checked={appConfig.valid_code_open == 1} onChange={this.toggleCaptcha} />{lang.YES}</label>);
                        captchaInputs.push(<label key="0"><input type="radio" value="0" checked={appConfig.valid_code_open != 1} onChange={this.toggleCaptcha} />{lang.NO}</label>);
                      } else {
                        captchaInputs.push(<label key="1"><input type="radio" value="1" onChange={this.toggleCaptcha} />{lang.YES}</label>);
                        captchaInputs.push(<label key="0"><input type="radio" value="0" checked='checked' onChange={this.toggleCaptcha} />{lang.NO}{lang.GD_DISABLED_NOTICE}</label>);
                      }
                      return captchaInputs;
                    })()}
                  </td>
                </tr>
                <tr>
                  <td>{lang.ENABLE_PAGE}</td>
                  <td>
                    <label><input ref="page_on" type="radio" value="1" checked={appConfig.page_on == 1} onChange={this.togglePagination} />{lang.YES}</label>
                    <label><input ref="page_on" type="radio" value="0" checked={appConfig.page_on != 1} onChange={this.togglePagination} />{lang.NO}</label>
                  </td>
                </tr>
                <tr>
                    <td>{lang.POST_PERPAGE}：</td>
                    <td><input ref="num_perpage" name='num_perpage' value={this.state.num_perpage} onChange={this.handleInput} type="text" />{lang.PAGINATION_TIP}</td>
                </tr>
                <tr>
                  <td>{lang.FILTER_HTML_TAGS}：</td>
                  <td>
                    <label><input ref="filter_type" type="radio" value="1" checked={appConfig.filter_type == 1} onChange={this.toggleFilterType} />{lang.STRIP_DISALLOWED_TAGS}</label>
                    <label><input ref="filter_type" type="radio" value="2" checked={appConfig.filter_type == 2} onChange={this.toggleFilterType} />{lang.ESCAPE_ALL_TAGS}</label>
                  </td>
                </tr>
                <tr>
                  <td>{lang.ALLOWED_HTML_TAGS}：</td>
                  <td><input ref="allowed_tags" name='allowed_tags' value={this.state.allowed_tags} onChange={this.handleInput} type="text" /></td>
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
                  <td><input ref="password" type="password" name='password' value={this.state.password} onChange={this.handleInput} />&nbsp;{lang.PWD_TIP}</td>
                </tr>
              </tbody>
            </table>
          </fieldset>
          <input type="submit" value={lang.SUBMIT} /><input type="reset" value={lang.RESET} />
        </form>
      </div>
    );
  }
}

export default ACPConfig;