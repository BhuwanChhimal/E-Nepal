import axios from "axios";
import { ADToBS } from "bikram-sambat-js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
const Passport = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const [formData, setFormData] = useState({
    userId:"",
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
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
  const { user } = useAuth();
  const userId = user?._id
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
         setFormData({ ...formData, dobAd: value });
       }
     } else {
       setFormData({ ...formData, [name]: value });
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
      const res = await axios.post('http://localhost:5001/api/passport', formData, config);
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
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">Passport Application Form</h1>
      <p className="md:ml-[23%] text-blue-gray-400 -mt-5 mb-6">(fill all the form details according to your citizenship)</p>
      <form onSubmit={handleSubmit} className="space-y-6 uppercase">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Surname</label>
            <input
              type="text"
              name="surname"
              placeholder="Surname"
              value={formData.surname}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Given Name</label>
            <input
              type="text"
              name="givenName"
              placeholder="Given Name"
              value={formData.givenName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Nationality</label>
            <select 
               name="nationality"
               value={formData.nationality}
               onChange={handleChange}
               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="nepalese">Nepalese</option>
              <option value="others">Others</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="block text-gray-700 font-medium mb-2">Date of Birth (Ad)</label>
            <input
              type="date"
              name="dobAd"
              value={formData.dobAd}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
             <label className="block text-gray-700 font-medium mb-2">Date of Birth (Bs)</label>
            <input
              type="date"
              name="dobBs"
              value={formData.dobBs}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Citizenship Number</label>
            <input
              type="text"
              name="citizenshipNumber"
              placeholder="Citizenship Number"
              value={formData.citizenshipNumber}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Sex</label>
            <select
              name="sex"
              value={formData.sex}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Sex</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Place of Birth</label>
            <input
              type="text"
              name="placeOfBirth"
              placeholder="Place of Birth"
              value={formData.placeOfBirth}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Date of Issue</label>
            <input
              type="date"
              name="dateOfIssue"
              value={formData.dateOfIssue}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Place of Issue</label>
            <input
              type="text"
              name="placeOfIssue"
              placeholder="Place of Issue"
              value={formData.placeOfIssue}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {["district", "municipality", "wardNo", "tole", "email", "phone", "nextOfKin", "address", "relationship", "nextOfKinPhone"].map((field) => (
            <div key={field}>
              <label className="block text-gray-700 font-medium mb-2">{field.split(/(?=[A-Z])/).join(" ")}</label>
              <input
                type="text"
                name={field}
                placeholder={field.toUpperCase()}
                value={formData[field]}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Upload Your Image</label>
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
      </form>
    </div>
  );
};

export default Passport;