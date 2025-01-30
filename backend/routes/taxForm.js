const express = require('express');
const router = express.Router();
const TaxForm = require('../models/TaxForm');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/taxForm', authMiddleware, async (req, res) => {
    const {
        userId,
        panNumber,
        incomeType,
        incomeAmount,
        deductionType,
        deductionAmount,
        taxAmount,
    } = req.body;
    console.log('Request Body:', req.body);
    try {
        const newTaxForm = new TaxForm({
            userId,
            panNumber,
            incomeType,
            incomeAmount,
            deductionType,
            deductionAmount,
            taxAmount,  // Save taxAmount directly
        });

        await newTaxForm.save();
        res.status(200).json({ msg: 'Tax Form submitted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
});

module.exports = router;