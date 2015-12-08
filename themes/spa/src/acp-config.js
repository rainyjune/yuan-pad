var React = require('react');

var ACPConfig = React.createClass({
  render: function() {
    var cssClass = this.props.activeTab === "siteset" ? "configContainer selectTag" : "configContainer";
    var isSiteClosed = this.props.appConfig.site_close;
debugger;
    return (
      <div className={cssClass}>
        <form action="index.php?controller=config&amp;action=update" method="post">
          <fieldset>
            <legend>{this.props.lang.SYS_CONF}</legend>
            <table>
            <tbody>
              <tr>
                <td>{this.props.lang.BOARD_NAME}:</td>
                <td><input name="board_name" type="text" size="20" value={this.props.appConfig.board_name} /></td>
              </tr>
              <tr>
                <td>{this.props.lang.CLOSE_BOARD}:</td>
                <td>
                  <input name="site_close" type="radio" value="1" checked='checked' />{this.props.lang.YES}
                  <input name="site_close" type="radio" value="0" checked='checked' />{this.props.lang.NO}
                </td>
              </tr>
          <tr>
              <td>{this.props.lang.CLOSE_REASON}:</td>
              <td><textarea  class="span-9" name="close_reason" cols="30" rows="3" value={this.props.appConfig.close_reason}></textarea></td>
          </tr>
          <tr>
              <td>{this.props.lang.ADMIN_EMAIL}:</td>
              <td><input name="admin_email" type="text" size="20" value={this.props.appConfig.admin_email} /></td>
          </tr>
          <tr>
              <td>{this.props.lang.COPY_INFO}:</td>
              <td><textarea class="span-9" name="copyright_info" cols="30" rows="3" value={this.props.appConfig.copyright_info} ></textarea></td>
          </tr>
          <tr>
              <td>{this.props.lang.SYS_THEME}:</td>
              <td>
                <select name="theme" value={this.props.appConfig.theme}>
                  <option value="">$per_theme</option>
                </select>
              </td>
          </tr>
          <tr>
              <td>{this.props.lang.TIMEZONE}:</td>
              <td>
                <select name="timezone" value={this.props.appConfig.timezone}>
                  <option value="">$per_timezone</option>
                </select>
              </td>
          </tr>
          <tr>
              <td>{this.props.lang.LANG}:</td>
              <td>
                <select name="lang" value={this.props.appConfig.lang}>
                  <option value="">$language</option>
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
              <td><textarea class="span-9" name="filter_words" cols="20" rows="3" value={this.props.appConfig.filter_words}></textarea></td>
          </tr>
          <tr>
              <td>{this.props.lang.ENABLE_CAPTCHA}：</td>
              <td>
                  <input name="valid_code_open" type="radio" value="1" checked='checked' />{this.props.lang.YES}
                  <input name="valid_code_open" type="radio" value="0" checked='checked' />{this.props.lang.NO}
                  <input name="valid_code_open" type="radio" value="1" />{this.props.lang.YES}
                  <input name="valid_code_open" type="radio" value="0" checked='checked' />{this.props.lang.NO}{this.props.lang.GD_DISABLED_NOTICE}
              </td>
          </tr>
          <tr>
              <td>{this.props.lang.ENABLE_PAGE}：</td>
              <td><input name="page_on" type="radio" value="1" checked='checked' />{this.props.lang.YES}
              <input name="page_on" type="radio" value="0" checked='checked' />{this.props.lang.NO}
              </td>
          </tr>
          <tr>
              <td>{this.props.lang.POST_PERPAGE}：</td>
              <td><input name="num_perpage" type="text" value={this.props.appConfig.num_perpage} />{this.props.lang.PAGINATION_TIP}</td>
          </tr>
                <tr>
              <td>{this.props.lang.FILTER_HTML_TAGS}：</td>
              <td><input name="filter_type" type="radio" value="1" checked='checked' />{this.props.lang.STRIP_DISALLOWED_TAGS}
<input name="filter_type" type="radio" value="2" checked='checked' />{this.props.lang.ESCAPE_ALL_TAGS}</td>
          </tr>
                <tr>
              <td>{this.props.lang.ALLOWED_HTML_TAGS}：</td>
              <td><input name="allowed_tags" type="text" value={this.props.appConfig.allowed_tags} /></td>
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
              <td><input name="password" type="password" />&nbsp;{this.props.lang.PWD_TIP}</td>
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