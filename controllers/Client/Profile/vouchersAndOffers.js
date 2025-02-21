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
const coupon = require("../../../models/coupon");
exports.getAllVouchers = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).send({ status: 404, message: "not found", data: {} });
        } else {
            let findCoupon = await coupon.find({ user: req.user.id });
            if (findCoupon.length == 0) {
                return res.status(404).send({ status: 404, message: "no vouchers found", data: [] });
            } else {
                return res.status(200).send({ status: 200, message: "vouchers found successfully", data: findCoupon });

            }
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({ status: 500, message: "internal server error " + err.message, });
    }
};
exports.getVoucherById = async (req, res) => {
    try {
        let findCoupon = await coupon.findById({ _id: req.params.id });
        if (!findCoupon) {
            return res.status(404).send({ status: 404, message: "no vouchers found", data: {} });
        } else {
            return res.status(200).send({ status: 200, message: "vouchers found successfully", data: findCoupon });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({ status: 500, message: "internal server error " + err.message, });
    }
};