const mongoose = require("mongoose");

const users = mongoose.Schema({
    firstName: String,
    lastName: String,
    phoneNumber: String,
    country: String,
    email: String,
    password:String
});

module.exports = mongoose.model("users", users);