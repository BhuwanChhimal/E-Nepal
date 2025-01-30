const mongoose = require('mongoose');

const NationalIdSchema = new mongoose.Schema({
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
},
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: true,
  },
  dobAd: {
    type: Date,
    required: true,
  },
  dobBs: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },

  citizenshipNumber: {
    type: String,
    required: true,
  },
  permanentProvince: {
    type: String,
    required: true,
  },
  permanentDistrict: {
    type: String,
    required: true,
  },
  permanentWardNumber: {
    type: String,
    required: true,
  },
  temporaryProvince: {
    type: String,
    required: true,
  },
  temporaryDistrict: {
    type: String,
    required: true,
  },
  temporaryWardNumber: {
    type: String,
    required: true,
  },
  citizenshipImage: { type: String },
  passportSizeImage: { type: String },
});

module.exports = mongoose.model('NationalId', NationalIdSchema);