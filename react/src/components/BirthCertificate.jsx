import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { ADToBS } from "bikram-sambat-js";
import { useNavigate } from 'react-router-dom';
import logo from "../assets/birth-certificate-icon.png"
const BirthCertificate = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  const [formData, setFormData] = useState({
    userId:"",
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
  const { token,user } = useAuth();
  const navigate = useNavigate();
  const userId= user?._id;

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
          userId:userId,
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
    <div className="min-h-screen py-8">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
      <div className="bg-white rounded-xl shadow-blue-gray-300 shadow-xl overflow-hidden">
        {/* Header */}
        
        <div className="bg-gradient-to-r relative from-blue-600 to-blue-700 px-6 py-8">
        
          <h1 className="text-3xl font-bold text-white text-center">
            Birth Certificate Application
          </h1>
          <p className="text-blue-100 text-center mt-2">
            Government of Nepal
          </p>
          <span className="absolute hidden md:block left-2 md:left-8 md:top-8 top-12"> 
            <img src={logo} alt="logo" className="w-16 h-16 "/>
          </span>
         
        </div>

        <div className="p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Details Section */}
            <div className="bg-blue-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-blue-gray-800 mb-6">
                Personal Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Name Fields */}
                <div>
                  <label className="block text-sm font-medium text-blue-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="mt-1 p-2 block w-full rounded-md border-blue-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="First Name"
                  />
                  {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-blue-gray-700 mb-1">
                    Middle Name
                  </label>
                  <input
                    type="text"
                    name="middleName"
                    value={formData.middleName}
                    onChange={handleChange}
                    className="mt-1 p-2 block w-full rounded-md border-blue-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Middle Name"
                  />
                  {errors.middleName && <p className="mt-1 text-sm text-red-600">{errors.middleName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-blue-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="mt-1 block p-2 w-full rounded-md border-blue-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Last Name"
                  />
                  {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
                </div>

                {/* Date Fields */}
                <div>
                  <label className="block text-sm font-medium text-blue-gray-700 mb-1">
                    Date of Birth (AD)
                  </label>
                  <input
                    type="date"
                    name="dobAd"
                    value={formData.dobAd}
                    onChange={handleChange}
                    className="mt-1 p-2 block w-full rounded-md border-blue-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  {errors.dobAd && <p className="mt-1 text-sm text-red-600">{errors.dobAd}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-blue-gray-700 mb-1">
                    Date of Birth (BS)
                  </label>
                  <input
                    type="text"
                    name="dobBs"
                    value={formData.dobBs}
                    onChange={handleChange}
                    className="mt-1 block p-2 w-full rounded-md border-blue-gray-300 shadow-sm bg-blue-gray-50 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Auto-calculated"
                    readOnly
                  />
                  {errors.dobBs && <p className="mt-1 text-sm text-red-600">{errors.dobBs}</p>}
                </div>

                {/* Gender Selection */}
                <div>
                  <label className="block text-sm font-medium text-blue-gray-700 mb-1">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="mt-1 p-2 block w-full rounded-md border-blue-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.gender && <p className="mt-1 text-sm text-red-600">{errors.gender}</p>}
                </div>
              </div>
            </div>

            {/* Address Section */}
            <div className="bg-blue-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-blue-gray-800 mb-6">
                Address Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-blue-gray-700 mb-1">
                    Province
                  </label>
                  <input
                    type="text"
                    name="province"
                    value={formData.province}
                    onChange={handleChange}
                    className="mt-1 p-2 block w-full rounded-md border-blue-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Province"
                  />
                  {errors.province && <p className="mt-1 text-sm text-red-600">{errors.province}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-blue-gray-700 mb-1">
                    District
                  </label>
                  <input
                    type="text"
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    className="mt-1 p-2 block w-full rounded-md border-blue-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="District"
                  />
                  {errors.district && <p className="mt-1 text-sm text-red-600">{errors.district}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-blue-gray-700 mb-1">
                    Municipality
                  </label>
                  <input
                    type="text"
                    name="municipality"
                    value={formData.municipality}
                    onChange={handleChange}
                    className="mt-1 p-2 block w-full rounded-md border-blue-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Municipality"
                  />
                  {errors.municipality && <p className="mt-1 text-sm text-red-600">{errors.municipality}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-blue-gray-700 mb-1">
                    Street Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="mt-1 p-2 block w-full rounded-md border-blue-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Street Address"
                  />
                  {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
                </div>
              </div>
            </div>

            {/* Birth Information Section */}
            <div className="bg-blue-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-blue-gray-800 mb-6">
                Birth Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-blue-gray-700 mb-1">
                    Place of Birth
                  </label>
                  <input
                    type="text"
                    name="birthPlace"
                    value={formData.birthPlace}
                    onChange={handleChange}
                    className="mt-1 p-2 block w-full rounded-md border-blue-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Home/Hospital/Other"
                  />
                  {errors.birthPlace && <p className="mt-1 text-sm text-red-600">{errors.birthPlace}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-blue-gray-700 mb-1">
                    Priority Level
                  </label>
                  <select
                    name="priorityLevel"
                    value={formData.priorityLevel}
                    onChange={handleChange}
                    className="mt-1 block p-2 w-full rounded-md border-blue-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="">Select Priority</option>
                    <option value="emergency">Emergency</option>
                    <option value="normal">Normal</option>
                  </select>
                  {errors.priorityLevel && <p className="mt-1 text-sm text-red-600">{errors.priorityLevel}</p>}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-6">
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Submit Application
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
);
};

export default BirthCertificate;