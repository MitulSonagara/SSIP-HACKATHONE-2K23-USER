const express = require("express");
const router = express.Router();
const passport = require("passport")
const { ensureAuthenticated } = require("../controller/authMiddleware")

// Define a route to render the dashboard
router.get('/dashboard',  (req, res) => {
    // This route is protected; only authenticated users can access it
    res.render('dashboard'); // Render your dashboard template or perform other actions
});
// Add any other dashboard-related routes and logic here

module.exports = router;
