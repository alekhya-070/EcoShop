// src/pages/Jewelry.js
import React, { useEffect, useState } from "react";
import ItemCard from "../components/ItemCard";
import { fetchJewelryProducts } from "../apiService";

const Jewelry = () => {
  const [jewelryItems, setJewelryItems] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchJewelryProducts();
        setJewelryItems(data);
      } catch (error) {
        console.error("Error fetching jewelry products:", error);
      }
    };

    getData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Jewelry Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {jewelryItems.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Jewelry;
