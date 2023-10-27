const express = require("express");
const hbs = require("hbs");
const routes = express.Router();
const signupRoute = require("./signUp")
const otpController = require("../controller/otpController")

routes.get("/verify-otp", async (req, res) => {
    res.render("otp");
});

routes.post("/verify-otp", async (req, res) => {
    const { phoneNumber,otp } = req.body;

    // Validate OTP
    const isOTPValid = otpController.validateOTP(phoneNumber,otp);

    if (isOTPValid) {
        // Redirect to the login page
        res.render('dashboard');
    } else {
        // Display an error message or redirect to the signup page
        res.render('signup', { error: 'Invalid OTP. Please try again.' });
    }
})

module.exports=routes