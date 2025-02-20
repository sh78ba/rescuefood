import React, { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_PATH } from "../configs/routesconfig";

const History = () => {
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const email = localStorage.getItem("email"); // Assuming user email is stored in localStorage
        if (!email) {
          alert("User email not found!");
          return;
        }

        const response = await axios.post(`${BACKEND_PATH}/rescuefood/api/v1/volunteer/history`, {
          email,
        });

        setHistoryData(response.data.history || []);
      } catch (error) {
        console.error("Error fetching history:", error);
        alert("Failed to fetch history.");
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="p-6 max-w-2xl mx-auto bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">History</h2>
      <ul className="bg-white shadow-lg rounded-lg p-6">
        {historyData.length === 0 ? (
          <p className="text-center text-gray-500">No history available.</p>
        ) : (
          historyData.map((item, index) => (
            <li
              key={item._id} // Assuming MongoDB _id is unique
              className="border-b last:border-b-0 py-4 flex justify-between items-center text-gray-700 hover:bg-gray-50 transition-all rounded-lg px-4"
            >
              <span className="text-lg font-semibold text-blue-600">#{index + 1}</span>
              <span className="text-lg">{item.restaurantName}</span>
              <span className="text-sm text-gray-500">
                {new Date(item.updatedAt).toLocaleDateString()}
              </span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default History;
