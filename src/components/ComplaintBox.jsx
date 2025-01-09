
import { useEffect } from 'react';
import { useState } from 'react';

const ComplaintBox = () => {
  useEffect(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, []);
    const [formData, setFormData] = useState({
        province: "",
        district: "",
        municipality: "",
        department: "",
        complaint: "",
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
    
        // Form validation
        for (let field in formData) {
          if (!formData[field]) {
            alert(`${field} is required`);
            return;
          }
        }
    
        alert("Complaint submitted successfully!");
        console.log(formData);
      };
    
      return (
        <div className="max-w-3xl mx-auto my-10 p-8 border rounded-lg shadow-xl bg-gray-white">
          <h1 className="text-3xl font-bold mb-6 text-center text-red-600">Complaint Box</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <select
                name="province"
                value={formData.province}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">Select Province</option>
                <option value="Province 1">Province 1</option>
                <option value="Province 2">Province 2</option>
                <option value="Bagmati">Bagmati</option>
                <option value="Gandaki">Gandaki</option>
                <option value="Lumbini">Lumbini</option>
                <option value="Karnali">Karnali</option>
                <option value="Sudurpashchim">Sudurpashchim</option>
              </select>
    
              <input
                type="text"
                name="district"
                placeholder="District"
                value={formData.district}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
    
              <input
                type="text"
                name="municipality"
                placeholder="Municipality"
                value={formData.municipality}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
    
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
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
    
            <textarea
              name="complaint"
              placeholder="Write your complaint here..."
              value={formData.complaint}
              onChange={handleChange}
              rows="5"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            ></textarea>
    
            <button
              type="submit"
              className="w-full bg-red-500 text-white py-3 px-6 rounded-lg font-medium text-lg hover:bg-red-600 transition duration-300"
            >
              Submit Complaint
            </button>
          </form>
        </div>
      );
    };

export default ComplaintBox