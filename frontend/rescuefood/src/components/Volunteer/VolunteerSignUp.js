import React, { useState } from 'react';
import { BACKEND_PATH } from '../configs/routesconfig';
import { useNavigate } from 'react-router';

const VolunteerSignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: {
      type: 'Point',
      coordinates: [],
    },
    password: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const backendRoute = `${BACKEND_PATH}/rescuefood/api/v1/volunteer/signup`;

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'latitude' || name === 'longitude') {
      const coordinates = [...formData.location.coordinates];
      if (name === 'latitude') coordinates[1] = parseFloat(value);
      if (name === 'longitude') coordinates[0] = parseFloat(value);
      setFormData({ ...formData, location: { ...formData.location, coordinates } });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleClick = () => {
    navigate('/volunteer/login');
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch(backendRoute, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Volunteer Signup successful!');
      } else {
        alert(`Signup failed: ${data.message}`);
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-center mb-6 text-black">Volunteer Signup</h1>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`w-full py-3 rounded-lg text-white ${
              isSubmitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-400 transition duration-300'
            }`}
          >
            {isSubmitting ? 'Submitting...' : 'Sign Up'}
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already a member?{' '}
            <span
              className="text-green-500 font-medium cursor-pointer hover:underline"
              onClick={handleClick}
            >
              Sign In Now
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VolunteerSignup;
