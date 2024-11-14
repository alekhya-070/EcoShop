// src/pages/BulkOrders.js
import React, { useEffect, useState } from "react";
import ItemCard from "../components/ItemCard"; // Adjust the path if necessary
import { fetchAllProducts } from '../apiService'; // Adjust the path if necessary

const BulkOrders = () => {
  const [bulkOrderItems, setBulkOrderItems] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchAllProducts();
        setBulkOrderItems(data.bulkOrderItems || []); // Adjust the key based on your data structure
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Bulk Orders</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {bulkOrderItems.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default BulkOrders;
