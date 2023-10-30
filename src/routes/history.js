const express = require('express');
const router = express.Router();
const FeedbackResponse = require("../models/feedbackResponse"); // Import your Mongoose model
const { ensureAuthenticated } = require('../controller/authMiddleware');

// Display the feedback history for the currently logged-in user
router.get('/feedback/history', ensureAuthenticated, async (req, res) => {
    try {
        const username = req.user.username; // Get the username of the logged-in user
        
        // Fetch the feedback responses for the specific user
        const feedbackHistory = await FeedbackResponse.find({ username });

        res.render('history', { feedbackHistory });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching feedback history.');
    }
});

module.exports = router;
