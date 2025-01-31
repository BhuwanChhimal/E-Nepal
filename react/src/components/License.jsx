import axios from "axios";
import { ADToBS } from "bikram-sambat-js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/license-icon.png";
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
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { user } = useAuth();
  const userId = user?._id;

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else if (name === "dobAd") {
      const adDate = new Date(value);
      if (!isNaN(adDate)) {
        const adDateString = `${adDate.getFullYear()}-${
          adDate.getMonth() + 1
        }-${adDate.getDate()}`;
        const bsDate = ADToBS(adDateString);
        setFormData((prevFormData) => ({
          ...prevFormData,
          dobAd: value,
          dobBs: bsDate,
          userId: userId,
        }));
      } else {
        setFormData({ ...formData, dobAd: value, userId: userId });
      }
    } else {
      setFormData({ ...formData, [name]: value, userId: userId });
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
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      const res = await axios.post(
        "http://localhost:5001/api/license",
        formData,
        config
      );
      setSuccessMessage(res.data.msg);
      setErrors({});
      navigate("/form-success");
    } catch (err) {
      console.error("Error from backend:", err.response.data);

      // Handle express-validator array format
      if (
        err.response.data?.errors &&
        Array.isArray(err.response.data.errors)
      ) {
        const errorArray = err.response.data.errors;
        const errorMessages = {};
        errorArray.forEach((error) => {
          errorMessages[error.path] = error.msg; // Convert array to object
        });
        setErrors(errorMessages);
      }
      // Handle other error formats
      else {
        setErrors(err.response.data || { msg: "An error occurred" });
      }
    }
  };

  const inputStyle =
    "w-full border border-blue-gray-300 rounded-md p-2 focus:ring-1 focus:ring-blue-500 focus:border-blue-500";
  const labelStyle = "block text-sm font-medium text-gray-700 mb-1";
  const errorStyle = "text-red-500 text-sm mt-1";

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="bg-white rounded-xl shadow-blue-gray-300 shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r relative from-blue-600 to-blue-700 px-6 py-8">
            <h1 className="text-3xl font-bold text-white text-center">
              Driving License Application Form
            </h1>
            <p className="text-blue-100 text-center mt-2">
              Government of Nepal
            </p>
            <span className="absolute hidden md:block left-2 md:left-8 md:top-8 top-12">
              <img src={logo} alt="logo" className="w-16 h-16 " />
            </span>
          </div>

          <div className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Details */}
              <div className="bg-blue-gray-50 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-blue-gray-800 mb-6">
                  Personal Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelStyle}>Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className={inputStyle}
                      placeholder="Full Name"
                    />
                    {errors.fullName && (
                      <p className={errorStyle}>{errors.fullName}</p>
                    )}
                  </div>
                  <div>
                    <label className={labelStyle}>Date of Birth</label>
                    <input
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      className={inputStyle}

                    />
                    {errors.dob && <p className={errorStyle}>{errors.dob}</p>}
                  </div>
                  <div>
                    <label className={labelStyle}>Blood Group</label>
                    <select
                      name="bloodGroup"
                      value={formData.bloodGroup}
                      onChange={handleChange}
                      className={inputStyle}
      
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
                    {errors.bloodGroup && (
                      <p className={errorStyle}>{errors.bloodGroup}</p>
                    )}
                  </div>
                  <div>
                    <label className={labelStyle}>Citizenship Number</label>
                    <input
                      type="text"
                      name="citizenshipNumber"
                      value={formData.citizenshipNumber}
                      onChange={handleChange}
                      className={inputStyle}
                      placeholder="Citizenship No."
                    />
                    {errors.citizenshipNumber && (
                      <p className={errorStyle}>{errors.citizenshipNumber}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Address Details */}
              <div className="bg-blue-gray-50 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-blue-gray-800 mb-6">
                  Address Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelStyle}>District</label>
                    <input
                      type="text"
                      name="district"
                      value={formData.district}
                      onChange={handleChange}
                      className={inputStyle}
                      placeholder="District"
                    />
                    {errors.district && (
                      <p className={errorStyle}>{errors.district}</p>
                    )}
                  </div>
                  <div>
                    <label className={labelStyle}>Municipality</label>
                    <input
                      type="text"
                      name="municipality"
                      value={formData.municipality}
                      onChange={handleChange}
                      className={inputStyle}
                      placeholder="Municipality"
                    />
                    {errors.municipality && (
                      <p className={errorStyle}>{errors.municipality}</p>
                    )}
                  </div>
                  <div>
                    <label className={labelStyle}>Ward No</label>
                    <input
                      type="text"
                      name="wardNo"
                      value={formData.wardNo}
                      onChange={handleChange}
                      className={inputStyle}
                      placeholder="Ward No."
                    />
                    {errors.wardNo && (
                      <p className={errorStyle}>{errors.wardNo}</p>
                    )}
                  </div>
                  <div>
                    <label className={labelStyle}>Tole</label>
                    <input
                      type="text"
                      name="tole"
                      value={formData.tole}
                      onChange={handleChange}
                      className={inputStyle}
                      placeholder="Tole"
                    />
                    {errors.tole && <p className={errorStyle}>{errors.tole}</p>}
                  </div>
                </div>
              </div>

              {/* Contact Details */}
              <div className="bg-blue-gray-50 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-blue-gray-800 mb-6">
                  Contact Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelStyle}>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email"
                      className={inputStyle}
                    />
                    {errors.email && (
                      <p className={errorStyle}>{errors.email}</p>
                    )}
                  </div>
                  <div>
                    <label className={labelStyle}>Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={inputStyle}
                      placeholder="Phone No."
                    />
                    {errors.phone && (
                      <p className={errorStyle}>{errors.phone}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* License Details */}
              <div className="bg-blue-gray-50 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-blue-gray-800 mb-6">
                  License Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelStyle}>Vehicle Category</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className={inputStyle}
                    >
                      <option value="">Select Vehicle Category</option>
                      <option value="A">A - Two-Wheeler</option>
                      <option value="B">B - Four-Wheeler</option>
                      <option value="C">C - Heavy Vehicle</option>
                      <option value="D">D - Tractor</option>
                      <option value="E">E - Public Bus</option>
                    </select>
                    {errors.category && (
                      <p className={errorStyle}>{errors.category}</p>
                    )}
                  </div>
                  <div>
                    <label className={labelStyle}>License Type</label>
                    <select
                      name="licenseType"
                      value={formData.licenseType}
                      onChange={handleChange}
                      className={inputStyle}
                    >
                      <option value="">Select License Type</option>
                      <option value="New">New</option>
                      <option value="Renewal">Renewal</option>
                      <option value="Duplicate">Duplicate</option>
                    </select>
                    {errors.licenseType && (
                      <p className={errorStyle}>{errors.licenseType}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Document Upload */}
              <div className="bg-blue-gray-50 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-blue-gray-800 mb-6">
                  Required Documents
                </h2>
                <div>
                  <label className={labelStyle}>Upload Your Image</label>
                  <input
                    type="file"
                    name="userImage"
                    accept="image/*"
                    onChange={handleChange}
                    className={`${inputStyle} file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-100`}
                  />
                  {errors.userImage && (
                    <p className={errorStyle}>{errors.userImage}</p>
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
                <p className="text-green-500 text-sm mt-4 text-center">
                  {successMessage}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default License;
