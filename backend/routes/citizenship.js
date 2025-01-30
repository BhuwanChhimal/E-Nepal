const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Citizenship = require('../models/Citizenship');
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
  '/citizenship',
  authMiddleware,
  upload.single('image'),
  [
    check('firstName', 'First name is required').not().isEmpty(),
    check('lastName', 'Last name is required').not().isEmpty(),
    check('dobAd', 'Date of Birth (AD) is required').isDate(),
    check('dobBs', 'Date of Birth (BS) is required').not().isEmpty(),
    check('gender', 'Gender is required').not().isEmpty(),
    check('province', 'Province is required').not().isEmpty(),
    check('district', 'District is required').not().isEmpty(),
    check('municipality', 'Municipality is required').not().isEmpty(),
    check('wardNumber', 'Ward Number is required').not().isEmpty(),
    check('address', 'Address is required').not().isEmpty(),
    check('fatherName', 'Father\'s name is required').not().isEmpty(),
    check('motherName', 'Mother\'s name is required').not().isEmpty(),
    check('grandfatherName', 'Grandfather\'s name is required').not().isEmpty(),
    check('parentCitizenshipNumber', 'Parent\'s citizenship number is required').not().isEmpty(),
    check('citizenshipType', 'Citizenship type is required').not().isEmpty(),
    check('reason', 'Reason is required').not().isEmpty(),
    check('image', "Image is required").not().isEmpty(),
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
      const newCitizenship = new Citizenship(formData);
      await newCitizenship.save();
      console.log('Document inserted:', newCitizenship);
      res.status(201).json({ msg: 'Citizenship form submitted successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;