import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ADToBS } from "bikram-sambat-js";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Citizenship = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  const [formData, setFormData] = useState({
    userId: "",
    firstName: "",
    middleName: "",
    lastName: "",
    dobAd: "",
    dobBs: "",
    gender: "",
    province: "",
    district: "",
    municipality: "",
    wardNumber: "",
    address: "",
    fatherName: "",
    motherName: "",
    grandfatherName: "",
    parentCitizenshipNumber: "",
    citizenshipType: "",
    reason: "",
    image: null,
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const {user} = useAuth();
  const userId = user?._id;

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else if (name === 'dobAd') {
      const adDate = new Date(value);
      if (!isNaN(adDate)) {
        const adDateString = `${adDate.getFullYear()}-${adDate.getMonth() + 1}-${adDate.getDate()}`;
        const bsDate = ADToBS(adDateString);
        setFormData((prevFormData) => ({
          ...prevFormData,
          dobAd: value,
          dobBs: bsDate,
          userId: userId,
        }));
      } else {
        setFormData({ ...formData, dobAd: value });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      setErrors({ msg: 'No token found' });
      return;
    }

    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      };

      const res = await axios.post('http://localhost:5001/api/citizenship', formData, config);
      setSuccessMessage(res.data.msg);
      setErrors({});
      navigate('/form-success');
    } catch (err) {
      setErrors(err.response.data.errors || { msg: err.response.data.msg });
    }
  };

  const inputStyle = "mt-1 p-2 block w-full rounded-md border-blue-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500";
  const labelStyle = "block text-sm font-medium text-blue-gray-700 mb-1";
  const errorStyle = "mt-1 text-sm text-red-600";

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="bg-white rounded-xl shadow-blue-gray-300 shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-8">
            <h1 className="text-3xl font-bold text-white text-center">
              Citizenship Registration Form
            </h1>
            <p className="text-blue-100 text-center mt-2">
              Government of Nepal
            </p>
          </div>

          <div className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Details */}
              <div className="bg-blue-gray-50 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-blue-gray-800 mb-6">
                  Personal Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className={labelStyle}>First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={inputStyle}
                      placeholder="Enter first name"
                    />
                    {errors.firstName && <p className={errorStyle}>{errors.firstName}</p>}
                  </div>
                  <div>
                    <label className={labelStyle}>Middle Name</label>
                    <input
                      type="text"
                      name="middleName"
                      value={formData.middleName}
                      onChange={handleChange}
                      className={inputStyle}
                      placeholder="Enter middle name"
                    />
                  </div>
                  <div>
                    <label className={labelStyle}>Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={inputStyle}
                      placeholder="Enter last name"
                    />
                    {errors.lastName && <p className={errorStyle}>{errors.lastName}</p>}
                  </div>

                  <div>
                    <label className={labelStyle}>Date of Birth (AD)</label>
                    <input
                      type="date"
                      name="dobAd"
                      value={formData.dobAd}
                      onChange={handleChange}
                      className={inputStyle}
                    />
                    {errors.dobAd && <p className={errorStyle}>{errors.dobAd}</p>}
                  </div>
                  <div>
                    <label className={labelStyle}>Date of Birth (BS)</label>
                    <input
                      type="text"
                      name="dobBs"
                      value={formData.dobBs}
                      onChange={handleChange}
                      className={inputStyle}
                      placeholder="Auto-calculated"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className={labelStyle}>Gender</label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className={inputStyle}
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.gender && <p className={errorStyle}>{errors.gender}</p>}
                  </div>
                </div>
              </div>

              {/* Address Details */}
              <div className="bg-blue-gray-50 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-blue-gray-800 mb-6">
                  Address Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={labelStyle}>Province</label>
                    <input
                      type="text"
                      name="province"
                      value={formData.province}
                      onChange={handleChange}
                      className={inputStyle}
                      placeholder="Province"
                    />
                    {errors.province && <p className={errorStyle}>{errors.province}</p>}
                  </div>
                  <div>
                    <label className={labelStyle}>District</label>
                    <input
                      type="text"
                      name="district"
                      value={formData.district}
                      onChange={handleChange}
                      className={inputStyle}
                      placeholder="District"
                    />
                    {errors.district && <p className={errorStyle}>{errors.district}</p>}
                  </div>
                  <div>
                    <label className={labelStyle}>Municipality</label>
                    <input
                      type="text"
                      name="municipality"
                      value={formData.municipality}
                      onChange={handleChange}
                      className={inputStyle}
                      placeholder="Municipality"
                    />
                    {errors.municipality && <p className={errorStyle}>{errors.municipality}</p>}
                  </div>
                  <div>
                    <label className={labelStyle}>Ward Number</label>
                    <input
                      type="text"
                      name="wardNumber"
                      value={formData.wardNumber}
                      onChange={handleChange}
                      className={inputStyle}
                      placeholder="Ward Number"
                    />
                    {errors.wardNumber && <p className={errorStyle}>{errors.wardNumber}</p>}
                  </div>
                  <div className="md:col-span-2">
                    <label className={labelStyle}>Full Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className={inputStyle}
                      placeholder="Full Address"
                    />
                    {errors.address && <p className={errorStyle}>{errors.address}</p>}
                  </div>
                </div>
              </div>

              {/* Parent Details */}
              <div className="bg-blue-gray-50 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-blue-gray-800 mb-6">
                  Parent Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={labelStyle}>Father's Name</label>
                    <input
                      type="text"
                      name="fatherName"
                      value={formData.fatherName}
                      onChange={handleChange}
                      className={inputStyle}
                      placeholder="Father's Full Name"
                    />
                    {errors.fatherName && <p className={errorStyle}>{errors.fatherName}</p>}
                  </div>
                  <div>
                    <label className={labelStyle}>Mother's Name</label>
                    <input
                      type="text"
                      name="motherName"
                      value={formData.motherName}
                      onChange={handleChange}
                      className={inputStyle}
                      placeholder="Mother's Full Name"
                    />
                    {errors.motherName && <p className={errorStyle}>{errors.motherName}</p>}
                  </div>
                  <div>
                    <label className={labelStyle}>Grandfather's Name</label>
                    <input
                      type="text"
                      name="grandfatherName"
                      value={formData.grandfatherName}
                      onChange={handleChange}
                      className={inputStyle}
                      placeholder="Grandfather's Full Name"
                    />
                    {errors.grandfatherName && <p className={errorStyle}>{errors.grandfatherName}</p>}
                  </div>
                  <div>
                    <label className={labelStyle}>Parent's Citizenship Number</label>
                    <input
                      type="number"
                      name="parentCitizenshipNumber"
                      value={formData.parentCitizenshipNumber}
                      onChange={handleChange}
                      className={inputStyle}
                      placeholder="Citizenship Number"
                    />
                    {errors.parentCitizenshipNumber && <p className={errorStyle}>{errors.parentCitizenshipNumber}</p>}
                  </div>
                </div>
              </div>

              {/* Citizenship Details */}
              <div className="bg-blue-gray-50 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-blue-gray-800 mb-6">
                  Citizenship Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={labelStyle}>Type of Citizenship</label>
                    <select
                      name="citizenshipType"
                      value={formData.citizenshipType}
                      onChange={handleChange}
                      className={inputStyle}
                    >
                      <option value="">Select Type</option>
                      <option value="byBirth">By Birth</option>
                      <option value="byDescent">By Descent</option>
                      <option value="naturalized">Naturalized</option>
                    </select>
                    {errors.citizenshipType && <p className={errorStyle}>{errors.citizenshipType}</p>}
                  </div>
                  <div>
                    <label className={labelStyle}>Reason for Citizenship</label>
                    <input
                      type="text"
                      name="reason"
                      value={formData.reason}
                      onChange={handleChange}
                      className={inputStyle}
                      placeholder="Enter reason"
                    />
                    {errors.reason && <p className={errorStyle}>{errors.reason}</p>}
                  </div>
                </div>
              </div>

              {/* Image Upload */}
              <div className="bg-blue-gray-50 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-blue-gray-800 mb-6">
                  Upload Photo
                </h2>
                <div>
                  <label className={labelStyle}>Photo (PP Size, Max: 5MB)</label>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleChange}
                    className={`${inputStyle} file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100`}
                  />
                  {errors.image && <p className={errorStyle}>{errors.image}</p>}
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

              {successMessage && (
                <p className="text-green-500 text-sm mt-4 text-center">{successMessage}</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Citizenship;