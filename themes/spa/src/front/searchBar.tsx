import { useState, FormEvent } from 'react';
import { SearchBarProps } from '../common/types';

function SearchBar({ onSubmit }: SearchBarProps) {
  const [searchText, setSearchText] = useState(''); // The search keyword
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(searchText);
  };
  return (
    <div className="searchbar">
      <form onSubmit={handleSubmit} className="form-inline">
        <div className="form-group">
          <label className="sr-only" htmlFor="inputSearch">
            Search
          </label>
          <input
            id="inputSearch"
            type="text"
            size={10}
            placeholder="Search"
            value={searchText}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setSearchText(e.target.value);
            }}
            className="form-control"
          />
        </div>
        <button type="button" className="btn btn-default btn-sm" aria-label="Submit" onClick={handleSubmit}>
          <span className="glyphicon glyphicon-search" aria-hidden="true"></span>
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
