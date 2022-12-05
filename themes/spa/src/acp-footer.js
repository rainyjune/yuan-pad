let React = require('react');
const createReactClass = require('create-react-class');

let ACPFooter = createReactClass({
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