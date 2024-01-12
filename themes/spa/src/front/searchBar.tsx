function SearchBar(props: {
  onSubmit: (s: React.FormEvent) => void;
  onUserInput: (s: React.ChangeEvent<HTMLInputElement>) => void;
  searchText: string;
}) {
  return (
    <div className="searchbar">
      <form onSubmit={props.onSubmit} className="form-inline">
        <div className="form-group">
          <label className="sr-only" htmlFor="inputSearch">
            Search
          </label>
          <input
            id="inputSearch"
            type="text"
            size={10}
            placeholder="Search"
            value={props.searchText}
            onChange={props.onUserInput}
            className="form-control"
          />
        </div>
        <button type="button" className="btn btn-default btn-sm" aria-label="Submit" onClick={props.onSubmit}>
          <span className="glyphicon glyphicon-search" aria-hidden="true"></span>
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
