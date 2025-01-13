const mongoose = require('mongoose');

const ComplaintBoxSchema = new mongoose.Schema({
    province: {
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
    department: {
        type: String,
        required: true,
    },
    complaint: {
        type: String,
        required: true,
    },
})
module.exports = mongoose.model('ComplaintBox', ComplaintBoxSchema);