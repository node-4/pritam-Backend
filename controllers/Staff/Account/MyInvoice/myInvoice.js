const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const newOTP = require("otp-generators");
const Booking = require('../../../../models/New/Order/booking');
const Transaction = require('../../../../models/New/transactionModel');
exports.getInvoiceById = async (req, res, next) => {
        try {
                const cart = await Transaction.findOne({ _id: req.params.id }).populate([
                { path: 'user' },
                { path: 'candidate' },
                {
                    path: 'booking',
                    populate: [
                        { path: 'departments.departmentId' },
                        { path: 'roles.roleId' }
                    ]
                }
            ]);
                if (!cart) {
                        return res.status(200).json({ success: false, msg: "Order not found", data: {} });
                }
                return res.status(200).json({ success: true, msg: "Order found successfully", data: cart });
        } catch (error) {
                return res.status(501).json({ status: 501, message: `Added to cart`, data: error });
        }
};
exports.getAllInvoice = async (req, res) => {
    try {
        const data = await Transaction.find({ candidate: req.user._id })
            .populate([
                { path: 'user' },
                { path: 'candidate' },
                {
                    path: 'booking',
                    populate: [
                        { path: 'departments.departmentId' },
                        { path: 'roles.roleId' }
                    ]
                }
            ]);

        if (data.length > 0) {
            return res.status(200).json({ message: "Transaction found", data });
        } else {
            return res.status(404).json({ status: 404, message: "No data found", data: {} });
        }
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};
