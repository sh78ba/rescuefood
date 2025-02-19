import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Route, Routes } from "react-router";
import { useLocation } from "react-router";

import GMap from "../maps/GMap";
import Profile from "./Profile";
import History from "./History";

const DashboardVolunteer = () => {
  const location = useLocation();

  // Map routes to header titles
  const headerTitles = {
    "/volunteer/dashboard/home": "Dashboard",
    "/volunteer/dashboard/history": "History",
    "/volunteer/dashboard/profile": "Profile",
  };

  // Get the current header title based on the location
  const currentHeaderTitle = headerTitles[location.pathname];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar Component */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-col flex-grow">
        {/* Header Component */}
        <Header title={currentHeaderTitle} />

        {/* Main Section */}
        <main className="p-2 space-y-2 height-screen">
          <Routes>
            {/* Route for Home under /volunteer/dashboard */}
            <Route path="home" element={<GMap />} />
            <Route path="profile" element={<Profile/>} />
            <Route path="history" element={<History/>} />
            
            {/* <Route path="reports" element={<ReportsContent />} />  */}
            
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default DashboardVolunteer;
