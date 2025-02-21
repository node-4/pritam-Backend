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
exports.updateMyDetails = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).send({ status: 404, message: "not found", data: {} });
        } else {
            if (req.body.phone != (null || undefined || "" || " ")) {
                let findAlready = await User.findOne({ _id: { $ne: user._id }, phone: req.body.phone });
                if (findAlready) {
                    return res.status(400).send({ status: 400, message: "Phone already exist", data: {} });
                }
            }
            let obj = {
                phone: req.body.phone ?? user.phone,
                firstName: req.body.firstName ?? user.firstName,
                lastName: req.body.lastName ?? user.lastName,
                language: req.body.language ?? user.language
            }
            let updated = await User.findByIdAndUpdate({ _id: req.user.id }, { $set: obj }, { new: true });
            return res.status(200).send({ status: 200, message: "updated", data: updated });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({ status: 500, message: "internal server error " + err.message, });
    }
};
exports.getMyDetails = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).send({ status: 404, message: "not found", data: {} });
        } else {
            return res.status(200).send({ status: 200, message: "get my details", data: user });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({ status: 500, message: "internal server error " + err.message, });
    }
};