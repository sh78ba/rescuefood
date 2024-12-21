import React, { useState } from 'react';
import { BACKEND_PATH } from '../configs/routesconfig';
import { useNavigate } from 'react-router';

const Login = (props) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const toggleLoginForm = () => {
    if (props.userType === "restaurant") {
      navigate("/restaurant/signup");
    }
    if (props.userType === "volunteer") {
      navigate("/volunteer/signup");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const endpoint =
        props.userType === 'restaurant'
          ? `${BACKEND_PATH}/rescuefood/api/v1/restaurant/signin`
          : `${BACKEND_PATH}/rescuefood/api/v1/volunteer/signin`;

      // Make a POST request using fetch
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        alert('Login successful!');
       localStorage.setItem("token",data.accessToken)
       localStorage.setItem("email",data.email)
       localStorage.setItem("name",data.name)

        // Redirect to the dashboard or home page
        navigate('/restaurant/dashboard');  // Modify this route as per your app's requirements

        // Optionally clear form data after successful login
        setFormData({ email: '', password: '' });
      } else {
        const errorData = await response.json();
        alert('Login failed. Please check your credentials.');
        setError(errorData?.message || 'An error occurred. Please try again.');
      }
    } catch (err) {
      console.error('Error during login:', err);
      // Handling network error specifically
      setError('Network error. Please check your connection and try again.');
    }
  };

  return (
    <div>
      <div className="w-1/3 content-center mx-auto border-2 border-green-700 mt-5 rounded-lg">
        <div className="my-3">
          <h1 className="text-3xl text-center">{props.heading}</h1>
        </div>
        <div className="mt-3 bg-white p-4 rounded-lg">
          <form onSubmit={handleLogin}>
            <div className="flex flex-col p-2">
              <input
                className="my-3 px-3 py-2 outline-none rounded-lg border-2"
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                className="my-3 px-3 py-2 outline-none rounded-lg border-2"
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <p className="text-sm text-green-500">Forgot Password?</p>
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <div className="text-center mt-2">
              <button
                type="submit"
                className="text-white bg-green-500 px-4 py-2 w-3/4 rounded-lg"
              >
                Login
              </button>
            </div>
          </form>
          <div className="mt-2">
            <p className="text-sm text-black">
              Not a member?
              <span className="text-green-500 cursor-pointer" onClick={toggleLoginForm}>
                Sign Up Now
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
