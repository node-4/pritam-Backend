const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require("../../../../configs/auth.config");
const userModel = require("../../../../models/userModel");
const ContactDetail = require("../../../../models/ContactDetail");
const CoursesModel = require("../../../../models/CoursesModel");
const inquire = require("../../../../models/inquireModel");
const newLetter = require("../../../../models/newLetter");
const ratingModel = require("../../../../models/ratingModel");
const jobRegisterform = require("../../../../models/jobRegisterform");
const Transaction = require('../../../../models/New/transactionModel');
const slot = require('../../../../models/New/slot');
exports.updateMyMissionPreference = async (req, res) => {
    try {
        const { travellingDistanceFrom, travellingDistanceTo, hourPreferenceFrom, hourPreferenceTo, drivingLicense, roleIds } = req.body;
        const user = await userModel.findById({_id: req.user._id});
        if (!user) {
            return res.status(404).send({ status: 404, message: "user not found" });
        }
        const updated = await userModel.findByIdAndUpdate({ _id: user._id }, { $set: req.body }, { new: true })
        return res.status(200).send({ status: 200, message: "logged in successfully", data: updated });
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({ status: 500, error: "internal server error" + err.message });
    }
};