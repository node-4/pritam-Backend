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

exports.createTimeSheet = async (req, res, next) => {
    try {
        const cart = await Booking.findOne({ _id: req.body.bookingId });
        if (!cart) {
            return res.status(200).json({ success: false, msg: "Order not found", data: {} });
        } else {
            let findData = await TimeSheet.findOne({ user: cart.user, bookingId: cart._id, date: req.body.date, });
            if (findData) {
                let obj = {
                    date: req.body.date,
                    staff: req.body.staffId,
                    startTime: req.body.startTime,
                    endTime: req.body.endTime,
                }
                let update = await TimeSheet.findOneAndUpdate({ _id: findData._id }, { $push: { staffData: obj } }, { new: true });
                if (update) {
                    return res.status(200).json({ success: true, msg: "TimeSheet updated", data: update });
                }
            } else {
                let staffData = [];
                let obj1 = {
                    date: req.body.date,
                    staff: req.body.staffId,
                    startTime: req.body.startTime,
                    endTime: req.body.endTime,
                }
                staffData.push(obj1);
                let obj = {
                    user: cart.user,
                    bookingId: cart._id,
                    date: req.body.date,
                    staffData: staffData
                }
                const address = await TimeSheet.create(obj);
                if (address) {
                    return res.status(200).json({ message: "TimeSheet create successfully.", data: address });
                }
            }
        }
    } catch (error) {
        return res.status(501).json({ status: 501, message: `Added to cart`, data: error });
    }
};
exports.getMyTimeSheet = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).send({ status: 404, message: "not found", data: {} });
        } else {
            let findData = await TimeSheet.find({ user: user._id, }).populate([{ path: "staffData.staff" },
            {
                path: 'bookingId',
                populate: [
                    { path: 'departments.departmentId' },
                    { path: 'roles.roleId' }
                ]
            }
            ]);



            // .populate([{ path: "bookingId" }, 
            //     // { path: "staffData.staffId" }
            // ]);
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
exports.getTimeSheetById = async (req, res) => {
    try {
        let findData = await TimeSheet.findById({ _id: req.params.id, })
            .populate([{ path: "staffData.staff" },
            {
                path: 'bookingId',
                populate: [
                    { path: 'departments.departmentId' },
                    { path: 'roles.roleId' }
                ]
            }
            ]);
        if (findData) {
            return res.status(200).send({ status: 200, message: "TimeSheet found", data: findData });
        }
        return res.status(404).send({ status: 404, message: "TimeSheet not found", data: {} });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ status: 500, message: "internal server error " + err.message, });
    }
};