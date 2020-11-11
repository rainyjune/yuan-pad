let React = require('react');

class SearchBar extends React.Component {
  handleSearch(e) {
    e.preventDefault();
    let keyword = this.refs.s.value.trim();
    if (!keyword) return ;
    this.props.onSubmit(keyword);
    return false;
  }
  handleChange() {
    this.props.onUserInput(this.refs.s.value.trim());
  }
  render() {
    return (
      <div className="searchbar">
        <form onSubmit={this.handleSearch.bind(this)} className="form-inline">
          <div className="form-group">
            <label className="sr-only" htmlFor="inputSearch">Search</label>
            <input
              id="inputSearch"
              type="text" 
              size="10" 
              placeholder="Search" 
              ref="s" 
              value={this.props.searchText}
              onChange={this.handleChange.bind(this)}
              className="form-control" 
            />
            <input type="submit" />
          </div>
        </form>
      </div>
    );
  }
};

module.exports = SearchBar;