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
    console.log = function () {

    };
}
app.get("/", (req, res) => {
    res.send("Hello World!");
});
require("./routes/Client/Auth/user.route")(app);
require("./routes/Client/Home/home")(app);
require("./routes/Client/Mission/onGoing")(app);
require("./routes/Client/Mission/Previous")(app);
require("./routes/Client/Profile/addressRoutes")(app);
require("./routes/Client/Profile/cancellationPolicy")(app);
require("./routes/Client/Profile/Terms")(app);
require("./routes/Client/Profile/Privacy")(app);
require("./routes/Client/Profile/myDetails")(app);
require("./routes/Client/Profile/contactUs")(app);
require("./routes/Client/Profile/order")(app);
require("./routes/Client/Profile/invoices")(app);
require("./routes/Client/Profile/VouchersAndOffers")(app);
require("./routes/Client/Profile/faq")(app);
require("./routes/Client/Ticketing/ticketing")(app);
require("./routes/admin/adminRoute")(app);
require("./routes/static.route")(app);
require("./routes/course.route")(app);
require("./routes/admin.route")(app);
require("./routes/staffRoutes")(app);
mongoose.Promise = global.Promise;
mongoose.set("strictQuery", true);
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, }).then((data) => {
    console.log(`Mongodb connected with server: ${data.connection.host}`);
});
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}!`);
});
module.exports = { handler: serverless(app) };