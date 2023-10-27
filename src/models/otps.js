const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    phoneNumber: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    used: {
        type: Boolean,
        default: false,
    },
    created_at: {
        type: Date,
        default: Date.now,
        expires: 300, // Set the expiration time for OTPs (e.g., 5 minutes)
    },
});

const OTP = mongoose.model('OTP', otpSchema);

module.exports = OTP;
