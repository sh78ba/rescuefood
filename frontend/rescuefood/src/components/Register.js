import React from 'react';
import { Link } from 'react-router';

const Register = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col w-full max-w-md bg-white p-6 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-semibold mb-6 text-green-600">Register As</h1>
        <ul className="space-y-4">
          <li>
            <Link
              to="/restaurant/login"
              className="block bg-orange-400 text-white px-4 py-3 rounded-lg cursor-pointer hover:bg-orange-500 transition duration-300"
            >
              Restaurant
            </Link>
          </li>
          <li>
            <Link
              to="/volunteer/login"
              className="block bg-orange-400 text-white px-4 py-3 rounded-lg cursor-pointer hover:bg-orange-500 transition duration-300"
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
