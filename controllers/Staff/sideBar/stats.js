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
const staffBooking = require("../../../models/New/Order/staffBooking");
///////////////// satisfaction per job ///////////////
exports.getSatisfactionPerJob = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const ratings = await Rating.find({ staffId: user._id }).populate('jobBusinessTypeId roleId');
        if (!ratings.length) {
            return res.status(200).json({ message: "No ratings found", data: [] });
        }
        const jobRatings = {};
        ratings.forEach((rating) => {
            if (!jobRatings[rating.roleId.name]) {
                jobRatings[rating.roleId.name] = { totalRating: 0, count: 0, ratingsBreakdown: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 } };
            }
            jobRatings[rating.roleId.name].totalRating += rating.rating;
            jobRatings[rating.roleId.name].count += 1;
            jobRatings[rating.roleId.name].ratingsBreakdown[rating.rating] += 1;
        });
        const responseData = Object.keys(jobRatings).map((job) => {
            const { totalRating, count, ratingsBreakdown } = jobRatings[job];
            return { jobTitle: job, reviewCount: count, satisfaction: ((totalRating / (count * 5)) * 100).toFixed(2) + "%", ratingsBreakdown: ratingsBreakdown };
        });
        return res.status(200).json({ message: "Satisfaction data retrieved", data: responseData });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
};
/////////////// volume of mission ///////////////////
exports.getVolumeOfMissionCount = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const bookings = await staffBooking.find({ staff: user._id }).populate("roles.roleId");
        if (!bookings.length) {
            return res.status(200).json({ message: "No missions found", data: [] });
        }
        const jobMissions = {};
        bookings.forEach((booking) => {
            const jobTitle = booking.roleId ? booking.roleId.name : "Unknown Job";
            if (!jobMissions[jobTitle]) {
                jobMissions[jobTitle] = { count: 0, totalHours: 0 };
            }
            jobMissions[jobTitle].count += 1;
            jobMissions[jobTitle].totalHours += booking.workingHours || 0;
        });
        const responseData = Object.keys(jobMissions).map((job) => {
            return {
                jobTitle: job,
                missionCount: jobMissions[job].count,
                workedHours: jobMissions[job].totalHours
            };
        });
        // Calculate total hours and total missions
        const totalMissions = bookings.length;
        const totalHours = bookings.reduce((sum, booking) => sum + (booking.workingHours || 0), 0);
        return res.status(200).json({ message: "Mission data retrieved", totalMissions, totalHours, data: responseData });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
};
////////////// per type of business ///////////////////
exports.getPerTypeOfBusiness = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const bookings = await staffBooking.find({ staff: user._id }).populate("departments.departmentId");
        if (!bookings.length) {
            return res.status(200).json({ message: "No missions found", data: [] });
        }
        const jobMissions = {};
        bookings.forEach((booking) => {
            const jobTitle = booking.departmentId ? booking.departmentId.name : "Unknown Job";
            if (!jobMissions[jobTitle]) {
                jobMissions[jobTitle] = { count: 0, totalHours: 0 };
            }
            jobMissions[jobTitle].count += 1;
            jobMissions[jobTitle].totalHours += booking.workingHours || 0;
        });
        const responseData = Object.keys(jobMissions).map((job) => {
            return {
                jobTitle: job,
                missionCount: jobMissions[job].count,
                workedHours: jobMissions[job].totalHours
            };
        });
        // Calculate total hours and total missions
        const totalMissions = bookings.length;
        const totalHours = bookings.reduce((sum, booking) => sum + (booking.workingHours || 0), 0);
        return res.status(200).json({ message: "Mission data retrieved", totalMissions, totalHours, data: responseData });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
};


