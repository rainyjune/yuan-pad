var React = require('react');
var dataProvider = require('./dataProvider.js');

var ACPOverview = React.createClass({
  getInitialState: function() {
    return {
      commentsTotal: 0,
      repliesTotal: 0,
      appVersion: '',
      phpVersion: '',
      gdVersion: '',
      registerGlobals: '',
      magicQuotesGPC: '',
      zipSupport: ''
    };
  },
  componentDidMount: function() {
    dataProvider.getAppOverviewInfo(function(res){
      if (res.statusCode !== 200) {
        return ;
      }
      this.setState(res.response);
    }.bind(this));
  },
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
              <td >{this.props.lang.NUM_POSTS}：</td><td align="right">{this.state.commentsTotal}</td>
            </tr>
            <tr>
              <td >{this.props.lang.NUM_REPLY}：</td><td align="right">{this.state.repliesTotal}</td>
            </tr>
            <tr>
              <td >{this.props.lang.MP_VERSION}：</td><td align="right">{this.state.appVersion}</td>
            </tr>
            <tr>
              <td  colSpan="2"><b>{this.props.lang.SYS_INFO}</b></td>
            </tr>
            <tr>
              <td >{this.props.lang.PHP_VERSION}：</td><td align="right">{this.state.phpVersion}</td>
            </tr>
            <tr>
              <td >{this.props.lang.GD_VERSION}： </td><td align="right">{this.state.gdVersion}</td>
            </tr>
            <tr>
              <td >Register_Globals：</td><td align="right">{this.state.registerGlobals}</td>
            </tr>
            <tr>
              <td >Magic_Quotes_Gpc：</td><td align="right">{this.state.magicQuotesGPC}</td>
            </tr>
            <tr>
              <td >ZipArchive：</td><td align="right">{this.state.zipSupport}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
});

module.exports = ACPOverview;