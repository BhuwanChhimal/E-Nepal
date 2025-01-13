const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { check, validationResult } = require('express-validator');
const TaxForm = require('../models/TaxForm');

// Route to submit tax form data
router.post(
  '/TaxForm',
  authMiddleware,
  [
    // Validation for Income, Deductions, and Tax Amount
    check('income', 'Income is required and should be a positive number').isFloat({ gt: 0 }),
    check('deductions', 'Deductions should be a non-negative number').isFloat({ gte: 0 }),
    check('taxAmount', 'Tax amount should be a positive number').isFloat({ gt: 0 }),
    check('totalTax', 'Total tax should be a positive number').isFloat({ gt: 0 }),
    // Add more validation if necessary (e.g., user-related fields like email, phone number)
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { income, deductions, taxAmount, totalTax } = req.body;
    // const userId = req.user.id; // Assuming you're using auth middleware and req.user contains the user ID.

    // Prepare form data
    const formData = {
      income,
      deductions,
      taxAmount,
      totalTax,
      // user: userId
    };

    try {
      // Create and save the tax form entry
      const newTaxForm = new TaxForm(formData);
      await newTaxForm.save();
      res.json({ msg: 'Tax form submitted successfully', formData });
    } catch (err) {
      console.error('Error saving tax form:', err.message);
      res.status(500).json({ msg: 'Server error', error: err.message });
    }
  }
);

module.exports = router;