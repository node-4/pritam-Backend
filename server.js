const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const compression = require("compression");
const serverless = require("serverless-http");
const app = express();
const path = require("path");
app.use(compression({ threshold: 500 }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
if (process.env.NODE_ENV == "production") {
    console.log = function () {};
}
app.get("/", (req, res) => {
    res.send("Hello World!");
});
// A. ///////////////////////////////////////////Client //////////////////////
//A1. ////////////cart
require("./routes/Client/Cart/cart")(app);
//A2. ////////////Home
require("./routes/Client/Home/home")(app);
require("./routes/Client/Notification/notification")(app);
//A3. ////////////Mission
require("./routes/Client/Mission/onGoing")(app);
require("./routes/Client/Mission/Previous")(app);
//A4. ////////////Notification
require("./routes/Client/Notification/notification")(app);
//A5. ///////// Profile /////////////////////////////////
require("./routes/Client/Profile/addressRoutes")(app);
require("./routes/Client/Profile/cancellationPolicy")(app);
// contact preference
require("./routes/Client/Profile/contactUs")(app);
require("./routes/Client/Profile/faq")(app);
require("./routes/Client/Profile/invoices")(app);
// legal document
require("./routes/Client/Profile/myDetails")(app);
// my TimeSheet
require("./routes/Client/Profile/order")(app);
require("./routes/Client/Profile/paymentMethod")(app);
require("./routes/Client/Profile/Privacy")(app);
require("./routes/Client/Profile/Terms")(app);
require("./routes/Client/Profile/VouchersAndOffers")(app);
//A6. ///////// Ticketing /////////////////////////////////
require("./routes/Client/Ticketing/ticketing")(app);
// A7. Auth ///////////////////////////////////////////////
require("./routes/Client/Auth/user.route")(app);
//B. ///////////////////////////////////////////staff //////////////////////
// Auth
require("./routes/staff/Auth/staffRoutes")(app);
/// B1.//// Account ///////////////////////////////
// B1.a. appSettings
require("./routes/staff/Account/appSetting")(app);
// B1.b. Bank account Details

// B1.c. benefits

// B1.d. feedbackAnd Review

// B1.e. followUs
require("./routes/staff/Account/followUs")(app);
// B1.f. myCommunity
require("./routes/staff/Account/myCommunity")(app);
// B1.g. My Document
require("./routes/staff/Account/mydocument")(app);
// B1.h. My Earning
require("./routes/staff/Account/myEarning")(app);
// B1.i. My Invoice

// B1.j. My MissionPreference

// B1.k. My unavailability

// B1.l. upgradeMySkills
require("./routes/staff/Account/upgradeMySkills")(app);
/// B2.//// Home ///////////////////////////////
require("./routes/staff/Home/home")(app);
/// B3.//// Mission ///////////////////////////////
require("./routes/staff/Mission/mission")(app);
/// B4.//// Notification ///////////////////////////////
require("./routes/staff/Notification/notification")(app);
/// B5.//// SideBar ///////////////////////////////
// B5.a. Journey

// B5.b. state

// B5.c. superTalent

/////////////////////////////////////////////admin //////////////////////
require("./routes/admin/adminRoute")(app);
require("./routes/admin/admin.route")(app);
require("./routes/admin/course.route")(app);
require("./routes/admin/static.route")(app);
mongoose.Promise = global.Promise;
mongoose.set("strictQuery", true);
mongoose.connect(process.env.DB_URL).then((data) => {
    console.log(`Mongodb connected with server: ${data.connection.host}`);
});
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}!`);
});
module.exports = { handler: serverless(app) };