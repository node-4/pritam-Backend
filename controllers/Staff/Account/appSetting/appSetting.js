const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require("../../../../configs/auth.config");
const userModel = require("../../../../models/userModel");
const ContactDetail = require("../../../../models/ContactDetail");
const CoursesModel = require("../../../../models/CoursesModel");
const inquire = require("../../../../models/inquireModel");
const newLetter = require("../../../../models/newLetter");
const ratingModel = require("../../../../models/ratingModel");
const jobRegisterForm = require("../../../../models/jobRegisterform");
exports.updateMyDetails = async (req, res) => {
    try {
        const user = await userModel.findById({ _id: req.user.id });
        if (!user) {
            return res.status(404).send({ status: 404, message: "not found", data: {} });
        } else {
            if (req.body.phone != (null || undefined || "" || " ")) {
                let findAlready = await userModel.findOne({ _id: { $ne: user._id }, phone: req.body.phone, userType: "STAFF" });
                if (findAlready) {
                    return res.status(400).send({ status: 400, message: "Phone already exist", data: {} });
                }
            }
            if (req.body.email) {
                req.body.email = email.split(" ").join("").toLowerCase();
                let user1 = await userModel.findOne({ _id: { $ne: user._id }, email: req.body.email, userType: "STAFF" });
                if (user1) {
                    return res.status(409).send({ message: "Already Exist", data: [] });
                }
            }
            let obj = {
                phone: req.body.phone ?? user.phone,
                email: req.body.email ?? user.email,
                firstName: req.body.firstName ?? user.firstName,
                lastName: req.body.lastName ?? user.lastName,
                language: req.body.language ?? user.language
            }
            let updated = await userModel.findByIdAndUpdate({ _id: req.user.id }, { $set: obj }, { new: true });
            return res.status(200).send({ status: 200, message: "updated", data: updated });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({ status: 500, message: "internal server error " + err.message, });
    }
};
exports.changePassword = async (req, res) => {
    try {
        const user = await userModel.findById({ _id: req.user.id });
        if (user) {
            const isValidPassword = bcrypt.compareSync(req.body.oldPassword, user.password);
            if (!isValidPassword) {
                return res.status(401).send({ message: "Old password Not matched" });
            }
            if (req.body.newPassword == req.body.confirmPassword) {
                const updated = await userModel.findOneAndUpdate({ _id: user._id }, { $set: { password: bcrypt.hashSync(req.body.newPassword) } }, { new: true });
                return res.status(200).send({ status: 200, message: "Password updated successfully.", data: updated, });
            } else {
                return res.status(403).send({ status: 403, message: "Password Not matched.", data: {}, });
            }
        } else {
            return res.status(404).json({ status: 404, message: "No data found", data: {} });
        }
    } catch (error) {
        console.log(error);
        return res.status(501).send({ status: 501, message: "server error.", data: {}, });
    }
};
exports.getMyDetails = async (req, res) => {
    try {
        const user = await userModel.findById({ _id: req.user.id });
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