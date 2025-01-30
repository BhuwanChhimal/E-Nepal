import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Signup from './Signup';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5001/api/auth', formData);
      const { token } = res.data;
      login(token);
      // console.log('Login successful, navigating to home page');
      navigate('/'); // Redirect to the home page
    } catch (error) {
      console.error(error.response?.data || error.message);
      setErrors(error.response?.data?.errors || { msg: error.message });
    }
  };

  const handleFlip = () => {
    setIsSignup(!isSignup);
  };

  return (
    <div className="max-w-md mx-auto my-10 p-8 bg-white rounded-lg shadow-lg ">
      {isSignup ? (
        <Signup handleFlip={handleFlip} />
      ) : (
        <div>
          <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your username"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                required
              />
            </div>
            {errors.msg && <p className="text-red-500 text-sm">{errors.msg}</p>}
            <button
              type="submit"
              className="w-full px-3 py-2 bg-blue-800 text-white font-bold rounded hover:bg-blue-600"
            >
              Login
            </button>
          </form>
          <p className="text-center mt-4">
            Don't have an account?{' '}
            <button onClick={handleFlip} className="text-blue-500 hover:underline">
              Sign Up
            </button>
          </p>
        </div>
      )}
    </div>
  );
};

export default Login;