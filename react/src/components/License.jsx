import axios from "axios";
import { ADToBS } from "bikram-sambat-js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {useAuth} from '../context/AuthContext';

const License = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const [formData, setFormData] = useState({
    userId: "",
    fullName: "",
    dob: "",
    citizenshipNumber: "",
    bloodGroup: "",
    address: "",
    district: "",
    municipality: "",
    wardNo: "",
    tole: "",
    email: "",
    phone: "",
    category: "",
    licenseType: "",
    userImage: null,
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const { user } = useAuth();
  const userId= user?._id;

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
        setFormData({ ...formData, dobAd: value, userId: userId })
      }
    } else {
      setFormData({ ...formData, [name]: value , userId: userId });
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

      // console.log('Submitting form with token:', token);
      const res = await axios.post('http://localhost:5001/api/license', formData, config);
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
    <div className="max-w-3xl mx-auto my-5 px-8 py-5 rounded-lg shadow-xl bg-gray-light">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">
        Driving License Registration Form
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="fullName" className="block text-gray-700 font-medium">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
          </div>
          <div>
            <label htmlFor="dob" className="block text-gray-700 font-medium">
              Date of Birth
            </label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}
          </div>
          <div>
            <label htmlFor="citizenshipNumber" className="block text-gray-700 font-medium">
              Citizenship Number
            </label>
            <input
              type="text"
              id="citizenshipNumber"
              name="citizenshipNumber"
              placeholder="Citizenship Number"
              value={formData.citizenshipNumber}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.citizenshipNumber && <p className="text-red-500 text-sm">{errors.citizenshipNumber}</p>}
          </div>
          <div>
            <label htmlFor="bloodGroup" className="block text-gray-700 font-medium">
              Blood Group
            </label>
            <select
              id="bloodGroup"
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
            {errors.bloodGroup && <p className="text-red-500 text-sm">{errors.bloodGroup}</p>}
          </div>
          <div>
            <label htmlFor="address" className="block text-gray-700 font-medium">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
          </div>
          <div>
            <label htmlFor="district" className="block text-gray-700 font-medium">
              District
            </label>
            <input
              type="text"
              id="district"
              name="district"
              placeholder="District"
              value={formData.district}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.district && <p className="text-red-500 text-sm">{errors.district}</p>}
          </div>
          <div>
            <label htmlFor="municipality" className="block text-gray-700 font-medium">
              Municipality
            </label>
            <input
              type="text"
              id="municipality"
              name="municipality"
              placeholder="Municipality"
              value={formData.municipality}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.municipality && <p className="text-red-500 text-sm">{errors.municipality}</p>}
          </div>
          <div>
            <label htmlFor="wardNo" className="block text-gray-700 font-medium">
              Ward No
            </label>
            <input
              type="text"
              id="wardNo"
              name="wardNo"
              placeholder="Ward No"
              value={formData.wardNo}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.wardNo && <p className="text-red-500 text-sm">{errors.wardNo}</p>}
          </div>
          <div>
            <label htmlFor="tole" className="block text-gray-700 font-medium">
              Tole
            </label>
            <input
              type="text"
              id="tole"
              name="tole"
              placeholder="Tole"
              value={formData.tole}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.tole && <p className="text-red-500 text-sm">{errors.tole}</p>}
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="phone" className="block text-gray-700 font-medium">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
          </div>
          <div>
            <label htmlFor="category" className="block text-gray-700 font-medium">
              Vehicle Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select Vehicle Category</option>
              <option value="A">A - Two-Wheeler</option>
              <option value="B">B - Four-Wheeler</option>
              <option value="C">C - Heavy Vehicle</option>
              <option value="D">D - Tractor</option>
              <option value="E">E - Public Bus</option>
            </select>
            {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
          </div>
          <div>
            <label htmlFor="licenseType" className="block text-gray-700 font-medium">
              License Type
            </label>
            <select
              id="licenseType"
              name="licenseType"
              value={formData.licenseType}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select License Type</option>
              <option value="New">New</option>
              <option value="Renewal">Renewal</option>
              <option value="Duplicate">Duplicate</option>
            </select>
            {errors.licenseType && <p className="text-red-500 text-sm">{errors.licenseType}</p>}
          </div>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="userImage"
          >
            Upload Your Image
          </label>
          <input
            type="file"
            id="userImage"
            name="userImage"
            accept="image/*"
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {errors.userImage && <p className="text-red-500 text-sm">{errors.userImage}</p>}
        </div>

        <button
          type="submit"
          className="px-6 py-2 bg-blue-800 shadow-lg text-white font-bold rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
        {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}
      </form>
    </div>
  );
};

export default License;