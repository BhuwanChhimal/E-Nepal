const mongoose = require('mongoose');

const TaxFormSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    panNumber: { type: String, required: true },
    incomeType: { type: Array, required: true },
    incomeAmount: { type: Number, required: true },
    deductionType: { type: Array, required: true },
    deductionAmount: { type: Number, required: true },
    taxAmount: { type: Number, required: true },  // Add taxAmount field
});

module.exports = mongoose.model('TaxForm', TaxFormSchema);