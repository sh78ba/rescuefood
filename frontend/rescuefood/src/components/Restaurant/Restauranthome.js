// import React, { useState, useEffect } from "react";
// import RestaurantCard from "../cards/RestaurantCard";
// import axios from "axios";
// import { BACKEND_PATH } from "../configs/routesconfig";

// const Restauranthome = () => {
//   const [foods, setFoods] = useState("");
//   const [weight, setWeight] = useState("");
//   const [orderHistory, setOrderHistory] = useState([]);

//   useEffect(() => {
//     const email = localStorage.getItem("email");
//     if (email) {
//       const fetchOrderHistory = async () => {
//         try {
//           const response = await axios.post(
//             `${BACKEND_PATH}/rescuefood/api/v1/restaurant/history`,
//             { email }
//           );
//           setOrderHistory(response.data.donations || []);
//         } catch (err) {
//           console.error(err);
//           alert("Failed to fetch order history.");
//         }
//       };
//       fetchOrderHistory();
//     }
//   }, []);

//   const handleRequestOrder = async () => {
//     const email = localStorage.getItem("email");
//     if (!email) {
//       alert("Please log in to create a donation request.");
//       return;
//     }
//     try {
//       const response = await axios.post(
//         `${BACKEND_PATH}/rescuefood/api/v1/restaurant/donate`,
//         {
//           email,
//           donationList: foods.split(",").map((food) => food.trim()),
//           weight: parseFloat(weight),
//         }
//       );
//       alert("Donation request created successfully!");
//       setFoods("");
//       setWeight("");
//       console.log(response.data);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to create donation request.");
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       {/* Header Section */}
//       <div className="text-center bg-gradient-to-r from-orange-400 to-red-500 text-white py-8 rounded-md shadow-md">
//         <h1 className="text-4xl font-bold mb-2">Restaurant Dashboard</h1>
//         <p className="text-lg">Manage your food donations and order history effortlessly.</p>
//       </div>

//       {/* Restaurant Cards Section */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-8">
//         {[...Array(4)].map((_, index) => (
//           <div key={index} className="hover:scale-105 transition-transform">
//             <RestaurantCard />
//           </div>
//         ))}
//       </div>

//       {/* Donation Request Form */}
//       <div className="bg-white p-6 rounded-lg shadow-lg my-8">
//         <h2 className="text-2xl font-semibold mb-4">Request Donation</h2>
//         <div className="space-y-4">
//           <input
//             type="text"
//             className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500"
//             placeholder="Enter foods separated by commas"
//             value={foods}
//             onChange={(e) => setFoods(e.target.value)}
//           />
//           <input
//             type="text"
//             className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500"
//             placeholder="Amount in Kg"
//             value={weight}
//             onChange={(e) => setWeight(e.target.value)}
//           />
//           <button
//             onClick={handleRequestOrder}
//             className="w-full p-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
//           >
//             Request Order
//           </button>
//         </div>
//       </div>

//       {/* Order History Section */}
//       <div className="bg-white p-6 rounded-lg shadow-lg my-8">
//         <h2 className="text-2xl font-semibold mb-4">Order History</h2>
//         <div className="space-y-4">
//           {orderHistory.length > 0 ? (
//             orderHistory.map((order, index) => (
//               <div
//                 key={index}
//                 className="p-4 bg-gray-100 rounded-lg shadow-md flex justify-between items-center"
//               >
//                 <div>
//                   <p className="text-lg font-medium">
//                     {order.donationList.map((item) => item.itemName).join(", ")}
//                   </p>
//                   <p className="text-gray-600">{order.weight} kg</p>
//                   <p className="text-gray-400 text-sm">
//                     {new Date(order.createdAt).toLocaleDateString()}
//                   </p>
//                 </div>
//                 <button
//                   className={`px-4 py-2 text-white rounded-lg ${
//                     order.status === "completed"
//                       ? "bg-green-500"
//                       : "bg-blue-500"
//                   }`}
//                 >
//                   {order.status === "completed" ? "Completed" : "Track"}
//                 </button>
//               </div>
//             ))
//           ) : (
//             <p className="text-center text-gray-500">
//               No order history available.
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Restauranthome;

// App.js

import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Route, Routes } from "react-router";
import { useLocation } from "react-router";

import ResHome from "./ResHome";
import ResProfile from "./ResProfile";
import ResDonate from "./ResDonate";

const Restauranthome = () => {
  const location = useLocation();

  // Map routes to header titles
  const headerTitles = {
    "/restaurant/dashboard/home": "Dashboard",
    "/restaurant/dashboard/donate": "Donate",
    "/restaurant/dashboard/history": "Donation History",
    "/restaurant/dashboard/profile": "Profile",
  };

  // Get the current header title based on the location
  const currentHeaderTitle = headerTitles[location.pathname] || "Restaurant Dashboard";

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar Component */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-col flex-grow">
        {/* Header Component */}
        <Header title={currentHeaderTitle} />

        {/* Main Section */}
        <main className="p-6 space-y-6">
          <Routes>
            {/* Route for Home under /restaurant/dashboard */}
            <Route path="home" element={<ResHome />} />
            {/* Other routes */}
            <Route path="donate" element={<ResDonate/>} />
            <Route path="history" element={<div>Donation History Page</div>} />
            <Route path="profile" element={<ResProfile/>} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Restauranthome;
