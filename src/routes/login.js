const express = require('express');
const router = express.Router();
const User = require('../models/users'); // Import the User model for database operations
const otpController = require('../controller/otpController'); // Import OTP controller for OTP-related operations

// Handle GET request to render the login page
router.get('/login', (req, res) => {
    res.render('login'); // Render the login page (login.hbs)
});

// Handle POST request for user login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the email and password match a registered user
        const user = await User.findOne({ email, password });

        if (!user) {
            throw new Error('Invalid email or password.');
        }

        const phoneNumber = user.phoneNumber

        otpController.sendOTP(phoneNumber);

        // Redirect to the OTP verification page
        res.redirect(`/verify-otp?phoneNumber=${phoneNumber}`);
    } catch (error) {
        // Display an error message or redirect to the login page with an error
        res.render('login', { error: error.message });
    }
});

module.exports = router;
