const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/users');
const otpController = require("../controller/otpController")

router.get("/signup", (req, res) => {
    res.render("signup")
})

// Signup Route
router.post('/signup', (req, res, next) => {
    // Handle user registration logic here
    const newUser = new User({
        username: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        country: req.body.country,
        phoneNumber: req.body.phoneNumber
        // Add other user data
    });

    const phoneNumber = req.body.phoneNumber
    otpController.sendOTP(phoneNumber)

    User.register(newUser, req.body.password, (err) => {
        if (err) {
            // Handle registration error
            return next(err);
        }
        // Registration successful, redirect to OTP verification page
        res.redirect(`/verify-otp?phoneNumber=${phoneNumber}`);
    });
});

// OTP Verification Route
router.get('/verify-otp', (req, res) => {
    const phoneNumber = req.query.phoneNumber;
    res.render("otp", { phoneNumber });
});

router.post('/verify-otp', async (req, res) => {

    const { phoneNumber, otp } = req.body;

    // Validate OTP
    const isOTPValid = await otpController.validateOTP(phoneNumber, otp);


    if (isOTPValid) {
        res.redirect('/login');
    } else {
        res.redirect('/signup');
    }
});

router.get("/login", (req, res) => {
    res.render("login")
})
// Login Route
router.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: false, // Enable flash messages for login failure
}), (req, res) => {
    res.redirect("/dashboad")
});


module.exports = router;
