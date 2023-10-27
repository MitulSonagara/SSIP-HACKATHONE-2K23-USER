const otpGenerator = require('otp-generator');


// Configuration for Twilio
const accountSid = 'ACcb580fce826ac6cfa725cc9294c94d16';
const authToken = '53feb912fd8809d098cdc3bea33204db';

const twilio = require('twilio')(accountSid, authToken, {
    lazyLoading: true
});

// Store OTPs in memory (in production, use a database)
// const generateOTP = () => {
//     const otp = Math.floor(1000 + Math.random() * 9000).toString();
//     return otp;
// };

// Send OTP via SMS using Twilio
const sendOTP = async (phoneNumber) => {
    try {
        const otpResponse = await twilio.verify
            .v2.services("VAdbf0c380e9cecd208df4b32ea8e14617")
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
const validateOTP = async (phoneNumber, otp) => {
    try {
        const verifiedResponse = await twilio.verify
            .v2.services("VAdbf0c380e9cecd208df4b32ea8e14617")
            .verificationChecks.create({
                to: `+91${phoneNumber}`,
                code: otp,
            });
        console.log("otp verify successfully");
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    sendOTP,
    validateOTP,
};