const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { check, validationResult } = require('express-validator');
const TaxForm = require('../models/TaxForm');

// Route to submit tax form data
router.post(
  '/TaxForm',
  authMiddleware, // Ensure authentication is done before submission
  [
    // Validation for Income, Deductions, and Tax Amount
    check('income', 'Income is required and should be a positive number').isFloat({ gte: 0 }),
    check('deductions', 'Deductions should be an array of strings').isArray(),
    check('taxAmount', 'Tax amount should be a positive number').isFloat({ gte: 0 }),
    check('totalTax', 'Total tax should be a positive number').isFloat({ gte: 0 }),
    check('deductionAmounts', 'Deduction amounts must be an object').isObject(),
    check('otherDeduction', 'Other deduction is optional but must be numeric if provided')
      .optional()
      .isNumeric(),
    // Optional validation for PAN Number if needed (for tax purposes)
    check('panNumber', 'PAN Number is required').notEmpty(),
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array()); // Log the validation errors to debug
      return res.status(400).json({ errors: errors.array() });
    }

    // Destructure the required fields from the request body
    const { income, deductions, deductionAmounts, otherDeduction, taxAmount, totalTax, panNumber } = req.body;

    // Prepare form data to be saved
    const formData = {
      income,
      deductions,
      deductionAmounts,
      otherDeduction,
      taxAmount,
      totalTax,
      panNumber,
    };

    try {
      // Create and save the tax form entry
      const newTaxForm = new TaxForm(formData);
      await newTaxForm.save();
      
      // Send a success response with the saved form data
      res.status(201).json({
        msg: 'Tax form submitted successfully',
        formData: newTaxForm,
      });
    } catch (err) {
      console.error('Error saving tax form:', err.message);
      res.status(500).json({ msg: 'Server error', error: err.message });
    }
  }
);

module.exports = router;