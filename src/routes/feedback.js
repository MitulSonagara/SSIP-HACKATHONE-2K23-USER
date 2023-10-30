const express = require("express")
const router = express.Router();
const FeedbackQuestion = require('../models/feedbackQuestions');
const feedbackResponses = require("../models/feedbackResponse")
const { ensureAuthenticated } = require("../controller/authMiddleware")

router.get('/feedback', ensureAuthenticated, async (req, res) => {
    try {
        // Retrieve questions from the database
        const questions = await FeedbackQuestion.find();
        res.render('feedback', { questions });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
})

// Example route for handling feedback submission
router.post('/feedback/submit', ensureAuthenticated, async (req, res) => {
    const username = req.user.username; 
    const feedbackData = req.body.questions;

    const feedbackArray = [];

    for (const questionId in feedbackData) {
        const questionText = feedbackData[questionId].questionText;
        const response = feedbackData[questionId].response;

        feedbackArray.push({
            questionText,
            response,
        });
    }

    const feedbackDocument = new feedbackResponses({
        username,
        feedback: feedbackArray,
    });

    await feedbackDocument.save()
    res.redirect('/dashboard'); 
});

module.exports = router;