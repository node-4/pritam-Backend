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
const Cart = require('../../../models/New/cart/cart');
const Address = require("../../../models/address");
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
                return res.status(500).json({ status: 500, error: "Failed to retrieve Banner" });
        }
};
// New job
exports.getAllNewJob = async (req, res, next) => {
        try {
                const data = await User.findOne({ _id: req.user._id, });
                if (data) {
                        const orders = await Booking.find({ staff: { $in: req.user._id }, }).populate('allBookingId').sort({ date: 1 })
                        if (orders.length == 0) {
                                return res.status(404).json({ status: 404, message: "Orders not found", data: [] });
                        }
                        return res.status(200).json({ status: 200, msg: "orders of user", data: orders })
                } else {
                        return res.status(404).json({ status: 404, msg: "User not found", data: {} });
                }
        } catch (error) {
                console.log(error);
                return res.status(501).send({ status: 501, message: "server error.", data: {}, });
        }
};
exports.getJobById = async (req, res, next) => {
        try {
                const cart = await Booking.findOne({ _id: req.params.id }).populate('allBookingId');
                if (!cart) {
                        return res.status(404).json({ status: 404, msg: "Order not found", data: {} });
                }
                return res.status(200).json({ status: 200, msg: "Order found successfully", data: cart });
        } catch (error) {
                return res.status(501).json({ status: 501, message: `Added to cart`, data: error });
        }
};
// seen job
exports.getAllSeenJob = async (req, res, next) => {
        try {
                const data = await User.findOne({ _id: req.user._id, });
                if (data) {
                        const orders = await Booking.find({ staffSeen: { $in: req.user._id } }).populate('allBookingId').sort({ date: 1 })
                        if (orders.length == 0) {
                                return res.status(404).json({ status: 404, message: "Orders not found", data: [] });
                        }
                        return res.status(200).json({ status: 200, msg: "orders of user", data: orders })
                } else {
                        return res.status(404).json({ status: 404, msg: "User not found", data: {} });
                }
        } catch (error) {
                console.log(error);
                return res.status(501).send({ status: 501, message: "server error.", data: {}, });
        }
};