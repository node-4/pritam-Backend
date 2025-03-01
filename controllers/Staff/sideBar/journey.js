const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require("../../../configs/auth.config");
const userModel = require("../../../models/userModel");
const ContactDetail = require("../../../models/ContactDetail");
const CoursesModel = require("../../../models/CoursesModel");
const inquire = require("../../../models/inquireModel");
const newLetter = require("../../../models/newLetter");
const Rating = require("../../../models/ratingModel");
const Notification = require("../../../models/New/notification");
const Journey = require("../../../models/New/journey");
const moment = require("moment");
///////////////// Your achievements ///////////////
exports.getJourney = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const ratings = await Journey.find({ staff: user._id });
        if (!ratings.length) {
            return res.status(200).json({ message: "No ratings found", data: {} });
        }
        return res.status(200).json({ message: "Super Talent data retrieved", data: ratings });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
};






