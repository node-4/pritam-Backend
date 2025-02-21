const User = require('../../../models/userModel');
const Booking = require('../../../models/New/Order/booking');
const AllBooking = require('../../../models/New/Order/AllBooking');
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