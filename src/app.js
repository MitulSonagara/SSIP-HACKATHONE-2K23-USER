const express = require("express");
const hbs = require("hbs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const signupRoute = require("./routes/signUp");
const mainRoute = require("./routes/main")
const otpRoute = require("./routes/otp")

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use("/public", express.static("public"));

//routes
app.use('', signupRoute);
app.use("", otpRoute);
app.use("", mainRoute);

//hbs engine
app.set("view engine", "hbs");
app.set("views", "views");
hbs.registerPartials("views/partials");

//DataBase Connection
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/SSIP-Hackathone-2k23");
  console.log("Database connected");
}

app.listen(4000, () => {
    console.log("Server started on port 4000")
})