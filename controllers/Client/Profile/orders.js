const User = require('../../../models/userModel');
const Booking = require('../../../models/New/Order/booking');
const AllBooking = require('../../../models/New/Order/AllBooking');
exports.getAllBooking = async (req, res, next) => {
        try {
                const data = await User.findOne({ _id: req.user._id, });
                if (data) {
                        if (req.query.serviceStatus != (null || undefined)) {
                                if (req.query.serviceStatus == "Done") {
                                        const orders = await Booking.find({ user: req.user._id, fromTime: { $lt: new Date() } }).populate('allBookingId').sort({ date: -1 })
                                        if (orders.length == 0) {
                                                return res.status(404).json({ status: 404, message: "Orders not found", data: [] });
                                        }
                                        return res.status(200).json({ status: 200, msg: "orders of user", data: orders })
                                }
                                if (req.query.serviceStatus == "Pending") {
                                        const orders = await Booking.find({ user: req.user._id, fromTime: { $gte: new Date() } }).populate('allBookingId').sort({ date: 1 })
                                        if (orders.length == 0) {
                                                return res.status(404).json({ status: 404, message: "Orders not found", data: [] });
                                        }
                                        return res.status(200).json({ status: 200, msg: "orders of user", data: orders })
                                }
                        } else {
                                const orders = await Booking.find({ user: req.user._id, }).populate('allBookingId').sort({ date: 1 })
                                if (orders.length == 0) {
                                        return res.status(404).json({ status: 404, message: "Orders not found", data: [] });
                                }
                                return res.status(200).json({ status: 200, msg: "orders of user", data: orders })
                        }
                } else {
                        return res.status(200).json({ status: 500, msg: "User not found", data: {} });
                }
        } catch (error) {
                console.log(error);
                return res.status(501).send({ status: 501, message: "server error.", data: {}, });
        }
};
exports.getBookingById = async (req, res, next) => {
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
exports.cancelBooking = async (req, res, next) => {
        try {
                const cart = await Booking.findOne({ _id: req.params.id });
                if (!cart) {
                        return res.status(200).json({ success: false, msg: "Order not found", data: {} });
                } else {
                        let update = await Booking.updateOne({ _id: cart._id }, { status: "Cancelled" }, { new: true });
                        return res.status(200).json({ success: true, msg: "Order found successfully", data: update });
                }
        } catch (error) {
                return res.status(501).json({ status: 501, message: `Added to cart`, data: error });
        }
};