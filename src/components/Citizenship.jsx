import { useEffect } from 'react';
import { useState } from 'react';

const Citizenship = () => {
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
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && file.size > 5 * 1024 * 1024) {
          setErrors({ ...errors, image: "Image must be less than 5MB." });
        } else {
          setFormData({ ...formData, image: file });
          setErrors({ ...errors, image: null });
        }
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
        if (!formData.wardNumber) newErrors.wardNumber = "Ward Number is required.";
        if (!formData.address) newErrors.address = "Address is required.";
        if (!formData.fatherName) newErrors.fatherName = "Father's Name is required.";
        if (!formData.motherName) newErrors.motherName = "Mother's Name is required.";
        if (!formData.grandfatherName) newErrors.grandfatherName = "Grandfather's Name is required.";
        if (!formData.parentCitizenshipNumber) newErrors.parentCitizenshipNumber = "Parent's Citizenship Number is required.";
        if (!formData.citizenshipType) newErrors.citizenshipType = "Citizenship Type is required.";
        if (!formData.reason) newErrors.reason = "Reason for Citizenship is required.";
    
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
    
            {/* Parental Details */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Parental Details</h3>
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
              </div>
              <div className="mt-4">
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
                onChange={handleImageChange}
                className="w-full p-2 border rounded-md"
              />
              {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
            </div>
    
            {/* Submit Button */}
            <div className="text-center flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-800 text-white bg-black font-bold rounded-md hover:bg-blue-600"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
);
};


export default Citizenship