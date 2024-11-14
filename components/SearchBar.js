import { useState } from "react";

const SearchBar = () => {
  const [searchText, setSearchText] = useState("");
  const [image, setImage] = useState(null);
  const [searchResults, setSearchResults] = useState([]);  // Declare state for search results

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSearch = async () => {
    if (!searchText && !image) {
      alert("Please enter text or upload an image to search.");
      return;
    }

    try {
      let response;

      // If an image is uploaded, send both text and image as FormData
      if (image) {
        const formData = new FormData();
        formData.append("text", searchText);
        formData.append("image", image);

        response = await fetch('http://127.0.0.1:5000/search', {
          method: 'POST',
          body: formData,
        });
      } else {
        // If only text is provided, send the text in JSON format
        response = await fetch('http://127.0.0.1:5000/search', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: searchText }),
        });
      }

      if (!response.ok) {
        throw new Error("Search request failed");
      }

      const data = await response.json();
      setSearchResults(data);  // Update the local search results state
    } catch (error) {
      console.error("Error during search:", error);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 mb-4">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search for products..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="border p-2 rounded w-64"
      />
      
      {/* Image Upload */}
      <label htmlFor="image-upload" className="cursor-pointer bg-gray-200 p-2 rounded">
        {image ? "Image selected" : "Upload Image"}
      </label>
      <input
        id="image-upload"
        type="file"
        onChange={handleImageChange}
        className="hidden"
      />
      
      {/* Search Button */}
      <button
        onClick={handleSearch}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Search
      </button>

      {/* Display Search Results */}
      <div className="mt-4 w-full max-w-4xl">
        {searchResults.length > 0 ? (
          searchResults.map((product) => (
            <div key={product.id} className="flex items-center space-x-4 mb-4 p-4 border border-gray-300 rounded-lg">
              {/* Product Image */}
              <img
                src={product.image}
                alt={product.name}
                className="w-32 h-32 object-cover rounded-md"
              />
              
              {/* Product Info */}
              <div className="flex flex-col">
                <h2 className="font-bold text-xl">{product.name}</h2>
                <p>Price: ${product.price}</p>
                <p>Carbon Footprint: {product.carbon_footprint} g CO2</p>
                <a href={product.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  View Product
                </a>
              </div>
            </div>
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
