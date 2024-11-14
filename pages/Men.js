// src/pages/Men.js
import React, { useEffect, useState } from "react";
import ItemCard from "../components/ItemCard";
import { fetchMenProducts } from "../apiService";

const Men = () => {
  const [menItems, setMenItems] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchMenProducts();
        setMenItems(data);
      } catch (error) {
        console.error("Error fetching men products:", error);
      }
    };

    getData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Men Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {menItems.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Men;
