import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { ADToBS } from "bikram-sambat-js";
import { useNavigate } from 'react-router-dom';

const BirthCertificate = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    dobAd: "",
    dobBs: "",
    gender: "",
    province: "",
    district: "",
    municipality: "",
    address: "",
    birthPlace: "",
    priorityLevel: "",
  });

  const [errors, setErrors] = useState({});
  const { token } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Automatically calculate and set the BS date when the AD date is entered
    if (name === 'dobAd') {
      const adDate = new Date(value);
      if (!isNaN(adDate)) {
        const adDateString = `${adDate.getFullYear()}-${adDate.getMonth() + 1}-${adDate.getDate()}`;
        const bsDate = ADToBS(adDateString);
        setFormData((prevFormData) => ({
          ...prevFormData,
          dobAd: value,
          dobBs: bsDate,
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      console.error('No token found');
      setErrors({ msg: 'No token found' });
      return;
    }

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      console.log('Submitting form with token:', token);
      const res = await axios.post('http://localhost:5001/api/birthCertificate', formData, config);
      console.log('Response from backend:', res.data);
      navigate('/form-success');
    } catch (err) {
      console.error('Error from backend:', err.response.data);
      setErrors(err.response.data.errors || { msg: err.response.data.msg });
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-5 bg-gray-light p-8 rounded-lg shadow-md">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-800">Birth Certificate Application</h1>
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Personal Details */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Personal Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="First Name"
              />
              {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Middle Name</label>
              <input
                type="text"
                name="middleName"
                value={formData.middleName}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="Middle Name"
              />
              {errors.middleName && <p className="text-red-500 text-sm">{errors.middleName}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="Last Name"
              />
              {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Date of Birth (AD)</label>
              <input
                type="date"
                name="dobAd"
                value={formData.dobAd}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
              {errors.dobAd && <p className="text-red-500 text-sm">{errors.dobAd}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Date of Birth (BS)</label>
              <input
                type="text"
                name="dobBs"
                value={formData.dobBs}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="Date of Birth (BS)"
                readOnly
              />
              {errors.dobBs && <p className="text-red-500 text-sm">{errors.dobBs}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Province</label>
              <input
                type="text"
                name="province"
                value={formData.province}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="Province"
              />
              {errors.province && <p className="text-red-500 text-sm">{errors.province}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">District</label>
              <input
                type="text"
                name="district"
                value={formData.district}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="District"
              />
              {errors.district && <p className="text-red-500 text-sm">{errors.district}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Municipality</label>
              <input
                type="text"
                name="municipality"
                value={formData.municipality}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="Municipality"
              />
              {errors.municipality && <p className="text-red-500 text-sm">{errors.municipality}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="Address"
              />
              {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
            </div>
          </div>
        </div>
        {/* Birth Information */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Birth Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Birth Place</label>
              <input
                type="text"
                name="birthPlace"
                value={formData.birthPlace}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="Home/Hospital/Other"
              />
              {errors.birthPlace && <p className="text-red-500 text-sm">{errors.birthPlace}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Priority Level</label>
              <select
                name="priorityLevel"
                value={formData.priorityLevel}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              >
                <option value="">Select</option>
                <option value="emergency">Emergency</option>
                <option value="normal">Normal</option>
              </select>
              {errors.priorityLevel && <p className="text-red-500 text-sm">{errors.priorityLevel}</p>}
            </div>
          </div>
        </div>
        {/* Submit Button */}
        <div className="text-center flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-800 shadow-lg text-white bg-black font-bold rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default BirthCertificate;