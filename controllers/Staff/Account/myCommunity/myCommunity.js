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
const userDocument = require('../../../../models/New/userDocument');
const Community = require("../../../../models/New/community");
exports.getCommunity = async (req, res) => {
    try {
        const categories = await Community.find({}).sort({ createdAt: 1 });
        if (categories.length == 0) {
            return res.status(404).json({ message: "Community not found.", status: 404, data: [] });
        }
        return res.status(200).json({ message: "Community Found", status: 200, data: categories, });
    } catch (err) {
        return res.status(500).send({ msg: "internal server error ", error: err.message, });
    }
};
exports.joinCommunity = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ status: 404, message: "User not found", data: {} });
        }
        const community = await Community.findById(req.params.id);
        if (!community) {
            return res.status(404).json({ message: "Community not found.", status: 404, data: {} });
        }
        const isUserAlreadyInCommunity = community.user.some(u => u.id.toString() === user._id.toString());
        if (isUserAlreadyInCommunity) {
            return res.status(400).json({ message: "User already joined.", status: 400, data: {} });
        }
        const update = await Community.findByIdAndUpdate({ _id: community._id }, { $push: { user: { id: user._id, status: 'pending' } } }, { new: true });
        return res.status(200).json({ message: "Community joined.", status: 200, data: update });
    } catch (err) {
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
};
exports.removeCommunity = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ status: 404, message: "User not found", data: {} });
        }
        const community = await Community.findById(req.params.id);
        if (!community) {
            return res.status(404).json({ message: "Community not found.", status: 404, data: {} });
        }
        const isUserInCommunity = community.user.some(u => u.id.toString() === user._id.toString());
        if (!isUserInCommunity) {
            return res.status(400).json({ message: "User is not a member of this community.", status: 400, data: {} });
        }
        const update = await Community.findByIdAndUpdate(req.params.id, { $pull: { user: { id: user._id } } }, { new: true });
        return res.status(200).json({ message: "User removed from community.", status: 200, data: update });
    } catch (err) {
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
};
exports.acceptUserForCommunity = async (req, res) => {
    try {
        const admin = await userModel.findById(req.user.id);
        if (!admin) {
            return res.status(404).json({ status: 404, message: "Admin user not found", data: {} });
        }
        const community = await Community.findById(req.params.id);
        if (!community) {
            return res.status(404).json({ message: "Community not found.", status: 404, data: {} });
        }
        const userIndex = community.user.findIndex(u => u.id.toString() === req.body.userId && u.status === "pending");
        if (userIndex === -1) {
            return res.status(400).json({ message: "User not found or already approved/rejected.", status: 400, data: {} });
        }
        community.user[userIndex].status = "approved";
        await community.save();
        return res.status(200).json({ message: "User approved for community.", status: 200, data: community });
    } catch (err) {
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
};
exports.rejectUserForCommunity = async (req, res) => {
    try {
        const admin = await userModel.findById(req.user.id);
        if (!admin) {
            return res.status(404).json({ status: 404, message: "Admin user not found", data: {} });
        }
        const community = await Community.findById(req.params.id);
        if (!community) {
            return res.status(404).json({ message: "Community not found.", status: 404, data: {} });
        }
        const update = await Community.findByIdAndUpdate({ _id: req.params.id }, { $pull: { user: { id: req.body.userId, status: "pending" } } }, { new: true });
        return res.status(200).json({ message: "User rejected and removed from community.", status: 200, data: update });
    } catch (err) {
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
};
