import React from "react";

const historyData = [
  { id: 1, restaurant: "The Food Place", date: "2025-02-10" },
  { id: 2, restaurant: "Tasty Treats", date: "2025-02-12" },
  { id: 3, restaurant: "Gourmet Delight", date: "2025-02-15" },
];

const History = () => {
  return (
    <div className="p-6 max-w-2xl mx-auto bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">History</h2>
      <ul className="bg-white shadow-lg rounded-lg p-6">
        {historyData.map((item) => (
          <li 
            key={item.id} 
            className="border-b last:border-b-0 py-4 flex justify-between items-center text-gray-700 hover:bg-gray-50 transition-all rounded-lg px-4"
          >
            <span className="text-lg font-semibold text-blue-600">#{item.id}</span>
            <span className="text-lg">{item.restaurant}</span>
            <span className="text-sm text-gray-500">{item.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default History;
