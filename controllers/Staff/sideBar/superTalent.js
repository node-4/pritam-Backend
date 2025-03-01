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
const moment = require("moment");
///////////////// Your achievements ///////////////
exports.getSuperTalentStatus = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const ninetyDaysAgo = moment().subtract(90, "days").toDate();
        // Fetch all bookings where the logged-in user is the staff in the last 90 days
        const completedMissions = await staffBooking.countDocuments({ staff: user._id, date: { $gte: ninetyDaysAgo } });
        // Fetch all ratings for the staff
        const ratings = await Rating.find({ staffId: user._id });
        if (!ratings.length) {
            return res.status(200).json({ message: "No ratings found", data: {} });
        }
        // Calculate Client Loyalty (Percentage of 5-star ratings)
        const totalRatings = ratings.length;
        const fiveStarRatings = ratings.filter(r => r.rating === 5).length;
        const clientLoyalty = totalRatings > 0 ? ((fiveStarRatings / totalRatings) * 100).toFixed(2) + "%" : "0%";
        const reliability = fiveStarRatings;
        const isSuperTalent = completedMissions >= 10;
        return res.status(200).json({ message: "Super Talent data retrieved", data: { completedMissions, requiredMissions: 10, clientLoyalty, reliability, isSuperTalent } });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
};






