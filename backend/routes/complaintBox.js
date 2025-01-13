const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const ComplaintBox = require('../models/ComplaintBox');
const { check, validationResult } = require('express-validator');

router.post (
    '/complaintBox',
    authMiddleware,
    [
        check('province', 'Province is required').not().isEmpty(),
        check('district', 'District is required').not().isEmpty(),
        check('municipality', 'Municipality is required').not().isEmpty(),
        check('department', 'Department is required').not().isEmpty(),
        check('complaint', 'Complaint is required').not().isEmpty(),
    ],
    async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
     
    const formData = req.body;
    console.log('Received form data:', formData);
    try {
        const newComplaintBox = new ComplaintBox(formData);
        await newComplaintBox.save();
        res.json({message: 'Complaint saved successfully!'});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Server error'});
        
    }
    }

)
module.exports = router;
