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
        res.redirect(`/login`);
    });
});


router.get("/login", (req, res) => {
    const { district, station } = req.query;

    res.render("login", { district, station })
})
// Login Route
router.post('/login', passport.authenticate('local', {

    failureRedirect: '/login',
    failureFlash: false, // Enable flash messages for login failure
}), (req, res) => {
    const { district, station } = req.body
    
    if (!district & !station) {
        res.redirect("/dashboard")
    }
    else {
        res.redirect(`/feedback-form?district=${district}&station=${station}`)
    }

    
});

router.get('/logout', (req, res) => {
    req.logout(() => {
        res.redirect('/login');
    }); // Passport.js logout
    // Redirect to the login page or any other page you prefer
});

module.exports = router;
