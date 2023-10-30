const express = require("express");
const hbs = require("hbs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session")
const flash = require("connect-flash")
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


const mainRoute = require("./routes/main")
const dashboardRoute = require("./routes/dashboard");
const User = require("./models/users")
const userRoute = require("./routes/user")
const authMiddleware = require("./controller/authMiddleware")
const feedbackRoute = require("./routes/feedback")


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use("/public", express.static("public"));

app.use(flash());

app.use(session({
  secret: 'your-secdcscdsret-key', // Change this to a strong, random string
  resave: false,
  saveUninitialized: false,
}));
// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

//routes
app.use("", dashboardRoute);  
app.use("", mainRoute);
app.use("", userRoute);
app.use("", feedbackRoute);

//hbs engine
app.set("view engine", "hbs");
app.set("views", "views");
hbs.registerPartials("views/partials");
hbs.registerHelper('eq', function (v1, v2) {
  return v1 === v2;
});

// Configure Passport to use the LocalStrategy
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//DataBase Connection
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/SSIP-Hackathone-2k23");
  console.log("Database connected");
}

app.listen(4000, () => {
  console.log("Server started on port 4000")
})