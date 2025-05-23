const mongoose = require('mongoose');

const LicenseSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    citizenshipNumber: {
        type: String,
        required: true,
    },
    bloodGroup: {
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

    },
    phone: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    licenseType: {
        type: String,
        required: true,
    },
    userImage: { type: String, required: true },
});
module.exports = mongoose.model('License', LicenseSchema);