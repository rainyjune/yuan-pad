var React = require('react'),
    ReactDOM = require('react-dom');
var SearchBar = React.createClass({
  render: function() {
    return (
      <div className="searchbar">
        This is a search bar.
      </div>
    );
  }
});

module.exports = SearchBar;