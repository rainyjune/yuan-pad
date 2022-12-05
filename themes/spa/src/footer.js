let React = require('react');
const createReactClass = require('create-react-class');

let AppFooter = createReactClass({
  ACPMarkup() {
    let ACP = (this.props.user && this.props.user.user_type === "admin") ? 
              "<a href='index.php?action=control_panel'>"+ this.props.lang.ACP+"</a>" 
              : '';
    return {
      __html: ACP
    };
  },
  render() {
    return (
      <footer>
        <p>
          {this.props.appConfig.copyright_info}&nbsp;
          <a href={"mailto:" + this.props.appConfig.admin_email}>{this.props.lang.ADMIN_EMAIL}</a>&nbsp;
          <span dangerouslySetInnerHTML={this.ACPMarkup()}></span>
        </p>
        <p>
          Powered by <a href="https://github.com/rainyjune/yuan-pad" target="_blank" title="Find More">YuanPad</a>&nbsp;
          <a href="index.php?action=rss"><img src="misc/images/rss-icon.png" alt="rss" /></a>
        </p>
      </footer>
    );
  }
});

module.exports = AppFooter;