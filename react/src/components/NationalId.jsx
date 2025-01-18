
import axios from 'axios';
import { ADToBS } from 'bikram-sambat-js';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';

const NationalId = () => {
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
        citizenshipnumber: "",
        permanentProvince: "",
        permanentDistrict: "",
        permanentWardNumber: "",
        temporaryProvince: "",
        temporaryDistrict: "",
        temporaryWardNumber: "",
        citizenshipImage: null,
        passportSizeImage: null,
      });
      const {user} = useAuth();
      const userId = user?._id;
      const [errors, setErrors] = useState({});
      const [successMessage, setSuccessMessage] = useState('');
      const navigate = useNavigate();
      const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
    
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
              userId:userId,
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
          const res = await axios.post('http://localhost:5001/api/nationalId', formData, config);
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
        <div className="max-w-4xl mx-auto my-5 p-6 bg-gray-light shadow-lg rounded-md">
          <h1 className="text-2xl font-bold text-center text-blue-800 mb-6">National Identity Registration Form</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Details */}
            <div>
              <h2 className="text-lg font-semibold mb-2">Personal Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                  {errors.firstName && (
                    <span className="text-red-500 text-sm">{errors.firstName.message}</span>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium">Middle Name</label>
                  <input
                    type="text"
                    name="middleName"
                    value={formData.middleName}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                  {errors.lastName && (
                    <span className="text-red-500 text-sm">{errors.lastName.message}</span>
                  )}
                </div>
              </div>
            </div>
    
            {/* Date of Birth */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
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
              <label className="block text-sm font-medium">Date of Birth (AD)</label>
              <input
                type="date"
                name="dobAd"
                value={formData.dobAd}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
              {errors.dateOfBirth && (
                <span className="text-red-500 text-sm">{errors.dateOfBirth.message}</span>
              )}
              <label className="block text-sm font-medium">Date of Birth (BS)</label>
              <input
                type="text"
                readOnly
                name="dobBs"
                value={formData.dobBs}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
              {errors.dateOfBirth && (
                <span className="text-red-500 text-sm">{errors.dateOfBirth.message}</span>
              )}
              <label className='block text-sm font-medium'>Citizenship No.</label>
              <input type="text" 
              className='w-full border border-gray-300 rounded-md p-2'
              name='citizenshipNumber'
              value={formData.citizenshipNumber}
              onChange={handleChange}
              />
              </div>
            </div>
    
            {/* Citizenship Image */}
            <div>
              <label className="block text-sm font-medium">Upload Citizenship Image</label>
              <input
                type="file"
                name="citizenshipImage"
                accept="image/*"
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
              {errors.citizenshipImage && (
                <span className="text-red-500 text-sm">{errors.citizenshipImage.message}</span>
              )}
            </div>
    
            {/* Address Details */}
            <div>
              <h2 className="text-lg font-semibold mb-2">Permanent Address</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium">Province</label>
                  <input
                    type="text"
                    name="permanentProvince"
                    value={formData.permanentProvince}
                    onChange={handleChange}

                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                  {errors.permanentProvince && (
                    <span className="text-red-500 text-sm">{errors.permanentProvince.message}</span>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium">District</label>
                  <input
                    type="text"
                    name="permanentDistrict"
                    value={formData.permanentDistrict}
                    onChange={handleChange}

                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                  {errors.permanentDistrict && (
                    <span className="text-red-500 text-sm">{errors.permanentDistrict.message}</span>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium">Ward Number</label>
                  <input
                    type="number"
                    name="permanentWardNumber"
                    value={formData.permanentWardNumber}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                  {errors.permanentWardNumber && (
                    <span className="text-red-500 text-sm">{errors.permanentWardNumber.message}</span>
                  )}
                </div>
              </div>
            </div>
    
            <div>
              <h2 className="text-lg font-semibold mb-2">Temporary Address</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium">Province</label>
                  <input
                    type="text"
                    name="temporaryProvince"
                    value={formData.temporaryProvince}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">District</label>
                  <input
                    type="text"
                    name="temporaryDistrict"
                    value={formData.temporaryDistrict}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Ward Number</label>
                  <input
                    type="number"
                    name="temporaryWardNumber"
                    value={formData.temporaryWardNumber}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
              </div>
            </div>
    
            {/* Passport Size Image */}
            <div>
              <label className="block text-sm font-medium">Upload Passport-Size Image</label>
              <input
                type="file"
                accept="passportSizeImage/*"
                name="passportSizeImage"
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
              {errors.passportImage && (
                <span className="text-red-500 text-sm">{errors.passportImage.message}</span>
              )}
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

export default NationalId