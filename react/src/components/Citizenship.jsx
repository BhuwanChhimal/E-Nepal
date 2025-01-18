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
  const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
  const {user}= useAuth();

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
      console.error('No token found');
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

      console.log('Submitting form with token:', token);
      const res = await axios.post('http://localhost:5001/api/citizenship', formData, config);
      console.log('Response from backend:', res.data);
      setSuccessMessage(res.data.msg);
      setErrors({});
      navigate('/form-success');
    } catch (err) {
      console.error('Error from backend:', err.response.data);
      setErrors(err.response.data.errors || { msg: err.response.data.msg });
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-5 p-8 bg-gray-light rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-800">Citizenship Registration Form</h2>
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
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
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
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium mb-1">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
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
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
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
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium mb-1">Ward Number</label>
              <input
                type="text"
                name="wardNumber"
                value={formData.wardNumber}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="Ward Number"
              />
              {errors.wardNumber && <p className="text-red-500 text-sm">{errors.wardNumber}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Full Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="Country, Province/State, Local Address"
              />
              {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
            </div>
          </div>
        </div>

        {/* Parent Details */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Parent Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Father's Name</label>
              <input
                type="text"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="Father's Full Name"
              />
              {errors.fatherName && <p className="text-red-500 text-sm">{errors.fatherName}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Mother's Name</label>
              <input
                type="text"
                name="motherName"
                value={formData.motherName}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="Mother's Full Name"
              />
              {errors.motherName && <p className="text-red-500 text-sm">{errors.motherName}</p>}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium mb-1">Grandfather's Name</label>
              <input
                type="text"
                name="grandfatherName"
                value={formData.grandfatherName}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="Grandfather's Full Name"
              />
              {errors.grandfatherName && <p className="text-red-500 text-sm">{errors.grandfatherName}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Parent's Citizenship Number</label>
              <input
                type="number"
                name="parentCitizenshipNumber"
                value={formData.parentCitizenshipNumber}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="Citizenship Number"
              />
              {errors.parentCitizenshipNumber && <p className="text-red-500 text-sm">{errors.parentCitizenshipNumber}</p>}
            </div>
          </div>
        </div>

        {/* Citizenship Details */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Citizenship Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Type of Citizenship</label>
              <select
                name="citizenshipType"
                value={formData.citizenshipType}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              >
                <option value="">Select</option>
                <option value="byBirth">By Birth</option>
                <option value="byDescent">By Descent</option>
                <option value="naturalized">Naturalized</option>
              </select>
              {errors.citizenshipType && <p className="text-red-500 text-sm">{errors.citizenshipType}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Reason for Citizenship</label>
              <input
                type="text"
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="Reason"
              />
              {errors.reason && <p className="text-red-500 text-sm">{errors.reason}</p>}
            </div>
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Upload Photo</h3>
          <label className="block text-sm font-medium mb-1">Photo (PP Size, Max: 5MB)</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
          {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
        </div>

        {/* Submit Button */}
        <div className="text-center flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-800 text-white font-bold rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
        {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}
      </form>
    </div>
  );
};

export default Citizenship;