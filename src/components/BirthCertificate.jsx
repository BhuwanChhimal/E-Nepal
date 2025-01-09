import { useEffect } from "react";
import { useState } from "react";
import backgroundImage from "../assets/backimg.jpg";
const BirthCertificate = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);
    const [formData, setFormData] = useState({
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
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const validate = () => {
      const newErrors = {};
  
      if (!formData.firstName) newErrors.firstName = "First Name is required.";
      if (!formData.lastName) newErrors.lastName = "Last Name is required.";
      if (!formData.dobAd) newErrors.dobAd = "Date of Birth (AD) is required.";
      if (!formData.gender) newErrors.gender = "Gender is required.";
      if (!formData.province) newErrors.province = "Province is required.";
      if (!formData.district) newErrors.district = "District is required.";
      if (!formData.municipality) newErrors.municipality = "Municipality is required.";
      if (!formData.address) newErrors.address = "Address is required.";
      if (!formData.birthPlace) newErrors.birthPlace = "Birth Place is required.";
      if (!formData.priorityLevel) newErrors.priorityLevel = "Priority Level is required.";
  
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (validate()) {
        console.log("Form Submitted", formData);
        alert("Form submitted successfully!");
      }
    };
  return (
   
    <div className="max-w-4xl mx-auto my-5 bg-gray-light p-8 rounded-lg shadow-md">
    <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">Birth Certificate Application</h1>
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
              placeholder="YYYY-MM-DD"
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium mb-1">Gender</label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={formData.gender === "Male"}
                onChange={handleChange}
                className="mr-2"
              />
              Male
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={formData.gender === "Female"}
                onChange={handleChange}
                className="mr-2"
              />
              Female
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="Other"
                checked={formData.gender === "Other"}
                onChange={handleChange}
                className="mr-2"
              />
              Other
            </label>
          </div>
          {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
        </div>
      </div>

      {/* Address */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Address</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
        <div className="mt-4">
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

      {/* Birth Information */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Birth Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Birth Place</label>
            <input
              type="text"
              name="birthPlace"
              value={formData.birthPlace}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="Home/Hospital/Other"
            />
            {errors.birthPlace && <p className="text-red-500 text-sm">{errors.birthPlace}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Priority Level</label>
            <select
              name="priorityLevel"
              value={formData.priorityLevel}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            >
              <option value="">Select</option>
              <option value="emergency">Emergency</option>
              <option value="normal">Normal</option>
            </select>
            {errors.priorityLevel && <p className="text-red-500 text-sm">{errors.priorityLevel}</p>}
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="text-center flex justify-end">
        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 shadow-lg text-white bg-black font-bold rounded-md hover:bg-blue-gray-600"
        >
          Submit
        </button>
      </div>
    </form>
  </div>

);
};
export default BirthCertificate;
