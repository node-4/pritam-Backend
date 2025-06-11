const User = require('../../../models/userModel');
const Booking = require('../../../models/New/Order/booking');
const AllBooking = require('../../../models/New/Order/AllBooking');;
const Rating = require('../../../models/ratingModel');
const Journey = require("../../../models/New/journey");
exports.getAllOnGoingMission = async (req, res, next) => {
    try {
        const data = await User.findOne({ _id: req.user._id, });
        if (data) {
            const orders = await Booking.find({ user: req.user._id, fromTime: { $gte: new Date() } }).populate('allBookingId departments.departmentId roles.roleId').sort({ date: 1 })
            if (orders.length == 0) {
                return res.status(404).json({ status: 404, message: "Orders not found", data: [] });
            }
            return res.status(200).json({ status: 200, msg: "orders of user", data: orders })
        } else {
            return res.status(200).json({ status: 500, msg: "User not found", data: {} });
        }
    } catch (error) {
        console.log(error);
        return res.status(501).send({ status: 501, message: "server error.", data: {}, });
    }
};
exports.getOnGoingMissionById = async (req, res, next) => {
    try {
        const cart = await Booking.findOne({ _id: req.params.id }).populate('allBookingId departments.departmentId roles.roleId');
        if (!cart) {
            return res.status(200).json({ success: false, msg: "Order not found", data: {} });
        }
        return res.status(200).json({ success: true, msg: "Order found successfully", data: cart });
    } catch (error) {
        return res.status(501).json({ status: 501, message: `Added to cart`, data: error });
    }
};
exports.modifiedOnGoingMission = async (req, res, next) => {s
    try {
        const { price, fromTime, toTime, date, staffId, jobBusinessTypeId, jobId, rating, comment, staffAgain } = req.body;
        const data = await User.findOne({ _id: req.user._id, });
        if (data) {
            const cart = await Booking.findOne({ _id: req.params.id }).populate('allBookingId departments.departmentId roles.roleId');
            if (!cart) {
                return res.status(200).json({ success: false, msg: "Order not found", data: {} });
            }
            cart.price = price;
            cart.fromTime = fromTime;
            cart.toTime = toTime;
            cart.date = date;
            await cart.save();
            let data = {
                userId: data._id,
                staffId: staffId,
                jobBusinessTypeId: jobBusinessTypeId,
                jobId: jobId,
                bookingId: cart._id,
                rating: rating,
                comment: comment,
                staffAgain: staffAgain,
                date: new Date(),
                type: "CLIENT",
            }
            const Data = await Rating.create(data);
            if (Data) {
                let obj = {
                    userId: data._id,
                    staff: req.body.staffId,
                    bookingId: cart._id,
                    description: "+1 business is willing to work with you again in the future."
                }
                await Journey.create(obj);
                return res.status(200).send({ message: "Rating add successfully", data: Data });
            }
            return res.status(200).json({ success: true, msg: "Order found successfully", data: cart });
        } else {
            return res.status(200).json({ status: 500, msg: "User not found", data: {} });
        }
    } catch (error) {
        return res.status(501).json({ status: 501, message: `Added to cart`, data: error });
    }
};