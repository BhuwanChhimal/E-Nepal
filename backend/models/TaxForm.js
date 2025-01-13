const mongoose = require('mongoose');

const TaxFormSchema = new mongoose.Schema({
  income: { type: Number, required: true },
  deductions: { type: Number, required: true },
  taxAmount: { type: Number, required: true },
  totalTax: { type: Number, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  // Add any other fields needed (e.g., personal information like address, etc.)
});

module.exports = mongoose.model('TaxForm', TaxFormSchema);