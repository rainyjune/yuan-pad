var React = require('react'),
    ReactDOM = require('react-dom');
var SearchBar = React.createClass({
  handleSearch: function(e) {
    e.preventDefault();
    var keyword = this.refs.s.value.trim();
    if (!keyword) return ;
    this.props.onSubmit(keyword);
    return false;
  },
  render: function() {
    return (
      <div className="searchbar">
        <form action="index.php?controller=search" method="post" onSubmit={this.handleSearch}>
          <input type="text" size="10" placeholder="Search" ref="s" />
          <input type="image" src="misc/images/search.gif" alt="Search" ref="searchImg" />
        </form>
      </div>
    );
  }
});

module.exports = SearchBar;