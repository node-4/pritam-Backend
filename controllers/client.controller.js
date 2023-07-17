const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require("../configs/auth.config");
const User = require("../models/userModel");
const ContactDetail = require("../models/ContactDetail");
const CoursesModel = require("../models/CoursesModel");
const inquire = require("../models/inquireModel");
const newLetter = require("../models/newLetter");
const ratingModel = require("../models/ratingModel");

exports.clientRegistration = async (req, res) => {
    try {
        const { phone, email } = req.body;
        req.body.email = email.split(" ").join("").toLowerCase();
        let user = await User.findOne({ $and: [{ $or: [{ email: req.body.email }, { phone: phone }] }], userType: req.body.userType });
        if (!user) {
            req.body.password = bcrypt.hashSync(req.body.password, 8);
            req.body.accountVerification = true;
            const userCreate = await User.create(req.body);
            res.status(200).send({ message: "registered successfully ", data: userCreate, });
        } else {
            res.status(409).send({ message: "Already Exist", data: [] });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email, userType: req.body.userType });
        if (!user) {
            return res.status(404).send({ message: "user not found ! not registered" });
        }
        const isValidPassword = bcrypt.compareSync(password, user.password);
        if (!isValidPassword) {
            return res.status(401).send({ message: "Wrong password" });
        }
        const accessToken = jwt.sign({ id: user._id }, authConfig.secret, {
            expiresIn: authConfig.accessTokenTime,
        });
        res.status(201).send({ data: user, accessToken: accessToken });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Server error" + error.message });
    }
};
exports.sendInquire = async (req, res) => {
    try {
        const d = new Date(req.body.date);
        req.body.date = d.toISOString();
        const userCreate = await inquire.create(req.body);
        res.status(200).send({ message: "send Inquire successfully ", data: userCreate, });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
exports.getCourses = async (req, res) => {
    try {
        if (req.query.date) {
            const Courses = await CoursesModel.find({ tillDate: { $lte: req.query.date } });
            if (Courses.length == 0) {
                return res.status(404).json({ status: 404, message: "No data found", data: {} });
            } else {
                res.status(200).json({ status: 200, message: "All courses Data found successfully.", data: Courses })
            }
        } else {
            const Courses = await CoursesModel.find();
            if (Courses.length == 0) {
                return res.status(404).json({ status: 404, message: "No data found", data: {} });
            } else {
                res.status(200).json({ status: 200, message: "All courses Data found successfully.", data: Courses })
            }
        }
    } catch (err) {
        console.log(err);
        res.status(501).send({ status: 501, message: "server error.", data: {}, });
    }
};
exports.sendNewLetter = async (req, res) => {
    try {
        const userCreate = await newLetter.create(req.body);
        res.status(200).send({ message: "New Letter successfully ", data: userCreate, });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
exports.updateProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).send({ message: "not found" });
        } else {
            if (req.file) {
                let image = req.file.path;
                let updated = await User.findByIdAndUpdate(req.user.id, { image: image }, { new: true });
                res.status(200).send({ message: "updated", data: updated });
            }
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "internal server error " + err.message,
        });
    }
};
exports.giveRating = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).send({ message: "not found" });
        } else {
            let data = {
                userId: user._id,
                rating: req.body.rating,
                comment: req.body.comment,
                type: user.userType,
            }
            const Data = await ratingModel.create(data);
            res.status(200).send({ message: "Rating add successfully", data: Data });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "internal server error " + err.message,
        });
    }
};
exports.clientRating = async (req, res) => {
    try {
        const Rating = await ratingModel.find({ type: "CLIENT" }).populate({ path: "userId", select: "firstName lastName image address1 address2" });
        if (Rating.length == 0) {
            return res.status(404).json({ status: 404, message: "No data found", data: {} });
        } else {
            res.status(200).json({ status: 200, message: "All rating Data found successfully.", data: Rating })
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "internal server error " + err.message,
        });
    }
};
exports.staffRating = async (req, res) => {
    try {
        const Rating = await ratingModel.find({ type: "STAFF" }).populate({ path: "userId", select: "firstName lastName image address1 address2" });
        if (Rating.length == 0) {
            return res.status(404).json({ status: 404, message: "No data found", data: {} });
        } else {
            res.status(200).json({ status: 200, message: "All rating Data found successfully.", data: Rating })
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "internal server error " + err.message,
        });
    }
};