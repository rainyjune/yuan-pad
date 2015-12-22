let React = require('react'),
    dataProvider = require('./dataProvider.js');

let ACPHeader = React.createClass({
  handleSignOut(e) {
    e.preventDefault();
    dataProvider.signOut(response => {
      if (response.statusCode === 200) {
        this.props.onUserLogout();
      } else {
        alert(response.statusText);
      }
    });
  },
  render() {
    if (this.props.user.user_type !== "admin") return null;
    return (
      <header>
        <a href="index.php">{this.props.lang.HOME}</a>&nbsp;
        <a href="#" onClick={this.handleSignOut}>{this.props.lang.LOGOUT}</a>
      </header>
    );
  }
});

module.exports = ACPHeader;