const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require("../configs/auth.config");
const User = require("../models/userModel");
const ContactDetail = require("../models/ContactDetail");
const CoursesModel = require("../models/CoursesModel");
exports.registration = async (req, res) => {
    const { phone, email } = req.body;
    try {
        req.body.email = email.split(" ").join("").toLowerCase();
        let user = await User.findOne({ $and: [{ $or: [{ email: req.body.email }, { phone: phone }] }], userType: "ADMIN" });
        if (!user) {
            req.body.password = bcrypt.hashSync(req.body.password, 8);
            req.body.userType = "ADMIN";
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
        const user = await User.findOne({ email: email, userType: "ADMIN" });
        if (!user) {
            return res
                .status(404)
                .send({ message: "user not found ! not registered" });
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
exports.update = async (req, res) => {
    try {
        const { fullName, firstName, lastName, email, phone, password } = req.body;
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).send({ message: "not found" });
        }
        user.fullName = fullName || user.fullName;
        user.firstName = firstName || user.firstName;
        user.lastName = lastName || user.lastName;
        user.email = email || user.email;
        user.phone = phone || user.phone;
        if (req.body.password) {
            user.password = bcrypt.hashSync(password, 8) || user.password;
        }
        const updated = await user.save();
        res.status(200).send({ message: "updated", data: updated });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "internal server error " + err.message,
        });
    }
};
exports.addContactDetails = async (req, res) => {
    try {
        let result2 = await ContactDetail.create(req.body);
        if (result2) {
            res.status(200).send({ status: 200, message: "Contact Detail update successfully", data: result2 });
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: 500, msg: "internal server error", error: err.message, });
    }
};
exports.updateContactDetails = async (req, res) => {
    try {
        let findcontactDetails = await ContactDetail.findOne({ _id: req.params.id });
        if (!findcontactDetails) {
            res.status(404).send({ status: 404, message: "Contact Detail not found.", data: {} });
        } else {
            req.body.fb = req.body.fb || findContact.fb;
            req.body.instagram = req.body.instagram || findContact.instagram;
            req.body.linkedIn = req.body.linkedIn || findContact.linkedIn;
            req.body.twitter = req.body.twitter || findContact.twitter;
            req.body.map = req.body.map || findContact.map;
            req.body.mobileNumber = req.body.mobileNumber || findContact.mobileNumber;
            req.body.mobileNumberDescription = req.body.mobileNumberDescription || findContact.mobileNumberDescription;
            req.body.email = req.body.email || findContact.email;
            req.body.emailDescription = req.body.emailDescription || findContact.emailDescription;
            req.body.whatAppchat = req.body.whatAppchat || findContact.whatAppchat;
            req.body.whatAppchatDescription = req.body.whatAppchatDescription || findContact.whatAppchatDescription;
            let updateContact = await ContactDetail.findByIdAndUpdate({ _id: findContact._id }, { $set: req.body }, { new: true });
            if (updateContact) {
                res.status(200).send({ status: 200, message: "Contact Detail update successfully", data: updateContact });
            }
        }
    } catch (err) {
        res.status(500).send({ status: 500, msg: "internal server error", error: err.message, });
    }
};
exports.viewContactDetails = async (req, res) => {
    try {
        let findcontactDetails = await ContactDetail.findOne();
        if (!findcontactDetails) {
            res.status(404).send({ status: 404, message: "Contact Detail not found.", data: {} });
        } else {
            res.status(200).send({ status: 200, message: "Contact Detail fetch successfully", data: findcontactDetails });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: 500, msg: "internal server error", error: err.message, });
    }
};
exports.getbyIdContactDetails = async (req, res) => {
    try {
        let findcontactDetails = await ContactDetail.findOne({ _id: req.params.id });
        if (!findcontactDetails) {
            res.status(404).send({ status: 404, message: "Contact Detail not found.", data: {} });
        } else {
            res.status(200).send({ status: 200, message: "Contact Detail fetch successfully", data: findcontactDetails });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: 500, msg: "internal server error", error: err.message, });
    }
};
exports.AddCourse = async (req, res) => {
    try {
        let fileUrl, image = [];
        if (req.files) {
            for (let i = 0; i < req.files.length; i++) {
                fileUrl = req.files[i].path;
                image.push(fileUrl)
            }
        }
        const data = {
            title: req.body.title,
            description: req.body.description,
            image: image,
            price: req.body.price,
            toDay: req.body.toDay,
            fromDay: req.body.fromDay,
            toTime: req.body.toTime,
            tillDate: req.body.tillDate
        }
        const Data = await CoursesModel.create(data);
        res.status(200).json({ status: 200, message: "Course is Added ", data: Data })
    } catch (err) {
        console.log(err);
        res.status(501).send({ status: 501, message: "server error.", data: {}, });
    }
};
exports.getCourses = async (req, res) => {
    try {
        const Courses = await CoursesModel.find();
        if (Courses.length == 0) {
            return res.status(404).json({ status: 404, message: "No data found", data: {} });
        }
        res.status(200).json({ status: 200, message: "All courses Data found successfully.", data: Courses })
    } catch (err) {
        console.log(err);
        res.status(501).send({ status: 501, message: "server error.", data: {}, });
    }
};
exports.getCoursesById = async (req, res) => {
    try {
        const Courses = await CoursesModel.findById({ _id: req.params.id });
        if (!Courses) {
            return res.status(404).json({ status: 404, message: "No data found", data: {} });
        }
        res.status(200).json({ status: 200, message: "Data found successfully.", data: Courses })
    } catch (err) {
        console.log(err);
        res.status(501).send({ status: 501, message: "server error.", data: {}, });
    }
};
exports.DeleteCourses = async (req, res) => {
    try {
        const Courses = await CoursesModel.findById({ _id: req.params.id });
        if (!Courses) {
            return res.status(404).json({ status: 404, message: "No data found", data: {} });
        }
        await CoursesModel.findByIdAndDelete({ _id: req.params.id });
        res.status(200).json({ status: 200, message: "Courses delete successfully.", data: {} })
    } catch (err) {
        console.log(err);
        res.status(501).send({ status: 501, message: "server error.", data: {}, });
    }
};