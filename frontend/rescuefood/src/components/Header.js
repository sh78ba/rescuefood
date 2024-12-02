
import React, { useState } from 'react';
import logo from "./images/logo.png";
import { Link } from "react-router";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className='bg-gray-800 md:flex justify-between'>
      <div className='flex items-center  justify-between px-4 py-2'>
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="logo" className='h-10 rounded-lg' />
        </Link>

        {/* Hamburger Button */}
        <button
          className='block md:hidden p-2 rounded-md text-white hover:bg-gray-700 focus:outline-none'
          onClick={toggleMenu}
        >
          <svg
            className='w-6 h-6'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M4 6h16M4 12h16M4 18h16'
            />
          </svg>
        </button>
      </div>

      {/* Navigation Menu */}
      <ul
        className={`${
          isMenuOpen ? 'block' : 'hidden'
        } md:flex md:flex-row md:items-center md:space-x-6 text-white `}
      >
        <div className='flex flex-col md:flex-row space-y-4 md:space-y-0 '>
          <Link to="/" onClick={closeMenu}>
            <li className='mx-5 p-2 text-left bg-gray-700 hover:bg-green-600 rounded-md md:inline-block'>
              Home
            </li>
          </Link>
          <Link to="/topdonors" onClick={closeMenu}>
            <li className='mx-5 p-2 text-left bg-gray-700 hover:bg-green-600 rounded-md md:inline-block'>
              Top Donors
            </li>
          </Link>
          <li
            className='mx-5 p-2 text-left bg-gray-700 hover:bg-green-600 rounded-md md:inline-block cursor-pointer'
            onClick={closeMenu}
          >
            Stories
          </li>
          <li
            className='mx-5 p-2 text-left bg-orange-500 hover:bg-orange-400 rounded-md md:inline-block cursor-pointer'
            onClick={closeMenu}
          >
            Register
          </li>
          <li
            className='mx-5 p-2 text-left bg-orange-500 hover:bg-orange-400 rounded-md md:inline-block cursor-pointer'
            onClick={closeMenu}
          >
            Donate Now
          </li>
        </div>
      </ul>
    </div>
  );
};

export default Header;
