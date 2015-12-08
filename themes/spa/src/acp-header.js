var React = require('react');
var dataProvider = require('./dataProvider.js');

var ACPHeader = React.createClass({
  handleSignOut: function(e) {
    e.preventDefault();
    dataProvider.logout(function(){
      this.props.onUserLogout();
    }.bind(this));
  },
  render: function() {
    return (
      <header>
        <a href="index.php">{this.props.lang.HOME}</a>&nbsp;
        <a href="#" onClick={this.handleSignOut}>{this.props.lang.LOGOUT}</a>
      </header>
    );
  }
});

module.exports = ACPHeader;