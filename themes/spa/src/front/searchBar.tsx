import { FormEvent, useRef } from 'react';

function SearchBar(props: any) {
  const keywordRef = useRef<HTMLInputElement>(null);
  function handleSearch(e: FormEvent) {
    e.preventDefault();
    let keyword = keywordRef.current?.value.trim();
    if (!keyword) return;
    props.onSubmit(keyword);
    return false;
  }
  function handleChange() {
    props.onUserInput(keywordRef.current?.value.trim());
  }
  return (
    <div className="searchbar">
      <form onSubmit={handleSearch} className="form-inline">
        <div className="form-group">
          <label className="sr-only" htmlFor="inputSearch">
            Search
          </label>
          <input
            id="inputSearch"
            type="text"
            size={10}
            placeholder="Search"
            ref={keywordRef}
            value={props.searchText}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <button type="button" className="btn btn-default btn-sm" aria-label="Submit" onClick={handleSearch}>
          <span className="glyphicon glyphicon-search" aria-hidden="true"></span>
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
