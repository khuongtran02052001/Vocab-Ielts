
import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSearch} className="mb-6">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search for vocabulary words..."
          className="w-full pl-10 pr-4 py-3 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="submit"
          className="absolute inset-y-0 right-0 px-4 text-white bg-primary-600 rounded-r-lg hover:bg-primary-700"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
