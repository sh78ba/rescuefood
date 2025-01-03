import React from "react";
import Card from "./cards/Card";
import homeimg from "./images/home.jpg";
import requestfoodimg from "./images/reqfood.jpg";
import foodimg from "./images/food.jpg";
import contactus from "./images/contactus.png";
import QuotesCard from "./cards/Quotescard";

const Home = () => {
  return (
    <div className="bg-gradient-to-r from-orange-400 to-red-500 min-h-screen text-white">
      {/* Hero Section */}
      <div className="text-center py-10 bg-gradient-to-r from-orange-500 to-red-600 shadow-lg">
        <h1 className="text-5xl font-extrabold mb-4">Welcome to Food Rescue</h1>
        <p className="text-lg font-medium">
          Join hands to eliminate hunger and provide food to those in need.
        </p>
      </div>

      {/* Cards Section */}
      <div className="flex flex-wrap justify-center gap-8 mx-8 py-12">
        <Card
          heading="Home"
          buttonname="Donate"
          imagelink={homeimg}
          className="hover:shadow-2xl transform hover:scale-105 transition duration-300"
        />
        <Card
          heading="Donate Food"
          buttonname="Donate Food"
          imagelink={requestfoodimg}
          className="hover:shadow-2xl transform hover:scale-105 transition duration-300"
        />
        <Card
          heading="Request Food"
          buttonname="Request Food"
          imagelink={foodimg}
          className="hover:shadow-2xl transform hover:scale-105 transition duration-300"
        />
        <Card
          heading="Contact Us"
          buttonname="Contact Us"
          imagelink={contactus}
          bgcolor="orange"
          className="hover:shadow-2xl transform hover:scale-105 transition duration-300"
        />
      </div>

      {/* Quotes Section */}
      <div className="bg-gradient-to-r from-orange-400 to-red-500 rounded-lg mx-8 p-8 shadow-lg">
        <h2 className="text-3xl font-semibold text-center mb-6">
          Inspiring Quotes
        </h2>
        <QuotesCard />
      </div>

      {/* Footer Section */}
      <footer className="bg-gradient-to-r from-orange-500 to-red-600 text-center py-4 mt-8">
        <p className="text-sm font-light">
          © {new Date().getFullYear()}Food Rescue. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Home;
