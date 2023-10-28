const express = require("express");
const hbs = require("hbs");
const user = require("../models/users");
const otpController = require("../controller/otpController")

const routes = express.Router();

routes.get("/signup", async (req, res) => {
    res.render("signup")
})

routes.post("/signup", async (req, res) => {

    const { password, cpassword } = req.body
    
    if (password !== cpassword) {
        req.flash('error', 'Password and confirm password do not match.');
        return res.redirect('/signup');
    }

    await user.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        country: req.body.country,
        email: req.body.email,
        password: req.body.password
    })

    const phoneNumber = req.body.phoneNumber

    otpController.sendOTP(phoneNumber)

    req.flash('success', 'Registration successful. Please verify your OTP.');
    res.redirect(`/verify-otp?phoneNumber=${phoneNumber}`);
})

module.exports = routes;