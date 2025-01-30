import { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const Signup = ({ handleFlip }) => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    phoneNumber: '',
    dob: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const { name, username, phoneNumber, dob, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5001/api/auth/signup', formData);
      // console.log('User registered:', res.data);
      handleFlip(); // Flip back to login after signup
    } catch (err) {
      console.error('Error registering user:', err.response.data);
      setErrors(err.response.data.errors || { msg: err.response.data.msg });
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-6">Sign Up</h1>
      <form onSubmit={handleSignup} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your name"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Username</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your username"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={phoneNumber}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your phone number"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={dob}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
            required
          />
        </div>
        {errors.msg && <p className="text-red-500 text-sm">{errors.msg}</p>}
        {Array.isArray(errors) && errors.map((error, index) => (
          <p key={index} className="text-red-500 text-sm">{error.msg}</p>
        ))}
        <button
          type="submit"
          className="w-full px-3 py-2 bg-blue-800 text-white font-bold rounded hover:bg-blue-600"
        >
          Sign Up
        </button>
      </form>
      <p className="text-center mt-4">
        Already have an account?{' '}
        <button onClick={handleFlip} className="text-blue-500 hover:underline">
          Login
        </button>
      </p>
    </div>
  );
};

Signup.propTypes = {
  handleFlip: PropTypes.func.isRequired,
};

export default Signup;