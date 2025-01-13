const mongoose = require('mongoose');

const PassportSchema = new mongoose.Schema({
  surname: {
    type: String,
    required: true,
  },
  givenName: {
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
  nationality: {
    type: String,
    required: true,
  },
  sex: {
    type: String,
    required: true,
  },

  citizenshipNumber: {
    type: String,
    required: true,
  },
  placeOfBirth: {
    type: String,
    required: true,
  },
  dateOfIssue: {
    type: Date,
    required: true,
  },
  placeOfIssue: {
    type: String,
    required: true,
  },
    district: {
        type: String,
        required: true,
    },
    municipality: {
        type: String,
        required: true,
    },
    wardNo: {
        type: String,
        required: true,
    },
    tole: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    nextOfKin: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    relationship: {
        type: String,
        required: true,
    },
    nextOfKinPhone: {
        type: String,
        required: true,
    },
    userImage: { type: String, required: true },
});

module.exports = mongoose.model('Passport', PassportSchema);