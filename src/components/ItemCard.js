import React from "react";

const ItemCard = ({ item }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300">
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-40 object-cover rounded-t-lg"
      />
      <h3 className="text-lg font-semibold text-gray-800 mt-4">{item.name}</h3>
      <p className="text-gray-600">${item.price}</p>
      <a href={item.link} target="_blank" rel="noopener noreferrer">
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          View Item
        </button>
      </a>
    </div>
  );
};

export default ItemCard;
