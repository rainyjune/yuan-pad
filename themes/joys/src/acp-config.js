let React = require('react');
let dataProvider = require('./dataProvider.js');
//let LinkedStateMixin = require('react-addons-linked-state-mixin');

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
    this.handleChange = this.handleChange.bind(this);
  }
  //mixins: [LinkedStateMixin],
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
  handleSubmit = (e) => {
    debugger;
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
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
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
                  <td><input name="board_name" type="text" size="20" value={this.state.board_name} onChange={this.handleChange} /></td>
                </tr>
                <tr>
                  <td>{lang.CLOSE_BOARD}:</td>
                  <td>
                    <input name="site_close" type="radio" value="1" checked={appConfig.site_close == 1} onChange={this.handleChange} />{lang.YES}
                    <input name="site_close" type="radio" value="0" checked={appConfig.site_close != 1} onChange={this.handleChange} />{lang.NO}
                  </td>
                </tr>
                <tr>
                  <td>{lang.CLOSE_REASON}:</td>
                  <td><textarea name="close_reason" cols="30" rows="3" value={this.state.close_reason} onChange={this.handleChange} ></textarea></td>
                </tr>
                <tr>
                  <td>{lang.ADMIN_EMAIL}:</td>
                  <td><input name="admin_email" type="text" size="20" value={this.state.admin_email} onChange={this.handleChange}  /></td>
                </tr>
                <tr>
                  <td>{lang.COPY_INFO}:</td>
                  <td><textarea name="copyright_info" cols="30" rows="3" value={this.state.copyright_info} onChange={this.handleChange} ></textarea></td>
                </tr>
                <tr>
                  <td>{lang.SYS_THEME}:</td>
                  <td>
                    <select name="theme" value={this.state.theme} onChange={this.handleChange}>
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
                    <select name="timezone" value={this.state.timezone} onChange={this.handleChange}>
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
                    <select name="lang" value={this.state.lang} onChange={this.handleChange}>
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
                    <select name="dateformat" value={this.state.dateformat} onChange={this.handleChange}>
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
                  <td><textarea name="filter_words" cols="20" rows="3" value={this.state.filter_words} onChange={this.handleChange}></textarea></td>
                </tr>
                <tr>
                  <td>{lang.ENABLE_CAPTCHA}：</td>
                  <td>
                    {(()=>{
                      let captchaInputs = [];
                      if (acpData.gd_loaded) {
                        captchaInputs.push(<label key="1"><input name="valid_code_open" type="radio" value="1" defaultChecked={appConfig.valid_code_open == 1} onChange={this.handleChange} />{lang.YES}</label>);
                        captchaInputs.push(<label key="0"><input name="valid_code_open" type="radio" value="0" defaultChecked={appConfig.valid_code_open != 1} onChange={this.handleChange} />{lang.NO}</label>);
                      } else {
                        captchaInputs.push(<label key="1"><input name="valid_code_open" type="radio" value="1" onChange={this.handleChange} />{lang.YES}</label>);
                        captchaInputs.push(<label key="0"><input name="valid_code_open" type="radio" value="0" defaultChecked={true} onChange={this.handleChange} />{lang.NO}{lang.GD_DISABLED_NOTICE}</label>);
                      }
                      return captchaInputs;
                    })()}
                  </td>
                </tr>
                <tr>
                  <td>{lang.ENABLE_PAGE}</td>
                  <td>
                    <label><input name="page_on" type="radio" value="1" defaultChecked={appConfig.page_on == 1} onChange={this.togglePagination} />{lang.YES}</label>
                    <label><input name="page_on" type="radio" value="0" defaultChecked={appConfig.page_on != 1} onChange={this.togglePagination} />{lang.NO}</label>
                  </td>
                </tr>
                <tr>
                    <td>{lang.POST_PERPAGE}：</td>
                    <td><input name="num_perpage" type="text" value={this.state.num_perpage} onChange={this.handleChange} />{lang.PAGINATION_TIP}</td>
                </tr>
                <tr>
                  <td>{lang.FILTER_HTML_TAGS}：</td>
                  <td>
                    <label><input name="filter_type" type="radio" value="1" defaultChecked={appConfig.filter_type == 1} onChange={this.handleChange} />{lang.STRIP_DISALLOWED_TAGS}</label>
                    <label><input name="filter_type" type="radio" value="2" defaultChecked={appConfig.filter_type == 2} onChange={this.handleChange} />{lang.ESCAPE_ALL_TAGS}</label>
                  </td>
                </tr>
                <tr>
                  <td>{lang.ALLOWED_HTML_TAGS}：</td>
                  <td><input name="allowed_tags" type="text" value={this.state.allowed_tags} onChange={this.handleChange}  /></td>
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
                  <td><input name="password" type="password" value={this.state.password} onChange={this.handleChange}  />&nbsp;{lang.PWD_TIP}</td>
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

module.exports = ACPConfig;