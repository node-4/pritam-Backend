const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require("../../../configs/auth.config");
const User = require("../../../models/userModel");
const ContactDetail = require("../../../models/ContactDetail");
const CoursesModel = require("../../../models/CoursesModel");
const inquire = require("../../../models/inquireModel");
const newLetter = require("../../../models/newLetter");
const ratingModel = require("../../../models/ratingModel");
const jobRegisterform = require("../../../models/jobRegisterform");
const banner = require("../../../models/banner");
const Booking = require('../../../models/New/Order/booking');
const AllBooking = require('../../../models/New/Order/AllBooking');
//// banner //////////
exports.getAllBanner = async (req, res) => {
    try {
        const categories = await banner.find();
        if (categories.length > 0) {
            return res.status(200).json({ status: 200, message: 'Banner found successfully', data: categories });
        } else {
            return res.status(404).json({ status: 404, message: 'Banner not found.', data: categories });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, error: 'Failed to fetch Banner' });
    }
};
exports.getBannerById = async (req, res) => {
    try {
        const bannerId = req.params.bannerId;
        const user = await banner.findById(bannerId);
        if (user) {
            return res.status(200).json({ message: "Banner found successfully", status: 200, data: user, });
        }
        return res.status(404).json({ message: "Banner not Found", status: 404, data: {}, });
    } catch (error) {
        console.error(error);
        return res.status(500).json({status: 500,  error: "Failed to retrieve Banner" });
    }
};
///////////// add job ///////////////




//////////////// Dashboard //////////////////////
exports.getDashboard = async (req, res) => {
    try {
        const ongoingJobs = await Booking.find({ user: req.user._id, fromTime: { $gte: new Date() } }).count()
        const completedJobs = await Booking.find({ user: req.user._id, fromTime: { $lt: new Date() } }).count()
        const totalJobsPosted = await AllBooking.find({ user: req.user._id }).count()
        const totalInvoicesData = await AllBooking.find({ user: req.user._id });
        let totalInvoices = 0;
        if (totalInvoicesData.length === 0) {
            totalInvoicesData.forEach((invoice) => {
                totalInvoices += invoice.total;
            })
        }
        let obj = {
            ongoingJobs: ongoingJobs,
            completedJobs: completedJobs,
            totalJobsPosted: totalJobsPosted,
            totalInvoices: totalInvoices,
        }
        return res.status(200).json({ message: "Dashboard info found successfully", status: 200, data: obj, });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, error: 'Failed to fetch Banner' });
    }
};