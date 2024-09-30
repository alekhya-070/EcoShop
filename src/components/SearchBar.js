import React, { useState } from "react";
import data from "../data";

const SearchBar = ({ setSearchResults }) => {
  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
    const results = [];
    Object.keys(data).forEach((category) => {
      results.push(
        ...data[category].filter((item) =>
          item.name.toLowerCase().includes(searchText.toLowerCase())
        )
      );
    });
    setSearchResults(results);
  };

  return (
    <div className="mb-8">
      <input
        type="text"
        placeholder="Search items..."
        className="border border-gray-300 rounded-lg px-4 py-2 w-full"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <button
        onClick={handleSearch}
        className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
