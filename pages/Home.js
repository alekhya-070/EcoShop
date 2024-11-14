import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import ItemCard from "../components/ItemCard";

const Home = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [products, setProducts] = useState([]); // To hold the fetched products
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch product data from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/products'); // Adjust this endpoint as needed
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
        setLoading(false); // Set loading to false after fetching
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false); // Set loading to false even if there's an error
      }
    };

    fetchProducts();
  }, []); // Empty dependency array to run once on mount

  return (
    <div className="container mx-auto px-4 py-8">
      <SearchBar setSearchResults={setSearchResults} />
      <div className="mt-8">
        {loading ? (
          <p>Loading products...</p> // Loading message
        ) : searchResults.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {searchResults.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 12).map((item) => ( // Display first 12 products
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
};

export default Home;  