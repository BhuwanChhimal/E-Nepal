const mongoose = require('mongoose');

// Adjusting schema to better represent form data being submitted
const TaxFormSchema = new mongoose.Schema({
  income: { type: Number, required: true }, // User's total income
  deductions: { 
    type: [String], 
    required: true, // List of deductions selected by the user
  },
  deductionAmounts: { 
    type: Object, 
    required: true, // Object to store amounts for each deduction type
  },
  otherDeduction: { 
    type: String, 
    default: '' // User's custom "other" deduction if applicable
  },
  taxAmount: { 
    type: Number, 
    required: true, // Calculated tax amount after deductions
  },
  totalTax: { 
    type: Number, 
    required: true, // Final total tax after considering all deductions
  },
  panNumber: { 
    type: String, 
    required: true, // PAN Number of the user for tax calculation purposes
  },
  createdAt: { 
    type: Date, 
    default: Date.now, // Date when the tax form was submitted
  }
});

module.exports = mongoose.model('TaxForm', TaxFormSchema);