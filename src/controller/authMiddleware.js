function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next(); // User is authenticated, proceed to the next middleware
    }
    // User is not authenticated, redirect to the login page or perform another action
    res.redirect('/login'); // Redirect to your login page
}

function ensureAuthenticated1(req, res, next) {
    if (req.isAuthenticated()) {
        return next(); // User is authenticated, proceed to the next middleware
      }
      // User is not authenticated, save the original URL and redirect to the login page
      req.session.returnTo = req.originalUrl;
      res.redirect('/login'); // Redirect to your login page // Redirect to your login page
}

module.exports = { ensureAuthenticated, ensureAuthenticated1 };
