const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const License = require('../models/License');
const { check, validationResult } = require('express-validator');
const multer = require('multer');
const path = require('path');

//set up path for file uploads
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
    '/license',
    authMiddleware,
    upload.single('userImage'),
    [
        check('fullName', 'Full Name is required').not().isEmpty(),
        check('dob', 'Date of Birth is required').isDate(),
        check('citizenshipNumber', 'Citizenship number is required').not().isEmpty(),
        check('bloodGroup', 'Blood Group is required').not().isEmpty(),
  
        check('district', 'District is required').not().isEmpty(),
        check('municipality', 'Municipality is required').not().isEmpty(),
        check('wardNo', 'Ward number is required').not().isEmpty(),
        check('tole', 'Tole is required').not().isEmpty(),
        check('email', 'Email is required').isEmail(),
        check('phone', 'Phone number is required').isMobilePhone(),
        check('category', 'Category is required').not().isEmpty(),
        check('licenseType', 'License Type is required').not().isEmpty(),
    ],

    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }

        const formData = req.body;
        if(req.file){
            formData.userImage = req.file.path;
        }
        console.log('Received form data:', formData);

        try {
            const newLicense = new License(formData);
            await newLicense.save();
            console.log('License saved successfully!');
            res.status(201).json({message: 'License saved successfully!'});
        } catch (err) {
            console.error(err);
            res.status(500).json({message: 'Server error'});
        }
    }
)
module.exports = router;