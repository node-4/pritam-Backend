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
exports.getAllOnGoingMission = async (req, res, next) => {
    try {
        const data = await User.findOne({ _id: req.user._id, });
        if (data) {
            const orders = await Booking.find({ staffAccepted: req.user._id, fromTime: { $gte: new Date() } }).populate('allBookingId').sort({ date: 1 })
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
exports.getAllPreviousMission = async (req, res, next) => {
    try {
        const data = await User.findOne({ _id: req.user._id, });
        if (data) {
            const orders = await Booking.find({ staffAccepted: req.user._id, fromTime: { $lt: new Date() } }).populate('allBookingId').sort({ date: 1 })
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