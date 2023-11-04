const express = require("express")
const router = express.Router();
const FeedbackQuestion = require('../models/feedbackQuestions');
const feedbackResponses = require("../models/feedbackResponse")
const { ensureAuthenticated,ensureAuthenticated1 } = require("../controller/authMiddleware")
const stations = require('../models/stations');

router.get('/feedback', ensureAuthenticated, async (req, res) => {
    try {
        // Retrieve questions from the database
        const questions = await FeedbackQuestion.find();
        const districts = await stations.find()
        res.render('feedback', { questions, districts });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
})

router.get("/feedback-form", ensureAuthenticated1, async (req, res) => {
    try {
        // Retrieve questions from the database
        const questions = await FeedbackQuestion.find();
        const { district, station } = req.query;
        res.render('feedback-form', { questions, district, station });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
})

// Example route for handling feedback submission
router.post('/feedback/submit', ensureAuthenticated, async (req, res) => {
    const {username,firstName,lastName} = req.user;
    const feedbackData = req.body.questions;
    const { district, policeStation, comments } = req.body;

    console.log(policeStation)

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
        firstName,
        lastName,
        district,
        station: policeStation,
        feedback: feedbackArray,
        remarks: comments,
    });

    await feedbackDocument.save()
    res.redirect('/dashboard');
});

// Example route for fetching police stations for a specific district
router.get('/getPoliceStations/:district', async (req, res) => {
    const districtName = req.params.district;

    try {
        // Use Mongoose to find the district by name and retrieve its police stations
        const district = await stations.findOne({ district: districtName });

        if (!district) {
            return res.status(404).json({ error: 'District not found' });
        }

        const policeStations = district.policeStations;

        res.json(policeStations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching data from the database' });
    }
});

module.exports = router;