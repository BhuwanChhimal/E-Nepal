const mongoose = require('mongoose');

const CitizenshipSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
  dobAd: { type: Date, required: true },
  dobBs: { type: String, required: true },
  gender: { type: String, required: true },
  province: { type: String, required: true },
  district: { type: String, required: true },
  municipality: { type: String, required: true },
  wardNumber: { type: String, required: true },
  address: { type: String, required: true },
  fatherName: { type: String, required: true },
  motherName: { type: String, required: true },
  grandfatherName: { type: String },
  parentCitizenshipNumber: { type: String },
  citizenshipType: { type: String, required: true },
  reason: { type: String, required: true },
  image: { type: String },
});

module.exports = mongoose.model('Citizenship', CitizenshipSchema);