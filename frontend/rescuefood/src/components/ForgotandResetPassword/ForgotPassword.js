import React, { useState } from "react";
import axios from "axios";
import { BACKEND_PATH } from "../configs/routesconfig";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("restaurant"); // Default type
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await axios.post(
        `${BACKEND_PATH}/rescuefood/api/v1/${userType}/forgot-password`, 
        { email }
      );
      setMessage(response.data.message);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#ECE852]">
      <div className="w-full max-w-md bg-[#ECE852] p-8 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-center mb-4">Forgot Password</h2>
        {message && <p className="text-green-500 text-sm text-center">{message}</p>}
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* User Type Selection */}
          <select
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
          >
            <option value="restaurant">Restaurant</option>
            <option value="volunteer">Volunteer</option>
          </select>

          {/* Email Input */}
          <input
            type="email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Submit Button */}
          <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-400">
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
