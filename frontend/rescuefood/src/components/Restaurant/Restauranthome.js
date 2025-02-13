
import React from "react";
import { Route, Routes } from "react-router";
import { useLocation } from "react-router";
import Home from "../Home";
import Header from "../Header";
import Sidebar from "../Volunteer/Sidebar";

const Restauranthome = () => {
  const location = useLocation();

  // Map routes to header titles
  const headerTitles = {
    "/restaurant/dashboard/home": "Dashboard",
    "/restaurant/dashboard/history": "Volunteering History",
    "/restaurant/dashboard/profile": "Profile",
  };

  // Get the current header title based on the location
  const currentHeaderTitle = headerTitles[location.pathname] || "Volunteer Dashboard";

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
            <Route path="home" element={<Home />} />
            {/* Other routes */}
            <Route path="history" element={<div> History Page</div>} />
            <Route path="profile" element={<div>Profile Page</div>} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Restauranthome;
