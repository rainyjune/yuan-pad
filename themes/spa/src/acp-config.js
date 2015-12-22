var React = require('react');
var dataProvider = require('./dataProvider.js');
var LinkedStateMixin = require('react-addons-linked-state-mixin');

var ACPConfig = React.createClass({
  getInitialState() {
    return {
      board_name: '',
      site_close: 0,
      close_reason: '',
      admin_email: '',
      copyright_info: '',
      theme: 'spa',
      timezone: 0,
      lang: 'en',
      filter_words: '',
      valid_code_open: 0,
      page_on: 0,
      num_perpage: 10,
      filter_type: 1,
      allowed_tags: '',
      password: ''
    };
  },
  mixins: [LinkedStateMixin],
  componentWillReceiveProps(nextProps) {
    var propAppConfig = nextProps.appConfig;
    var computedState = {};
    for (var i in propAppConfig) {
      if (this.state.hasOwnProperty(i)) {
        computedState[i] = propAppConfig[i] === null ? 0 : propAppConfig[i];
      }
    }
//debugger;
    this.setState(computedState);
  },
  handleSubmit(e) {
    e.preventDefault();
    dataProvider.updateSiteConfig(this.state, res => {
      console.log('ACPConfig state:', this.state);
      if (res.statusCode === 200) {
        // TODO show friendly message.
        alert('OK');
        this.props.onConfigUpdated();
      } else {
        // TODO User friendly message.
        alert('failed');
      }
    }, function(){
      debugger;
    }.bind(this));
  },
  toggleSiteClose(e) {
    this.setState({site_close: e.target.value});
  },
  toggleCaptcha(e) {
    this.setState({valid_code_open: e.target.value});
  },
  togglePagination(e) {
    this.setState({page_on: e.target.value});
  },
  toggleFilterType(e) {
    this.setState({filter_type: e.target.value});
  },
  render() {
    var appConfig = this.state;
    var acpData = this.props.systemInformation;
    var lang = this.props.lang;
    var cssClass = this.props.activeTab === "siteset" ? "configContainer selectTag" : "configContainer";
    var isSiteClosed = appConfig.site_close;
    var themes = acpData.themes;
    var themeOptions = [];
    for (var i in themes) {
      var theme = themes[i];
      themeOptions.push(<option key={theme} value={theme}>{theme}</option>)
    }

    var timeZones = acpData.timezones;
    var timeZoneOptions = [];
    for (var i in timeZones) {
      var timezone = timeZones[i];
      timeZoneOptions.push(<option key={i} value={i}>{timezone}</option>);
    }

    var languages = acpData.languages;
    var languageOptions = [];
    for (var i in languages) {
      var language = languages[i];
      languageOptions.push(<option key={i} value={language}>{language}</option>);
    }
    
    var captchaInputs = [];
    if (acpData.gd_loaded) {
      captchaInputs.push(<label key="1"><input type="radio" value="1" checked={appConfig.valid_code_open == 1} onChange={this.toggleCaptcha} />{lang.YES}</label>);
      captchaInputs.push(<label key="0"><input type="radio" value="0" checked={appConfig.valid_code_open != 1} onChange={this.toggleCaptcha} />{lang.NO}</label>);
    } else {
      captchaInputs.push(<label key="1"><input type="radio" value="1" onChange={this.toggleCaptcha} />{lang.YES}</label>);
      captchaInputs.push(<label key="0"><input type="radio" value="0" checked='checked' onChange={this.toggleCaptcha} />{lang.NO}{lang.GD_DISABLED_NOTICE}</label>);
    }
    return (
      <div className={cssClass}>
        <form onSubmit={this.handleSubmit} action="index.php?controller=config&amp;action=update" method="post">
          <fieldset>
            <legend>{this.props.lang.SYS_CONF}</legend>
            <table>
              <tbody>
                <tr>
                  <td>{this.props.lang.BOARD_NAME}:</td>
                  <td><input ref="board_name" type="text" size="20" valueLink={this.linkState('board_name')} /></td>
                </tr>
                <tr>
                  <td>{this.props.lang.CLOSE_BOARD}:</td>
                  <td>
                    <input ref="site_close" type="radio" value="1" checked={appConfig.site_close == 1} onChange={this.toggleSiteClose} />{this.props.lang.YES}
                    <input ref="site_close" type="radio" value="0" checked={appConfig.site_close != 1} onChange={this.toggleSiteClose} />{this.props.lang.NO}
                  </td>
                </tr>
                <tr>
                  <td>{this.props.lang.CLOSE_REASON}:</td>
                  <td><textarea ref="close_reason" cols="30" rows="3" valueLink={this.linkState('close_reason')}></textarea></td>
                </tr>
                <tr>
                  <td>{this.props.lang.ADMIN_EMAIL}:</td>
                  <td><input ref="admin_email" type="text" size="20" valueLink={this.linkState('admin_email')} /></td>
                </tr>
                <tr>
                  <td>{this.props.lang.COPY_INFO}:</td>
                  <td><textarea ref="copyright_info" cols="30" rows="3" valueLink={this.linkState('copyright_info')} ></textarea></td>
                </tr>
                <tr>
                  <td>{this.props.lang.SYS_THEME}:</td>
                  <td>
                    <select ref="theme" valueLink={this.linkState('theme')}>
                      {themeOptions}
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>{this.props.lang.TIMEZONE}:</td>
                  <td>
                    <select ref="timezone" valueLink={this.linkState('timezone')}>
                      {timeZoneOptions}
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>{this.props.lang.LANG}:</td>
                  <td>
                    <select ref="lang" valueLink={this.linkState('lang')}>
                      {languageOptions}
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
          </fieldset>
          <fieldset>
            <legend>{this.props.lang.POST_CONF}</legend>
            <table>
              <tbody>
                <tr>
                  <td>{this.props.lang.FILTER_WORDS}：</td>
                  <td><textarea ref="filter_words" cols="20" rows="3" valueLink={this.linkState('filter_words')}></textarea></td>
                </tr>
                <tr>
                  <td>{this.props.lang.ENABLE_CAPTCHA}：</td>
                  <td>
                    {captchaInputs}
                  </td>
                </tr>
                <tr>
                  <td>{this.props.lang.ENABLE_PAGE}：</td>
                  <td>
                    <label><input ref="page_on" type="radio" value="1" checked={appConfig.page_on == 1} onChange={this.togglePagination} />{this.props.lang.YES}</label>
                    <label><input ref="page_on" type="radio" value="0" checked={appConfig.page_on != 1} onChange={this.togglePagination} />{this.props.lang.NO}</label>
                  </td>
                </tr>
                <tr>
                    <td>{this.props.lang.POST_PERPAGE}：</td>
                    <td><input ref="num_perpage" type="text" valueLink={this.linkState('num_perpage')} />{this.props.lang.PAGINATION_TIP}</td>
                </tr>
                <tr>
                  <td>{this.props.lang.FILTER_HTML_TAGS}：</td>
                  <td>
                    <label><input ref="filter_type" type="radio" value="1" checked={appConfig.filter_type == 1} onChange={this.toggleFilterType} />{this.props.lang.STRIP_DISALLOWED_TAGS}</label>
                    <label><input ref="filter_type" type="radio" value="2" checked={appConfig.filter_type == 2} onChange={this.toggleFilterType} />{this.props.lang.ESCAPE_ALL_TAGS}</label>
                  </td>
                </tr>
                <tr>
                  <td>{this.props.lang.ALLOWED_HTML_TAGS}：</td>
                  <td><input ref="allowed_tags" type="text" valueLink={this.linkState('allowed_tags')} /></td>
                </tr>
              </tbody>
            </table>
          </fieldset>
          <fieldset>
            <legend>{this.props.lang.ADMIN_CONF}</legend>
            <table>
              <tbody>
                <tr>
                  <td>{this.props.lang.CHANGE_PWD}:</td>
                  <td><input ref="password" type="password" valueLink={this.linkState('password')} />&nbsp;{this.props.lang.PWD_TIP}</td>
                </tr>
              </tbody>
            </table>
          </fieldset>
          <input type="submit" value={this.props.lang.SUBMIT} /><input type="reset" value={this.props.lang.RESET} />
        </form>
      </div>
    );
  }
});

module.exports = ACPConfig;