import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import logo from "../assets/complaintbox-icon.png"
const ComplaintBox = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const [formData, setFormData] = useState({
    province: "",
    district: "",
    municipality: "",
    department: "",
    complaint: "",
  });

  const districts = {
    Koshi: ["Bhojpur", "Dhankuta", "Ilam", "Jhapa", "Khotang", "Morang", "Okhaldhunga", "Panchthar", "Sankhuwasabha", "Solukhumbu", "Sunsari", "Taplejung", "Terhathum", "Udayapur"],
    Madhesh: ["Saptari", "Siraha", "Dhanusa", "Mahottari", "Sarlahi", "Bara", "Parsa", "Rautahat"],
    Bagmati: ["Sindhuli", "Ramechhap", "Dolakha", "Bhaktapur", "Dhading", "Kathmandu", "Kavrepalanchok", "Lalitpur", "Nuwakot", "Rasuwa", "Sindhupalchok", "Chitwan", "Makwanpur"],
    Gandaki: ["Baglung", "Gorkha", "Kaski", "Lamjung", "Manang", "Mustang", "Myagdi", "Nawalpur", "Parbat", "Syangja", "Tanahun"],
    Lumbini: ["Kapilvastu", "Parasi", "Rupandehi", "Arghakhanchi", "Gulmi", "Palpa", "Dang", "Pyuthan", "Rolpa", "Eastern Rukum", "Banke", "Bardiya"],
    Karnali: ["Western Rukum", "Salyan", "Dolpa", "Humla", "Jumla", "Kalikot", "Mugu", "Surkhet", "Dailekh", "Jajarkot"],
    Sudurpashchim: ["Kailali", "Achham", "Doti", "Bajhang", "Bajura", "Kanchanpur", "Dadeldhura", "Baitadi", "Darchula"],
  };

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      console.error("No token found");
      setErrors({ msg: "No token found" });
      return;
    }

    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const res = await axios.post(
        "http://localhost:5001/api/complaintBox",
        formData,
        config
      );
      setSuccessMessage(res.data.msg);
      setErrors({});
      navigate("/form-success");
    } catch (err) {
      setErrors(err.response.data.errors || { msg: err.response.data.msg });
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-8 bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header Section */}
      <div className="bg-gradient-to-r relative from-red-400 to-red-600 px-6 py-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Submit a Complaint</h2>
        <p className="text-blue-100">
          Please provide detailed information about your complaint
        </p>
         <span className='absolute hidden md:block left-2 md:left-8 md:top-8 top-12'>
                      <img src={logo} alt="logo" className="w-16 h-16 "  />
                    </span>
      </div>

      {/* Error Message */}
      {errors.msg && (
        <div className="bg-red-50 text-red-700 p-4 mb-6 border-l-4 border-red-500">
          {errors.msg}
        </div>
      )}

      {/* Form Section */}
      <div className="p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Province Selection */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Province
              </label>
              <select
                name="province"
                value={formData.province}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200 bg-white shadow-sm"
              >
                <option value="">Select Province</option>
                <option value="Koshi">1. Koshi</option>
                <option value="Madhesh">2. Madhesh</option>
                <option value="Bagmati">3. Bagmati</option>
                <option value="Gandaki">4. Gandaki</option>
                <option value="Lumbini">5. Lumbini</option>
                <option value="Karnali">6. Karnali</option>
                <option value="Sudurpashchim">7. Sudurpashchim</option>
              </select>
            </div>

            {/* District Selection */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                District
              </label>
              <select
                name="district"
                value={formData.district}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200 bg-white shadow-sm"
              >
                <option value="">Select District</option>
                {districts[formData.province]?.map((district, index) => (
                  <option key={index} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </div>

            {/* Municipality Input */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Municipality
              </label>
              <input
                type="text"
                name="municipality"
                value={formData.municipality}
                onChange={handleChange}
                placeholder="Enter municipality name"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200 bg-white shadow-sm"
              />
            </div>

            {/* Department Selection */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Department
              </label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200 bg-white shadow-sm"
              >
                <option value="">Select Department</option>
                <option value="Transportation">Transportation</option>
                <option value="Electricity">Electricity</option>
                <option value="Water Supply">Water Supply</option>
                <option value="Health">Health</option>
                <option value="Education">Education</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Complaint Textarea */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Complaint Details
            </label>
            <textarea
              name="complaint"
              value={formData.complaint}
              onChange={handleChange}
              rows="5"
              placeholder="Please provide detailed information about your complaint..."
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200 bg-white shadow-sm resize-none"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 transform hover:-translate-y-0.5 shadow-md"
            >
              Submit Complaint
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ComplaintBox;