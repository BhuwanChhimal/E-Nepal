
import { useEffect, useState } from 'react';

const PanCard = () => {
  useEffect(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, []);
    const [formData, setFormData] = useState({
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
        <div className="max-w-3xl mx-auto my-5 p-8 border rounded-lg shadow-xl bg-gray-light">
          <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">PAN Card Registration Form</h1>
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
              className="px-6 py-2 bg-blue-800 shadow-lg text-white font-bold rounded-md hover:bg-blue-600"
            >
              Submit
            </button>
          </form>
        </div>
      );
    };

export default PanCard