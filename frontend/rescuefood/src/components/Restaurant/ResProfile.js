import React from "react";

const ResProfile = () => {
  // Example restaurant details
  const restaurantDetails = {
    name: "Gourmet Delight",
    phone: "+1-234-567-890",
    email: "contact@gourmetdelight.com",
    location: "123 Foodie Lane, Culinary City",
    description: "A premium restaurant offering delicious gourmet meals.",
    openingHours: "9:00 AM - 11:00 PM",
    rating: "4.8/5",
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Restaurant Profile</h1>
      <div className="space-y-4">
        {/* Restaurant Name */}
        <div>
          <h2 className="text-lg font-semibold text-gray-600">Name</h2>
          <p className="text-gray-800">{restaurantDetails.name}</p>
        </div>

        {/* Phone Number */}
        <div>
          <h2 className="text-lg font-semibold text-gray-600">Phone</h2>
          <p className="text-gray-800">{restaurantDetails.phone}</p>
        </div>

        {/* Email */}
        <div>
          <h2 className="text-lg font-semibold text-gray-600">Email</h2>
          <p className="text-gray-800">{restaurantDetails.email}</p>
        </div>

        {/* Location */}
        <div>
          <h2 className="text-lg font-semibold text-gray-600">Location</h2>
          <p className="text-gray-800">{restaurantDetails.location}</p>
        </div>

        {/* Description */}
        <div>
          <h2 className="text-lg font-semibold text-gray-600">Description</h2>
          <p className="text-gray-800">{restaurantDetails.description}</p>
        </div>

        {/* Opening Hours */}
        <div>
          <h2 className="text-lg font-semibold text-gray-600">Opening Hours</h2>
          <p className="text-gray-800">{restaurantDetails.openingHours}</p>
        </div>

        {/* Rating */}
        <div>
          <h2 className="text-lg font-semibold text-gray-600">Rating</h2>
          <p className="text-gray-800">{restaurantDetails.rating}</p>
        </div>
      </div>
    </div>
  );
};

export default ResProfile;
