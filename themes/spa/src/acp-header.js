var React = require('react');
var dataProvider = require('./dataProvider.js');

var ACPHeader = React.createClass({
  handleSignOut: function(e) {
    e.preventDefault();
    dataProvider.signOut(function(response){
      if (response.statusCode === 200) {
        this.props.onUserLogout();
      } else {
        alert(response.statusText);
      }
    }.bind(this));
  },
  render: function() {
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