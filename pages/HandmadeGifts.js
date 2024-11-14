import React, { useEffect, useState } from "react";
import ItemCard from "../components/ItemCard";
import { fetchHandmadeGifts } from "../apiService";

const HandmadeGifts = () => {
  const [handmadeGiftItems, setHandmadeGiftItems] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchHandmadeGifts();
        setHandmadeGiftItems(data);
      } catch (error) {
        console.error("Error fetching handmade gift products:", error);
      }
    };

    getData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Handmade Gifts</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {handmadeGiftItems.map((item) => (
          <ItemCard key={item.id} item={item} carbonFootprint={item.carbon_footprint} />
        ))}
      </div>
    </div>
  );
};

export default HandmadeGifts;
