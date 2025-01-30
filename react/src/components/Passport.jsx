import axios from "axios";
import { ADToBS } from "bikram-sambat-js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/passport-icon.png";
const Passport = () => {
  // useEffect(() => {
  //   window.scrollTo({
  //     top: 0,
  //     behavior: "smooth",
  //   });
  // }, []);

  const [formData, setFormData] = useState({
    userId: "",
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
        setFormData({ ...formData, dobAd: value });
      }
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
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      console.log("Submitting form with token:", token);
      const res = await axios.post(
        "http://localhost:5001/api/passport",
        formData,
        config
      );
      console.log("Response from backend:", res.data);
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
              Passport Application Form
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
                    <label className={labelStyle}>Surname</label>
                    <input
                      type="text"
                      name="surname"
                      value={formData.surname}
                      onChange={handleChange}
                      className={inputStyle}
                    />
                    {errors.surname && (
                      <span className={errorStyle}>{errors.surname}</span>
                    )}
                  </div>
                  <div>
                    <label className={labelStyle}>Given Name</label>
                    <input
                      type="text"
                      name="givenName"
                      value={formData.givenName}
                      onChange={handleChange}
                      className={inputStyle}
                    />
                     {errors.givenName && (
                      <span className={errorStyle}>{errors.givenName}</span>
                    )}
                  </div>
                  <div>
                    <label className={labelStyle}>Nationality</label>
                    <select
                      name="nationality"
                      value={formData.nationality}
                      onChange={handleChange}
                      className={inputStyle}
                    >
                      <option value="">Choose your nationality</option>
                      <option value="nepalese">Nepalese</option>
                      <option value="others">Others</option>
                    </select>
                    {errors.nationality && (
                      <span className={errorStyle}>{errors.nationality}</span>
                    )}
                  </div>
                  <div>
                    <label className={labelStyle}>Sex</label>
                    <select
                      name="sex"
                      value={formData.sex}
                      onChange={handleChange}
                      className={inputStyle}
                    >
                      <option value="">Select Sex</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Others">Other</option>
                    </select>
                    {errors.sex && (
                      <span className={errorStyle}>{errors.sex}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Birth and Citizenship Details */}
              <div className="bg-blue-gray-50 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-blue-gray-800 mb-6">
                  Birth and Citizenship Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelStyle}>Date of Birth (AD)</label>
                    <input
                      type="date"
                      name="dobAd"
                      value={formData.dobAd}
                      onChange={handleChange}
                      className={inputStyle}
                    />
                     {errors.dobAd && (
                      <span className={errorStyle}>{errors.dobAd}</span>
                    )}
                  </div>
                  <div>
                    <label className={labelStyle}>Date of Birth (BS)</label>
                    <input
                      type="date"
                      name="dobBs"
                      value={formData.dobBs}
                      onChange={handleChange}
                      className={inputStyle}
                    />
                  </div>
                  <div>
                    <label className={labelStyle}>Place of Birth</label>
                    <input
                      type="text"
                      name="placeOfBirth"
                      value={formData.placeOfBirth}
                      onChange={handleChange}
                      className={inputStyle}
                    />
                     {errors.placeOfBirth && (
                      <span className={errorStyle}>{errors.placeOfBirth}</span>
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
                    />
                    {errors.citizenshipNumber && (
                      <span className={errorStyle}>{errors.citizenshipNumber}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Issue Details */}
              <div className="bg-blue-gray-50 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-blue-gray-800 mb-6">
                  Issue Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelStyle}>Date of Issue</label>
                    <input
                      type="date"
                      name="dateOfIssue"
                      value={formData.dateOfIssue}
                      onChange={handleChange}
                      className={inputStyle}
                    />
                     {errors.dateOfIssue && (
                      <span className={errorStyle}>{errors.dateOfIssue}</span>
                    )}
                  </div>
                  <div>
                    <label className={labelStyle}>Place of Issue</label>
                    <input
                      type="text"
                      name="placeOfIssue"
                      value={formData.placeOfIssue}
                      onChange={handleChange}
                      className={inputStyle}
                    />
                    {errors.placeOfIssue && (
                      <span className={errorStyle}>{errors.placeOfIssue}</span>
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
                    />
                    {errors.district && (
                      <span className={errorStyle}>{errors.district}</span>
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
                    />
                    {errors.municipality && (
                      <span className={errorStyle}>{errors.municipality}</span>
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
                    />
                    {errors.wardNo && (
                      <span className={errorStyle}>{errors.wardNo}</span>
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
                    />
                    {errors.tole && (
                      <span className={errorStyle}>{errors.tole}</span>
                    )}
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
                      className={inputStyle}
                    />

                  </div>
                  <div>
                    <label className={labelStyle}>Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={inputStyle}
                    />
                    {errors.phone && (
                      <span className={errorStyle}>{errors.phone}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Next of Kin Details */}
              <div className="bg-blue-gray-50 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-blue-gray-800 mb-6">
                  Next of Kin Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelStyle}>Next of Kin Name</label>
                    <input
                      type="text"
                      name="nextOfKin"
                      value={formData.nextOfKin}
                      onChange={handleChange}
                      className={inputStyle}
                    />
                    {errors.nextOfKin && (
                      <span className={errorStyle}>{errors.nextOfKin}</span>
                    )}
                  </div>
                  <div>
                    <label className={labelStyle}>Relationship</label>
                    <input
                      type="text"
                      name="relationship"
                      value={formData.relationship}
                      onChange={handleChange}
                      className={inputStyle}
                    />
                    {errors.relationship && (
                      <span className={errorStyle}>{errors.relationship}</span>
                    )}
                  </div>
                  <div>
                    <label className={labelStyle}>Next of Kin Phone</label>
                    <input
                      type="tel"
                      name="nextOfKinPhone"
                      value={formData.nextOfKinPhone}
                      onChange={handleChange}
                      className={inputStyle}
                    />
                    {errors.nextOfKinPhone && (
                      <span className={errorStyle}>{errors.nextOfKinPhone}</span>
                    )}
                  </div>
                  <div>
                    <label className={labelStyle}>Next of Kin Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className={inputStyle}
                    />
                    {errors.address && (
                      <span className={errorStyle}>{errors.address}</span>
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
                      <span className={errorStyle}>{errors.userImage}</span>
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

export default Passport;
