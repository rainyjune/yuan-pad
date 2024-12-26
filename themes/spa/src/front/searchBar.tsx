import { useState, FormEvent } from 'react';
import { SearchBarProps } from '../common/types';

function SearchBar({ onSubmit }: SearchBarProps) {
  const [searchText, setSearchText] = useState(''); // The search keyword
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(searchText);
  };
  return (
    <form onSubmit={handleSubmit} className="flex w-full">
      <label className="hidden" htmlFor="inputSearch">
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
        className="w-full"
      />
    </form>
  );
}

export default SearchBar;
