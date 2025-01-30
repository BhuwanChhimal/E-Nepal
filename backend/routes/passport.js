const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Passport = require('../models/Passport');
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
  '/passport',
  authMiddleware,
  upload.single('image'),
  [
    check('surname', 'Surname is required').not().isEmpty(),
    check('givenName', 'Given name is required').not().isEmpty(),
    check('sex',"Gender is required").not().isEmpty(),
    check('dobAd', 'Date of Birth is required').isDate(),
    check('dobBs', 'Date of Birth is required').isDate(),
    check('nationality', 'Nationality is required').not().isEmpty(),
    check('citizenshipNumber', 'Citizenship number is required').not().isEmpty(),
    check('placeOfBirth', 'Place of birth is required').not().isEmpty(),
    check('dateOfIssue', 'Date of issue is required').isDate(),
    check('placeOfIssue', 'Place of issue is required').not().isEmpty(),
    check('district', 'District is required').not().isEmpty(),
    check('municipality', 'Municipality is required').not().isEmpty(),
    check('wardNo', 'Ward number is required').not().isEmpty(),
    check('tole', 'Tole is required').not().isEmpty(),
    check('phone', 'Phone number is required').isMobilePhone(),
    check('nextOfKin', 'Next of kin is required').not().isEmpty(),
    check('address', 'Address is required').not().isEmpty(),
    check('relationship', 'Relationship is required').not().isEmpty(),
    check('nextOfKinPhone', 'Next of kin phone number is required').not().isEmpty(),
    check('userImage', 'Image is required').not().isEmpty(),
    

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
      const newPassport = new Passport(formData);
      await newPassport.save();
      console.log('Document inserted:', newPassport);
      res.status(201).json({ msg: 'National ID form submitted successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;