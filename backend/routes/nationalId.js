const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const NationalId = require('../models/NationalId');
const { check, validationResult } = require('express-validator');
const multer = require('multer');
const path = require('path');

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post(
  '/nationalId',
  authMiddleware,
  upload.single('image'),
  [
    check('firstName', 'First name is required').not().isEmpty(),
    check('lastName', 'Last name is required').not().isEmpty(),
    check('dobAd', 'Date of Birth is required').isDate(),
    check('dobBs', 'Date of Birth is required').isDate(),
    check('gender', 'Gender is required').not().isEmpty(),
    check('permanentProvince', 'Province is required').not().isEmpty(),
    check('permanentDistrict', 'District is required').not().isEmpty(),
    check('permanentWardNumber', 'Ward Number is required').not().isEmpty(),
    check('temporaryProvince', 'Province is required').not().isEmpty(),
    check('temporaryDistrict', 'District is required').not().isEmpty(),
    check('temporaryWardNumber', 'Ward Number is required').not().isEmpty(),
    check('citizenshipNumber', 'Citizenship number is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const formData = req.body;
    if (req.file) {
      formData.image = req.file.path;
    }
    console.log('Received form data:', formData);

    try {
      const newNationalId = new NationalId(formData);
      await newNationalId.save();
      console.log('Document inserted:', newNationalId);
      res.status(201).json({ msg: 'National ID form submitted successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;