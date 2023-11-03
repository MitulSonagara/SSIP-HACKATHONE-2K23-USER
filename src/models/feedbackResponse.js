const mongoose = require('mongoose');
const moment = require('moment-timezone');

const feedbackResponseSchema = new mongoose.Schema({
    username: String,
    district: String,
    station: String,
    feedback: [
        {
            questionText: String,
            response: String,
        },
    ],
    submissionDate: {
        type: String, // Store the date as a string
    },
    submissionTime: {
        type: String, // Store the time as a string
    },
});

feedbackResponseSchema.pre('save', function (next) {
    // Set the Indian time zone (Asia/Kolkata)
    const indianTimezone = 'Asia/Kolkata';

    // Format the current date and time
    const currentDatetime = moment().tz(indianTimezone).format('DD-MM-YYYY HH:mm:ss');

    this.submissionDate = currentDatetime.split(' ')[0];
    this.submissionTime = currentDatetime.split(' ')[1];

    next();
});

module.exports = mongoose.model('feedbackResponses', feedbackResponseSchema);
