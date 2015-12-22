var React = require('react');

var ACPFooter = React.createClass({
  render() {
    if (this.props.user.user_type !== "admin") return null;
    return (
      <footer>
        <p>
          Powered by <a href="https://github.com/rainyjune/yuan-pad">YuanPad</a>
        </p>
      </footer>
    );
  }
});

module.exports = ACPFooter;