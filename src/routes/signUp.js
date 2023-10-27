const express = require("express");
const hbs = require("hbs");
const user = require("../models/users");
const otpController = require("../controller/otpController")

const routes = express.Router();

routes.get("/signup", async (req, res) => {
    res.render("signup")
})

routes.post("/signup", async (req, res) => {
    await user.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        country: req.body.country,
        email: req.body.email
    })

    const phoneNumber = req.body.phoneNumber

    otpController.sendOTP(phoneNumber)

    try {
        res.render("otp",{ phoneNumber })
    } catch (err) {
        console.error(err);
        res.render("signup", { errorMessage: "Registration failed. Please try again." });
    }
})

module.exports = routes;