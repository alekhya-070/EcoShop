import { useState } from "react";
import SearchBar from "../components/SearchBar";
import ItemCard from "../components/ItemCard";
import data from "../data";

const Home = () => {
  const [searchResults, setSearchResults] = useState([]);

  return (
    <div className="container mx-auto px-4 py-8">
      <SearchBar setSearchResults={setSearchResults} />
      <div className="mt-8">
        {searchResults.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {searchResults.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          Object.keys(data).map((category) => (
            <div key={category} className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 capitalize">
                {category}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {data[category].slice(0, 3).map((item) => (
                  <ItemCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
