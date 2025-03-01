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
const TimeSheet = require("../../../models/New/timeSheet");
const Booking = require("../../../models/New/Order/booking");
const Attendance = require("../../../models/New/attendance");
exports.markAttendance = async (req, res, next) => {
    try {
        const findUser = await User.findOne({ _id: req.user.id });
        if (!findUser) {
            return res.status(200).json({ success: false, msg: "Order not found", data: {} });
        } else {
            let findData = await Attendance.findOne({ clientId: req.body.clientId, staffId: findUser._id, date: req.body.date, });
            if (findData) {
                let obj = {
                    clientId: req.body.clientId,
                    staffId: findUser._id,
                    currentDate: req.body.currentDate,
                    month: req.body.month,
                    year: req.body.year,
                    date: req.body.date,
                    day: req.body.day,
                }
                let update = await Attendance.findOneAndUpdate({ _id: findData._id }, { $set: obj }, { new: true });
                if (update) {
                    return res.status(200).json({ success: true, msg: "TimeSheet updated", data: update });
                }
            } else {
                let obj = {
                    clientId: req.body.clientId,
                    staffId: findUser._id,
                    currentDate: req.body.currentDate,
                    month: req.body.month,
                    year: req.body.year,
                    date: req.body.date,
                    day: req.body.day,
                }
                const address = await Attendance.create(obj);
                if (address) {
                    return res.status(200).json({ message: "TimeSheet create successfully.", data: address });
                }
            }
        }
    } catch (error) {
        return res.status(501).json({ status: 501, message: `Added to cart`, data: error });
    }
};

exports.getAttendance = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).send({ status: 404, message: "not found", data: {} });
        } else {
            let findData = await Attendance.find({ staffId: user._id, }).populate([{ path: "staffId" }, { path: "clientId" }]);
            if (findData.length > 0) {
                return res.status(200).send({ status: 200, message: "TimeSheet found", data: findData });
            }
            return res.status(404).send({ status: 404, message: "TimeSheet not found", data: [] });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({ status: 500, message: "internal server error " + err.message, });
    }
};
exports.getAttendanceById = async (req, res) => {
    try {
        let findData = await Attendance.findById({ _id: req.params.id, }).populate([{ path: "staffId" }, { path: "clientId" }]);
        if (findData) {
            return res.status(200).send({ status: 200, message: "TimeSheet found", data: findData });
        }
        return res.status(404).send({ status: 404, message: "TimeSheet not found", data: {} });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ status: 500, message: "internal server error " + err.message, });
    }
};