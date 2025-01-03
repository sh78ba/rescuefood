import React, { useState, useEffect } from "react";
import logo from "../images/logo.png";
import { useNavigate } from "react-router";

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
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMenuOpen &&
        !event.target.closest(".navbar-menu") &&
        !event.target.closest(".hamburger-button")
      ) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <nav className="bg-gradient-to-r from-orange-400 to-red-500 text-white shadow-lg">
      <div className="flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <img
          src={logo}
          alt="logo"
          className="h-12 rounded-lg cursor-pointer"
          onClick={() => navigate("/")}
        />

        {/* Hamburger Button */}
        <button
          className="block md:hidden p-2 rounded-md text-white hover:bg-gray-700 focus:outline-none hamburger-button"
          onClick={toggleMenu}
          aria-label="Toggle menu"
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

        {/* Navigation Menu (Desktop) */}
        <ul className="hidden md:flex md:items-center md:space-x-8 text-lg">
          <li
            className="cursor-pointer p-3 hover:bg-red-600 rounded-md transition transform hover:scale-105"
            onClick={() => navigate("/restaurant/dashboard")}
          >
            <i className="fas fa-tachometer-alt mr-2"></i>Dashboard
          </li>
          <li
            className="cursor-pointer p-3 hover:bg-red-600 rounded-md transition transform hover:scale-105"
            onClick={() => navigate("/profile")}
          >
            <i className="fas fa-user-circle mr-2"></i>Profile
          </li>
          <li
            className="cursor-pointer p-3 bg-red-500 hover:bg-red-400 rounded-md transition transform hover:scale-105"
            onClick={handleLogout}
          >
            <i className="fas fa-sign-out-alt mr-2"></i>Logout
          </li>
        </ul>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="navbar-menu md:hidden bg-gray-800 p-6 space-y-4 text-center rounded-lg shadow-lg">
          <li
            className="cursor-pointer p-3 hover:bg-red-600 rounded-md transition transform hover:scale-105"
            onClick={() => {
              setIsMenuOpen(false);
              navigate("/dashboard");
            }}
          >
            <i className="fas fa-tachometer-alt mr-2"></i>Dashboard
          </li>
          <li
            className="cursor-pointer p-3 hover:bg-red-600 rounded-md transition transform hover:scale-105"
            onClick={() => {
              setIsMenuOpen(false);
              navigate("/profile");
            }}
          >
            <i className="fas fa-user-circle mr-2"></i>Profile
          </li>
          <li
            className="cursor-pointer p-3 bg-red-500 hover:bg-red-400 rounded-md transition transform hover:scale-105"
            onClick={handleLogout}
          >
            <i className="fas fa-sign-out-alt mr-2"></i>Logout
          </li>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
