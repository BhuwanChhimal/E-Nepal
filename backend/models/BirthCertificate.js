// filepath: /ENepal/backend/models/BirthCertificate.js
const mongoose = require("mongoose");

const BirthCertificateSchema = new mongoose.Schema({
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User",
  //   required: true,
  // },
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
  dobAd: { type: Date, required: true },
  dobBs: { type: String, required: true },
  gender: { type: String, required: true },
  province: { type: String, required: true },
  district: { type: String, required: true },
  municipality: { type: String, required: true },
  address: { type: String, required: true },
  birthPlace: {
    type: String,
    required: true,
  },
  priorityLevel: {
    type: String,
    required: true,
  },
  // Add other fields as necessary
});

module.exports = mongoose.model("BirthCertificate", BirthCertificateSchema);
