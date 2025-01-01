import React, { useState, useEffect } from 'react';
import RestaurantCard from '../cards/RestaurantCard';
import axios from "axios";
import { BACKEND_PATH } from '../configs/routesconfig';

const Restauranthome = () => {
  const [foods, setFoods] = useState("");
  const [weight, setWeight] = useState("");
  const [orderHistory, setOrderHistory] = useState([]);

  // Fetch order history on component mount
  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) {
      const fetchOrderHistory = async () => {
        try {
          const response = await axios.post(BACKEND_PATH + "/rescuefood/api/v1/restaurant/history", { email: email });
          
          setOrderHistory(response.data.donations); // Assuming response contains an 'orders' array
        } catch (err) {
          console.error(err);
          alert("Failed to fetch order history.");
        }
      };

      fetchOrderHistory();
    }
  }, []);

  const handleRequestOrder = async () => {
    const email = localStorage.getItem("email");
    if (!email) {
      alert("Please log in to create a donation request.");
      return;
    }

    try {
      const response = await axios.post(BACKEND_PATH + "/rescuefood/api/v1/restaurant/donate", {
        email: email,
        donationList: foods.split(",").map((food) => food.trim()), // Send the foods as an array of strings
        weight: parseFloat(weight),
      });

      alert("Donation request created successfully!");
      console.log(response.data);
    } catch (err) {
      console.error(err);
      alert("Failed to create donation request.");
    }
  };

  return (
    <div className='p-3 content-center text-center'>
      <div className='justify-around flex mt-5 flex-wrap flex-col sm:flex-row content-center'>
        <div className='my-2'>
          <RestaurantCard />
        </div>
        <div className='my-2'>
          <RestaurantCard />
        </div>
        <div className='my-2'>
          <RestaurantCard />
        </div>
        <div className='my-2'>
          <RestaurantCard />
        </div>
      </div>

      <div className='mt-5 text-center flex justify-around flex-col sm:flex-row content-center mx'>
        <div className="mt-5 text-center flex justify-around flex-col sm:flex-row content-center mx">
          <div className="border-2 border-black flex flex-col content-center p-3 rounded-lg text-2xl my-2">
            <input
              className="outline-none mt-3 p-2 rounded-lg"
              type="text"
              placeholder="Enter foods separated by comma"
              value={foods}
              onChange={(e) => setFoods(e.target.value)}
            />
            <input
              className="outline-none mt-3 p-2 rounded-lg"
              type="text"
              placeholder="Amount in Kg"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
            <button
              className="mt-3 bg-orange-400 px-3 py-2 rounded-lg inline-block"
              onClick={handleRequestOrder}
            >
              Request Order
            </button>
          </div>
        </div>

        <div className='border-2 border-black rounded-lg my-2 p-3'>
          <h1 className='text-2xl'>Order History</h1>
          <div>
            {orderHistory.length > 0 ? (
              orderHistory.map((order, index) => (
                <div className='flex justify-between px-2 mt-2' key={index}>
                  <p className='md:mx-3'>
                    {/* Map over the donationList and extract itemName */}
                    {order.donationList.map((item, idx) => item.itemName).join(", ")} 
                  </p>
                  <p className='md:mx-3'>{order.weight} kg</p>
                  <p className='md:mx-3'>{new Date(order.createdAt).toLocaleDateString()}</p> {/* Format the createdAt date */}
                  <button className='bg-orange-400 rounded-lg px-2 md:mx-3'>
                    {order.status === "completed" ? "Completed" : "Track"}
                  </button>
                </div>
              ))
            ) : (
              <p>No order history available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Restauranthome;
