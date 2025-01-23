import React from 'react';
import { Link } from 'react-router';

const Register = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex flex-col w-full max-w-md bg-white p-8 rounded-lg shadow-lg text-center">
      
        <ul className="space-y-4">
          <li>
            <Link
              to="/restaurant/login"
              className="block bg-blue-500 text-black px-6 py-3 rounded-lg cursor-pointer hover:bg-blue-400 transition duration-300"
            >
              Restaurant
            </Link>
          </li>
          <li>
            <Link
              to="/volunteer/login"
             className="block bg-blue-500 text-black px-6 py-3 rounded-lg cursor-pointer hover:bg-blue-400 transition duration-300"
            >
              Volunteer
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Register;
