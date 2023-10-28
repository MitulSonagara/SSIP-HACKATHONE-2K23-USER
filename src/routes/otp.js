const express = require("express");
const hbs = require("hbs");
const routes = express.Router();
const signupRoute = require("./signUp")
const otpController = require("../controller/otpController")

routes.get("/verify-otp", (req, res) => {
    const phoneNumber = req.query.phoneNumber;
    res.render("otp", { phoneNumber, messages: req.flash() });
});

routes.post("/verify-otp", async (req, res) => {
    const { phoneNumber, otp } = req.body;

    // Validate OTP
    const isOTPValid = await otpController.validateOTP(phoneNumber, otp);


    console.log(isOTPValid)

    if (isOTPValid) {
        // Redirect to the login page
        req.flash('success', 'OTP verified successfully. You are now logged in.');
        res.redirect("/dashboard");
    } else {
        req.flash('error', 'Invalid OTP. Please try again.');
        res.redirect(`/verify-otp?phoneNumber=${phoneNumber}`);
    }
})

module.exports = routes