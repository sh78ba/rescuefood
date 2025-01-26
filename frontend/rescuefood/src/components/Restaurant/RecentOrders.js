import React, { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_PATH } from "../configs/routesconfig";

const RecentOrders = () => {
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) {
      const fetchOrderHistory = async () => {
        try {
          const response = await axios.post(
            `${BACKEND_PATH}/rescuefood/api/v1/restaurant/history`,
            { email }
          );
          setOrderHistory(response.data.donations || []);
        } catch (err) {
          console.error(err);
          alert("Failed to fetch order history.");
        }
      };
      fetchOrderHistory();
    }
  }, []);

  // Sort orders by date (newest first)

  const sortedOrders = orderHistory.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

  // Get the latest 3 sorted orders
  const latestThreeOrders = sortedOrders.slice(0, 3);

 // Debugging: Log the latest three orders to verify sorting

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-lg font-bold mb-4">Recent Donations</h2>
      {latestThreeOrders.length === 0 ? (
        <p>No recent donations available.</p>
      ) : (
        <ul>
          {latestThreeOrders.map((order) => (
            <li
              key={order._id}
              className="flex justify-between py-2 border-b"
            >
              {/* Render donation list as a comma-separated string */}
              <div className="text-gray-700">
                <strong>Items:</strong>{" "}
                {order.donationList.map((item) => item.itemName).join(", ")}
              </div>

              <div className="flex justify-between items-center mb-2">
                <span
                  className={`px-2 py-1 rounded ${
                    order.status === "requested"
                      ? "bg-yellow-200"
                      : order.status === "delivered"
                      ? "bg-green-200"
                      : "bg-red-200"
                  }`}
                >
                  {order.status}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecentOrders;
