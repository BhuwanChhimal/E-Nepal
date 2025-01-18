import axios from "axios";
import { ADToBS } from "bikram-sambat-js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {useAuth} from '../context/AuthContext';
const PanCard = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  const [formData, setFormData] = useState({
    userId: "",
    fullName: "",
    fatherName: "",
    dob: "",
    citizenshipNumber: "",
    address: "",
    district: "",
    municipality: "",
    wardNo: "",
    tole: "",
    email: "",
    phone: "",
    occupation: "",
    userImage: null,
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const {user}=useAuth();
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
        setFormData({ ...formData, dobAd: value ,userId: userId,});
      }
    } else {
      setFormData({ ...formData, [name]: value ,userId: userId,});
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
      const res = await axios.post('http://localhost:5001/api/panCard', formData, config);
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
    <div className="max-w-3xl mx-auto my-5 p-8 border rounded-lg shadow-xl bg-gray-light">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">
        PAN Card Registration Form
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="fatherName"
            placeholder="Father's Name"
            value={formData.fatherName}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            name="dob"
            placeholder="Date of Birth"
            value={formData.dob}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="citizenshipNumber"
            placeholder="Citizenship Number"
            value={formData.citizenshipNumber}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="district"
            placeholder="District"
            value={formData.district}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="municipality"
            placeholder="Municipality"
            value={formData.municipality}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="wardNo"
            placeholder="Ward No"
            value={formData.wardNo}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="tole"
            placeholder="Tole"
            value={formData.tole}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="occupation"
            placeholder="Occupation"
            value={formData.occupation}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
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
            name="userImage"
            accept="image/*"
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="px-6 py-2 bg-blue-800 shadow-lg text-white font-bold rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
        {successMessage && <p className="text-green">{successMessage}</p>}
      </form>
    </div>
  );
};

export default PanCard;
