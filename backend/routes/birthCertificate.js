const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const BirthCertificate = require('../models/BirthCertificate');
const { check, validationResult } = require('express-validator');

router.post(
  '/birthCertificate',
  authMiddleware,
  [
    check('firstName', 'First name is required').not().isEmpty(),
    check('lastName', 'Last name is required').not().isEmpty(),
    check('dobAd', 'Date of Birth (AD) is required').isDate(),
    check('dobBs', 'Date of Birth (BS) is required').not().isEmpty(),
    check('gender', 'Gender is required').not().isEmpty(),
    check('province', 'Province is required').not().isEmpty(),
    check('district', 'District is required').not().isEmpty(),
    check('municipality', 'Municipality is required').not().isEmpty(),
    check('address', 'Address is required').not().isEmpty(),
    check('birthPlace', 'Birth Place is required').not().isEmpty(),
    check('priorityLevel', 'Priority Level is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const formData = req.body;
    console.log('Received form data:', formData);

    try {
      const newBirthCertificate = new BirthCertificate(formData);
      await newBirthCertificate.save();
      res.json({ msg: 'Form data received and saved successfully', formData });
    } catch (err) {
      console.error('Error saving form data:', err.message);
      res.status(500).json({ msg: 'Server error', error: err.message });
    }
  }
);

module.exports = router;