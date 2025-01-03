import React, { useState } from 'react'

const Passport = () => {
    const [formData, setFormData] = useState({
        surname: "",
        givenName: "",
        nationality: "",
        dob: "",
        citizenshipNumber: "",
        sex: "",
        placeOfBirth: "",
        dateOfIssue: "",
        placeOfIssue: "",
        passportNumber: "",
        district: "",
        municipality: "",
        wardNo: "",
        tole: "",
        email: "",
        phone: "",
        nextOfKin: "",
        address: "",
        relationship: "",
        nextOfKinPhone: "",
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
          <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Passport Application Form</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                name="surname"
                placeholder="Surname"
                value={formData.surname}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="givenName"
                placeholder="Given Name"
                value={formData.givenName}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="nationality"
                placeholder="Nationality"
                value={formData.nationality}
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
              <select
                name="sex"
                value={formData.sex}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Sex</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <input
                type="text"
                name="placeOfBirth"
                placeholder="Place of Birth"
                value={formData.placeOfBirth}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="date"
                name="dateOfIssue"
                placeholder="Date of Issue"
                value={formData.dateOfIssue}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="placeOfIssue"
                placeholder="Place of Issue"
                value={formData.placeOfIssue}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="passportNumber"
                placeholder="Passport Number"
                value={formData.passportNumber}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
    
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                name="nextOfKin"
                placeholder="Next of Kin"
                value={formData.nextOfKin}
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
                name="relationship"
                placeholder="Relationship"
                value={formData.relationship}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="nextOfKinPhone"
                placeholder="Next of Kin Phone"
                value={formData.nextOfKinPhone}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
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
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
    

export default Passport