import React, { useState } from 'react';
import { BACKEND_PATH } from '../configs/routesconfig';

const RestaurantSignup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: {
      type: 'Point',
      coordinates: [],
    },
    address: '',
    proofId: '',
    password: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const backendRoute = `${BACKEND_PATH}/rescuefood/api/v1/restaurant/signup`;

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
        alert('Restaurant Signup successful!');
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
    <div className='signup-container'>
      <h1>Restaurant Signup</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <input type='text' name='name' placeholder='Restaurant Name' onChange={handleChange} />
        <input type='email' name='email' placeholder='Email' onChange={handleChange} />
        <input type='text' name='phone' placeholder='Phone Number' onChange={handleChange} />
        <input type='text' name='latitude' placeholder='Latitude' onChange={handleChange} />
        <input type='text' name='longitude' placeholder='Longitude' onChange={handleChange} />
        <input type='text' name='address' placeholder='Address' onChange={handleChange} />
        <input type='text' name='proofId' placeholder='Proof ID' onChange={handleChange} />
        <input type='password' name='password' placeholder='Password' onChange={handleChange} />
        <button onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default RestaurantSignup;
