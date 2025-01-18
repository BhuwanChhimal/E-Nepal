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
    userId: "",
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

  const { user } = useAuth();
  const userId = user?._id;
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

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

  const inputStyle = "w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500";
  const labelStyle = "block text-sm font-medium text-gray-700 mb-1";
  const errorStyle = "text-red-500 text-sm mt-1";

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="bg-white rounded-xl shadow-blue-gray-300 shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-8">
            <h1 className="text-3xl font-bold text-white text-center">
              National Identity Registration Form
            </h1>
            <p className="text-blue-100 text-center mt-2">
              Government of Nepal
            </p>
          </div>

          <div className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Details */}
              <div className="bg-blue-gray-50 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-blue-gray-800 mb-6">Personal Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className={labelStyle}>First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={inputStyle}
                    />
                    {errors.firstName && (
                      <span className={errorStyle}>{errors.firstName.message}</span>
                    )}
                  </div>
                  <div>
                    <label className={labelStyle}>Middle Name</label>
                    <input
                      type="text"
                      name="middleName"
                      value={formData.middleName}
                      onChange={handleChange}
                      className={inputStyle}
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
                    />
                    {errors.lastName && (
                      <span className={errorStyle}>{errors.lastName.message}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Date of Birth and Gender */}
              <div className="bg-blue-gray-50 rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelStyle}>Gender</label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className={inputStyle}
                    >
                      <option value="">Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.gender && <p className={errorStyle}>{errors.gender}</p>}
                    
                    <label className={`${labelStyle} mt-4`}>Date of Birth (AD)</label>
                    <input
                      type="date"
                      name="dobAd"
                      value={formData.dobAd}
                      onChange={handleChange}
                      className={inputStyle}
                    />
                    {errors.dateOfBirth && (
                      <span className={errorStyle}>{errors.dateOfBirth.message}</span>
                    )}
                    
                    <label className={`${labelStyle} mt-4`}>Date of Birth (BS)</label>
                    <input
                      type="text"
                      readOnly
                      name="dobBs"
                      value={formData.dobBs}
                      onChange={handleChange}
                      className={`${inputStyle} bg-blue-gray-100`}
                    />
                    
                    <label className={`${labelStyle} mt-4`}>Citizenship No.</label>
                    <input
                      type="text"
                      name="citizenshipNumber"
                      value={formData.citizenshipNumber}
                      onChange={handleChange}
                      className={inputStyle}
                    />
                  </div>
                </div>
              </div>

              {/* Document Uploads */}
              <div className="bg-blue-gray-50 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-blue-gray-800 mb-6">Required Documents</h2>
                <div className="space-y-4">
                  <div>
                    <label className={labelStyle}>Upload Citizenship Image</label>
                    <input
                      type="file"
                      name="citizenshipImage"
                      accept="image/*"
                      onChange={handleChange}
                      className={`${inputStyle} file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-100`}
                    />
                    {errors.citizenshipImage && (
                      <span className={errorStyle}>{errors.citizenshipImage.message}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Permanent Address */}
              <div className="bg-blue-gray-50 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-blue-gray-800 mb-6">Permanent Address</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className={labelStyle}>Province</label>
                    <input
                      type="text"
                      name="permanentProvince"
                      value={formData.permanentProvince}
                      onChange={handleChange}
                      className={inputStyle}
                    />
                    {errors.permanentProvince && (
                      <span className={errorStyle}>{errors.permanentProvince.message}</span>
                    )}
                  </div>
                  <div>
                    <label className={labelStyle}>District</label>
                    <input
                      type="text"
                      name="permanentDistrict"
                      value={formData.permanentDistrict}
                      onChange={handleChange}
                      className={inputStyle}
                    />
                    {errors.permanentDistrict && (
                      <span className={errorStyle}>{errors.permanentDistrict.message}</span>
                    )}
                  </div>
                  <div>
                    <label className={labelStyle}>Ward Number</label>
                    <input
                      type="number"
                      name="permanentWardNumber"
                      value={formData.permanentWardNumber}
                      onChange={handleChange}
                      className={inputStyle}
                    />
                    {errors.permanentWardNumber && (
                      <span className={errorStyle}>{errors.permanentWardNumber.message}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Temporary Address */}
              <div className="bg-blue-gray-50 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-blue-gray-800 mb-6">Temporary Address</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className={labelStyle}>Province</label>
                    <input
                      type="text"
                      name="temporaryProvince"
                      value={formData.temporaryProvince}
                      onChange={handleChange}
                      className={inputStyle}
                    />
                  </div>
                  <div>
                    <label className={labelStyle}>District</label>
                    <input
                      type="text"
                      name="temporaryDistrict"
                      value={formData.temporaryDistrict}
                      onChange={handleChange}
                      className={inputStyle}
                    />
                  </div>
                  <div>
                    <label className={labelStyle}>Ward Number</label>
                    <input
                      type="number"
                      name="temporaryWardNumber"
                      value={formData.temporaryWardNumber}
                      onChange={handleChange}
                      className={inputStyle}
                    />
                  </div>
                </div>
              </div>

              {/* Passport Size Image */}
              <div className="bg-blue-gray-50 rounded-lg p-6">
                <div>
                  <label className={labelStyle}>Upload Passport-Size Image</label>
                  <input
                    type="file"
                    accept="passportSizeImage/*"
                    name="passportSizeImage"
                    onChange={handleChange}
                    className={`${inputStyle} file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-100`}
                  />
                  {errors.passportImage && (
                    <span className={errorStyle}>{errors.passportImage.message}</span>
                  )}
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

export default NationalId;