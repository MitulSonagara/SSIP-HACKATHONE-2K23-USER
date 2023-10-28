require("dotenv").config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const twilio = require('twilio')(accountSid, authToken, {
    lazyLoading: true
});

// Send OTP via SMS using Twilio
const sendOTP = async (phoneNumber) => {
    try {
        const otpResponse = await twilio.verify
            .v2.services(process.env.TWILIO_SERVICE_NUMBER)
            .verifications.create({
                to: `+91${phoneNumber}`,
                channel: "sms",
            });
        console.log("send successfully")
    } catch (error) {
        console.log(error)
    }
};

// Validate OTP
const validateOTP = async (phoneNumber,otp) => {
    try {
        const verifiedResponse = await twilio.verify
            .v2.services(process.env.TWILIO_SERVICE_NUMBER)
            .verificationChecks.create({
                to: `+91${phoneNumber}`,
                code: otp,
            });
        console.log(verifiedResponse.status);
        return verifiedResponse.valid
    } catch (error) {
        console.log(error);
        return false
    }
};

module.exports = {
    sendOTP,
    validateOTP,
};