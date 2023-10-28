const express = require("express");
const router = express.Router();

// Define a route to render the dashboard
router.get("/dashboard", (req, res) => {
    res.render("dashboard"); // Assuming you have a dashboard view
});

// Add any other dashboard-related routes and logic here

module.exports = router;
