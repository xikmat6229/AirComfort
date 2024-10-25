import React, { useState } from "react";
import './Search.css';

function Search({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch(query);  // Qidiruv so'zini ota komponentga yuborish
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();  // Enter bosilganda qidiruvni bajarish
    }
  };

  return (
    <div className='Search-form'>
      <input
        type="text"
        placeholder='Search something'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button onClick={handleSearch}>
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>
    </div>
  );
}

export default Search;
