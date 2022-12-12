import React from 'react';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }
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
        <form onSubmit={this.handleSearch} className="form-inline">
          <div className="form-group">
            <label className="sr-only" htmlFor="inputSearch">Search</label>
            <input
              id="inputSearch"
              type="text" 
              size="10" 
              placeholder="Search" 
              ref="s" 
              value={this.props.searchText}
              onChange={this.handleChange}
              className="form-control" 
            />
          </div>
          <button type="button" className="btn btn-default btn-sm" aria-label="Submit" onClick={this.handleSearch}>
            <span className="glyphicon glyphicon-search" aria-hidden="true"></span>
          </button>
        </form>
      </div>
    );
  }
}

export default SearchBar;