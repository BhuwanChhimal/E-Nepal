import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";

const ComplaintBox = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const [formData, setFormData] = useState({
    province: "",
    district: "",
    municipality: "",
    department: "",
    complaint: "",
  });

  const districts = {
    Koshi: [
      "Bhojpur",
      "Dhankuta",
      "Ilam",
      "Jhapa",
      "Khotang",
      "Morang",
      "Okhaldhunga",
      "Panchthar",
      "Sankhuwasabha",
      "Solukhumbu",
      "Sunsari",
      "Taplejung",
      "Terhathum",
      "Udayapur",
    ],
    Madhesh: [
      "Saptari",
      "Siraha",
      "Dhanusa",
      "Mahottari",
      "Sarlahi",
      "Bara",
      "Parsa",
      "Rautahat",
    ],
    Bagmati: [
      "Sindhuli",
      "Ramechhap",
      "Dolakha",
      "Bhaktapur",
      "Dhading",
      "Kathmandu",
      "Kavrepalanchok",
      "Lalitpur",
      "Nuwakot",
      "Rasuwa",
      "Sindhupalchok",
      "Chitwan",
      "Makwanpur",
    ],
    Gandaki: [
      "Baglung",
      "Gorkha",
      "Kaski",
      "Lamjung",
      "Manang",
      "Mustang",
      "Myagdi",
      "Nawalpur",
      "Parbat",
      "Syangja",
      "Tanahun",
    ],
    Lumbini: [
      "Kapilvastu",
      "Parasi",
      "Rupandehi",
      "Arghakhanchi",
      "Gulmi",
      "Palpa",
      "Dang",
      "Pyuthan",
      "Rolpa",
      "Eastern Rukum",
      "Banke",
      "Bardiya",
    ],
    Karnali: [
      "Western Rukum",
      "Salyan",
      "Dolpa",
      "Humla",
      "Jumla",
      "Kalikot",
      "Mugu",
      "Surkhet",
      "Dailekh",
      "Jajarkot",
    ],
    Sudurpashchim: [
      "Kailali",
      "Achham",
      "Doti",
      "Bajhang",
      "Bajura",
      "Kanchanpur",
      "Dadeldhura",
      "Baitadi",
      "Darchula",
    ],
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

      console.log("Submitting form with token:", token);
      const res = await axios.post(
        "http://localhost:5001/api/complaintBox",
        formData,
        config
      );
      console.log("Response from backend:", res.data);
      setSuccessMessage(res.data.msg);
      setErrors({});
      navigate("/form-success");
    } catch (err) {
      console.error("Error from backend:", err.response.data);
      setErrors(err.response.data.errors || { msg: err.response.data.msg });
    }
  };

  return (
    <div className="max-w-3xl mx-auto my-10 p-8 border rounded-lg shadow-xl bg-gray-white">
      <h1 className="text-3xl font-bold mb-6 text-center text-red-600">
        Complaint Box
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <select
            name="province"
            value={formData.province}
            onChange={handleChange}
            className="w-full h-[2.8rem] mt-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
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
          <select
            name="district"
            value={formData.district}
            onChange={handleChange}
            className="w-full px-4 py-2 mt-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="">Select District</option>
            {districts[formData.province]?.map((district, index) => (
              <option key={index} value={district}>
                {district}
              </option>
            ))}
          </select>

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

export default ComplaintBox;
