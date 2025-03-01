const User = require('../../../models/userModel');
const Booking = require('../../../models/New/Order/booking');
const AllBooking = require('../../../models/New/Order/AllBooking');
const Rating = require('../../../models/ratingModel');
const Journey = require("../../../models/New/journey");
exports.getAllPreviousMission = async (req, res, next) => {
    try {
        const data = await User.findOne({ _id: req.user._id, });
        if (data) {
            const orders = await Booking.find({ user: req.user._id, fromTime: { $lt: new Date() } }).populate('allBookingId').sort({ date: 1 })
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
exports.getPreviousMissionById = async (req, res, next) => {
    try {
        const cart = await Booking.findOne({ _id: req.params.id }).populate('allBookingId');
        if (!cart) {
            return res.status(200).json({ success: false, msg: "Order not found", data: {} });
        }
        return res.status(200).json({ success: true, msg: "Order found successfully", data: cart });
    } catch (error) {
        return res.status(501).json({ status: 501, message: `Added to cart`, data: error });
    }
};
exports.giveRatingOnBooking = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).send({ message: "not found" });
        } else {
            let findBooking = await Booking.findById({ _id: req.body.bookingId });
            if (!findBooking) {
                return res.status(404).send({ status: 400, message: "not found", data: findBooking });
            }
            let data = {
                userId: user._id,
                staffId: req.body.staffId,
                jobBusinessTypeId: req.body.jobBusinessTypeId,
                jobId: req.body.jobId,
                bookingId: findBooking._id,
                rating: req.body.rating,
                comment: req.body.comment,
                staffAgain: req.body.staffAgain,
                date: new Date(),
                type: "CLIENT",
            }
            const Data = await Rating.create(data);
            if (Data) {
                let obj = {
                    userId: user._id,
                    staff: req.body.staffId,
                    bookingId: findBooking._id,
                    description:"+1 business is willing to work with you again in the future."
                }
                await Journey.create(obj);
                return res.status(200).send({ message: "Rating add successfully", data: Data });
            }
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: "internal server error " + err.message, });
    }
};