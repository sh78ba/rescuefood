import React from 'react'
import { FaBuilding, FaEnvelope, FaPhone } from 'react-icons/fa';

const Profile = () => {
  return (
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-5xl mx-auto mt-10 border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-6">🍽️ Volunteer Profile</h1>
  
        {/* Flex container for horizontal layout */}
        <div className="flex flex-wrap justify-between gap-4">
          
          {/* Name */}
          <div className="flex flex-col bg-gray-50 p-4 rounded-md w-[48%]">
            <div className="flex items-center space-x-2">
              <FaBuilding className="text-gray-700 text-xl" />
              <h2 className="text-lg font-semibold text-gray-600">Name</h2>
            </div>
            <p className="text-gray-800 font-medium ml-7 mt-1">{localStorage.getItem("name")}</p>
          </div>
  
          {/* Phone */}
          <div className="flex flex-col bg-gray-50 p-4 rounded-md w-[48%]">
            <div className="flex items-center space-x-2">
              <FaPhone className="text-blue-600 text-xl" />
              <h2 className="text-lg font-semibold text-gray-600">Phone</h2>
            </div>
            <p className="text-gray-800 font-medium ml-7 mt-1">{localStorage.getItem("phone")}</p>
          </div>
  
          {/* Email */}
          <div className="flex flex-col bg-gray-50 p-4 rounded-md w-[48%]">
            <div className="flex items-center space-x-2">
              <FaEnvelope className="text-red-600 text-xl" />
              <h2 className="text-lg font-semibold text-gray-600">Email</h2>
            </div>
            <p className="text-gray-800 font-medium ml-7 mt-1">{localStorage.getItem("email")}</p>
          </div>
  
          

        </div>
      </div>
    );
  };
  

export default Profile