import React from 'react'
import { useState } from 'react';

const License = () => {
    const [formData, setFormData] = useState({
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
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, userImage: file });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
    
        // Form validation
        for (let field in formData) {
          if (!formData[field] && field !== "userImage") {
            alert(`${field} is required`);
            return;
          }
        }
    
        alert("Form submitted successfully!");
        console.log(formData);
      };
    
      return (
        <div className="max-w-3xl mx-auto mt-10 p-8 border rounded-lg shadow-xl bg-white">
          <h1 className="text-3xl font-bold mb-6 text-center text-green-600">Driving License Registration Form</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="date"
                name="dob"
                placeholder="Date of Birth"
                value={formData.dob}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="text"
                name="citizenshipNumber"
                placeholder="Citizenship Number"
                value={formData.citizenshipNumber}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <select
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
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="text"
                name="district"
                placeholder="District"
                value={formData.district}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="text"
                name="municipality"
                placeholder="Municipality"
                value={formData.municipality}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="text"
                name="wardNo"
                placeholder="Ward No"
                value={formData.wardNo}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="text"
                name="tole"
                placeholder="Tole"
                value={formData.tole}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select Vehicle Category</option>
                <option value="A">A - Two-Wheeler</option>
                <option value="B">B - Four-Wheeler</option>
                <option value="C">C - Heavy Vehicle</option>
              </select>
              <select
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
            </div>
    
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="userImage">
                Upload Your Image
              </label>
              <input
                type="file"
                name="userImage"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
    
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 shadow-lg text-white bg-black font-bold rounded-md hover:bg-blue-gray-600"
            >
              Submit
            </button>
          </form>
        </div>
      );
    };
    

export default License