import React from "react";

const ItemCard = ({ item }) => {
  // A fallback image in case the provided image is invalid or missing
  const fallbackImage = "path_to_default_image_or_placeholder.png"; 

  // Format the price as currency
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(item.price);

  // Format the carbon footprint (if available) to display in a readable way
  const formattedCarbonFootprint = item.carbon_footprint
    ? `${item.carbon_footprint.toFixed(2)} kg CO₂`
    : "Carbon footprint not available"; // Fallback if no carbon footprint data is available

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300">
      <img
        src={item.image || fallbackImage}
        alt={item.name || "Product Image"}
        className="w-full h-40 object-cover rounded-t-lg"
      />
      <h3 className="text-lg font-semibold text-gray-800 mt-4">{item.name}</h3>
      <p className="text-gray-600">{formattedPrice}</p>

      {/* Display Carbon Footprint */}
      <p className="text-gray-500 text-sm mt-2">Carbon Footprint: {formattedCarbonFootprint}</p>

      <a href={item.link} target="_blank" rel="noopener noreferrer">
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          View Item
        </button>
      </a>
    </div>
  );
};

export default ItemCard;
