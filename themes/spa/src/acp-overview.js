var React = require('react');

var ACPOverview = React.createClass({
  render: function() {
    var cssClass = this.props.activeTab === "overview" ? "selectTag" : "";
    return (
      <div className={cssClass}>
        <table>
          <tbody>
            <tr>
              <td><h1>{this.props.lang.WELCOME_SYS}</h1></td>
            </tr>
            <tr>
              <td>{this.props.lang.THANKS}</td>
            </tr>
          </tbody>
        </table>
        <table>
          <tbody>
            <tr>
              <td colSpan="2" ><b>{this.props.lang.STATS_INFO}</b></td>
            </tr>
            <tr>
              <td >{this.props.lang.NUM_POSTS}：</td><td align="right">{this.props.acpData.nums}</td>
            </tr>
            <tr>
              <td >{this.props.lang.NUM_REPLY}：</td><td align="right">{this.props.acpData.reply_num}</td>
            </tr>
            <tr>
              <td >{this.props.lang.MP_VERSION}：</td><td align="right">{this.props.acpData.yuanpad_version}</td>
            </tr>
            <tr>
              <td  colSpan="2"><b>{this.props.lang.SYS_INFO}</b></td>
            </tr>
            <tr>
              <td >{this.props.lang.PHP_VERSION}：</td><td align="right">{this.props.acpData.php_version}</td>
            </tr>
            <tr>
              <td >{this.props.lang.GD_VERSION}： </td><td align="right">{this.props.acpData.gd_version}</td>
            </tr>
            <tr>
              <td >Register_Globals：</td><td align="right">{this.props.acpData.register_globals}</td>
            </tr>
            <tr>
              <td >Magic_Quotes_Gpc：</td><td align="right">{this.props.acpData.magic_quotes_gpc}</td>
            </tr>
            <tr>
              <td >ZipArchive：</td><td align="right">{this.props.acpData.zip_support}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
});

module.exports = ACPOverview;