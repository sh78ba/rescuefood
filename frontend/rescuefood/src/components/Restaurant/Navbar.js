import React, { useState, useEffect } from 'react';
import logo from "../images/logo.png";
import { useNavigate } from 'react-router';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    localStorage.removeItem("token");
    localStorage.removeItem("type");
    navigate("/");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle the menu open/close
  };

  // Close the menu when the user clicks outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('.navbar-menu') && !event.target.closest('.hamburger-button')) {
        setIsMenuOpen(false); // Close the menu if clicked outside
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <div className="bg-gray-800 flex justify-between items-center px-5 py-2">
      <div className="flex justify-between items-center px-4 py-2">
        {/* Logo */}
        <img src={logo} alt="logo" className="h-10 rounded-lg" />

        {/* Hamburger Button */}
        <button
          className="block md:hidden p-2 rounded-md text-white hover:bg-gray-700 focus:outline-none hamburger-button"
          onClick={toggleMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Navigation Menu for Desktop */}
      <ul className="hidden md:flex md:flex-row md:items-center md:space-x-6 text-white">
        <li className="mx-5 p-2 text-left bg-gray-700 hover:bg-green-600 rounded-md cursor-pointer">
          Dashboard
        </li>
        <li className="mx-5 p-2 text-left bg-gray-700 hover:bg-green-600 rounded-md cursor-pointer">
          Profile
        </li>
        <li
          className="mx-5 p-2 text-left bg-orange-500 hover:bg-orange-400 rounded-md cursor-pointer"
          onClick={handleLogout}
        >
          Logout
        </li>
      </ul>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden navbar-menu flex flex-col bg-gray-700 space-y-4 text-white p-4">
          <li className="p-2 text-left bg-gray-700 hover:bg-green-600 rounded-md cursor-pointer">
            Dashboard
          </li>
          <li className="p-2 text-left bg-gray-700 hover:bg-green-600 rounded-md cursor-pointer">
            Profile
          </li>
          <li
            className="p-2 text-left bg-orange-500 hover:bg-orange-400 rounded-md cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </li>
        </div>
      )}
    </div>
  );
};

export default Navbar;
