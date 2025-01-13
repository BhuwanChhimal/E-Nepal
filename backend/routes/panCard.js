const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const PanCard = require('../models/PanCard');
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
    '/panCard',
    authMiddleware,
    upload.single('userImage'),
    [
        check('fullName', 'Full Name is required').not().isEmpty(),
        check('fatherName', 'Father Name is required').not().isEmpty(),
        check('dob', 'Date of Birth is required').isDate(),
        check('citizenshipNumber', 'Citizenship number is required').not().isEmpty(),
        check('address', 'Address is required').not().isEmpty(),
        check('district', 'District is required').not().isEmpty(),
        check('municipality', 'Municipality is required').not().isEmpty(),
        check('wardNo', 'Ward number is required').not().isEmpty(),
        check('tole', 'Tole is required').not().isEmpty(),
        check('email', 'Email is required').isEmail(),
        check('phone', 'Phone number is required').isMobilePhone(),
        check('occupation', 'Occupation is required').not().isEmpty(),
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
            const newPanCard = new PanCard(formData);
            await newPanCard.save();
            console.log('Pan Card saved successfully!');
            res.status(201).json({message: 'Pan Card saved successfully!'});
        } catch (err) {
            console.error(err);
            res.status(500).json({message: 'Server error'});
            
        }
    }
)
module.exports = router;