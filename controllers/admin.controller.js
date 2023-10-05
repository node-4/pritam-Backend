const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require("../configs/auth.config");
const User = require("../models/userModel");
const ContactDetail = require("../models/ContactDetail");
const CoursesModel = require("../models/CoursesModel");
const whoWeare = require("../models/whoWeare");
const popularJob = require("../models/popularJob");
const trendingService = require("../models/trendingService");
const eventModel = require("../models/eventModel");
const subEvent = require("../models/subEvent");
const freelancing = require("../models/freelancing");
const ads = require("../models/ads");
const userModel = require("../models/userModel");
const banner = require('../models/banner');
const allPageTitledescription = require('../models/allPageTitledescription');
const yourDreamsquickly = require('../models/yourDreamsquickly');
const businessweSupport = require('../models/businessweSupport');
const staffTalented = require('../models/staffTalented');
const staffTalentedType = require('../models/staffTalentedType');

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
            return res.status(200).send({ message: "registered successfully ", data: userCreate, });
        } else {
            return res.status(409).send({ message: "Already Exist", data: [] });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
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
        return res.status(201).send({ data: user, accessToken: accessToken });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Server error" + error.message });
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
        return res.status(200).send({ message: "updated", data: updated });
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            message: "internal server error " + err.message,
        });
    }
};
exports.addContactDetails = async (req, res) => {
    try {
        let findCon = await ContactDetail.findOne({ contactType: "Main" });
        if (findCon) {
            return res.status(409).send({ status: 409, message: "Contact Detail already exit", data: {} });
        }
        req.body.contactType = "Main";
        let result2 = await ContactDetail.create(req.body);
        if (result2) {
            return res.status(200).send({ status: 200, message: "Contact Detail update successfully", data: result2 });
        }
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({ status: 500, msg: "internal server error", error: err.message, });
    }
};
exports.addContactDetailsOffice = async (req, res) => {
    try {
        let findCon = await ContactDetail.findOne({ title: req.body.title });
        if (findCon) {
            return res.status(409).send({ status: 409, message: "Contact Detail already exit", data: {} });
        }
        if (req.file) {
            req.body.image = req.file.path
        }
        req.body.contactType = "Other";
        let result2 = await ContactDetail.create(req.body);
        if (result2) {
            return res.status(200).send({ status: 200, message: "Contact Detail update successfully", data: result2 });
        }
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({ status: 500, msg: "internal server error", error: err.message, });
    }
};
exports.updateContactDetailsOffice = async (req, res) => {
    try {
        let findcontactDetails = await ContactDetail.findOne({ _id: req.params.id });
        if (!findcontactDetails) {
            return res.status(404).send({ status: 404, message: "Contact Detail not found.", data: {} });
        } else {
            if (req.file) {
                req.body.image = req.file.path
            }
            req.body.title = req.body.title || findcontactDetails.title;
            req.body.description = req.body.description || findcontactDetails.description;
            req.body.mobileNumber = req.body.mobileNumber || findcontactDetails.mobileNumber;
            req.body.email = req.body.email || findcontactDetails.email;
            req.body.contactType = req.body.contactType || findcontactDetails.contactType;
            req.body.address = req.body.address || findcontactDetails.address;
            req.body.image = req.body.image || findcontactDetails.image;
            let updateContact = await ContactDetail.findByIdAndUpdate({ _id: findcontactDetails._id }, { $set: req.body }, { new: true });
            if (updateContact) {
                return res.status(200).send({ status: 200, message: "Contact Detail update successfully", data: updateContact });
            }
        }
    } catch (err) {
        return res.status(500).send({ status: 500, msg: "internal server error", error: err.message, });
    }
};
exports.viewContactDetailsOffice = async (req, res) => {
    try {
        let findcontactDetails = await ContactDetail.find({ contactType: "Other" });
        if (!findcontactDetails) {
            return res.status(404).send({ status: 404, message: "Contact Detail not found.", data: {} });
        } else {
            return res.status(200).send({ status: 200, message: "Contact Detail fetch successfully", data: findcontactDetails });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({ status: 500, msg: "internal server error", error: err.message, });
    }
};
exports.DeleteContactDetailsOffice = async (req, res) => {
    try {
        const Courses = await ContactDetail.findById({ _id: req.params.id });
        if (!Courses) {
            return res.status(404).json({ status: 404, message: "No data found", data: {} });
        }
        await ContactDetail.findByIdAndDelete({ _id: req.params.id });
        return res.status(200).json({ status: 200, message: "ContactDetail delete successfully.", data: {} })
    } catch (err) {
        console.log(err);
        return res.status(501).send({ status: 501, message: "server error.", data: {}, });
    }
};
exports.updateContactDetails = async (req, res) => {
    try {
        let findcontactDetails = await ContactDetail.findOne({ _id: req.params.id });
        if (!findcontactDetails) {
            return res.status(404).send({ status: 404, message: "Contact Detail not found.", data: {} });
        } else {
            req.body.fb = req.body.fb || findcontactDetails.fb;
            req.body.instagram = req.body.instagram || findcontactDetails.instagram;
            req.body.linkedIn = req.body.linkedIn || findcontactDetails.linkedIn;
            req.body.twitter = req.body.twitter || findcontactDetails.twitter;
            req.body.map = req.body.map || findcontactDetails.map;
            req.body.mobileNumber = req.body.mobileNumber || findcontactDetails.mobileNumber;
            req.body.mobileNumberDescription = req.body.mobileNumberDescription || findcontactDetails.mobileNumberDescription;
            req.body.email = req.body.email || findcontactDetails.email;
            req.body.emailDescription = req.body.emailDescription || findcontactDetails.emailDescription;
            req.body.whatAppchat = req.body.whatAppchat || findcontactDetails.whatAppchat;
            req.body.whatAppchatDescription = req.body.whatAppchatDescription || findcontactDetails.whatAppchatDescription;
            let updateContact = await ContactDetail.findByIdAndUpdate({ _id: findcontactDetails._id }, { $set: req.body }, { new: true });
            if (updateContact) {
                return res.status(200).send({ status: 200, message: "Contact Detail update successfully", data: updateContact });
            }
        }
    } catch (err) {
        return res.status(500).send({ status: 500, msg: "internal server error", error: err.message, });
    }
};
exports.viewContactDetails = async (req, res) => {
    try {
        let findcontactDetails = await ContactDetail.findOne({ contactType: "Main" });
        if (!findcontactDetails) {
            return res.status(404).send({ status: 404, message: "Contact Detail not found.", data: {} });
        } else {
            return res.status(200).send({ status: 200, message: "Contact Detail fetch successfully", data: findcontactDetails });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({ status: 500, msg: "internal server error", error: err.message, });
    }
};
exports.getbyIdContactDetails = async (req, res) => {
    try {
        let findcontactDetails = await ContactDetail.findOne({ _id: req.params.id });
        if (!findcontactDetails) {
            return res.status(404).send({ status: 404, message: "Contact Detail not found.", data: {} });
        } else {
            return res.status(200).send({ status: 200, message: "Contact Detail fetch successfully", data: findcontactDetails });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({ status: 500, msg: "internal server error", error: err.message, });
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
        console.log(req.body.tillDate);
        const d = new Date(req.body.tillDate);
        let text = d.toISOString();
        const data = {
            title: req.body.title,
            description: req.body.description,
            image: image,
            price: req.body.price,
            toDay: req.body.toDay,
            fromDay: req.body.fromDay,
            toTime: req.body.toTime,
            tillDate: text,
            descriptionPoints: req.body.descriptionPoints
        }
        const Data = await CoursesModel.create(data);
        return res.status(200).json({ status: 200, message: "Course is Added ", data: Data })
    } catch (err) {
        console.log(err);
        return res.status(501).send({ status: 501, message: "server error.", data: {}, });
    }
};
exports.editCourse = async (req, res) => {
    try {
        const Courses = await CoursesModel.findById({ _id: req.params.id });
        if (!Courses) {
            return res.status(404).json({ status: 404, message: "No data found", data: {} });
        }
        let fileUrl, image = [];
        if (req.files) {
            for (let i = 0; i < req.files.length; i++) {
                fileUrl = req.files[i].path;
                image.push(fileUrl)
            }
        }
        const d = new Date(req.params.tillDate);
        let text = d.toISOString();
        const data = {
            title: req.body.title || Courses.title,
            description: req.body.description || Courses.description,
            image: image || Courses.image,
            price: req.body.price || Courses.price,
            toDay: req.body.toDay || Courses.toDay,
            fromDay: req.body.fromDay || Courses.fromDay,
            toTime: req.body.toTime || Courses.toTime,
            tillDate: text || Courses.tillDate,
            descriptionPoints: req.body.descriptionPoints || Courses.descriptionPoints,
        }
        const Data = await CoursesModel.findByIdAndUpdate({ _id: Courses._id }, { $set: data }, { new: true });
        return res.status(200).json({ status: 200, message: "Course is Added ", data: Data })
    } catch (err) {
        console.log(err);
        return res.status(501).send({ status: 501, message: "server error.", data: {}, });
    }
};
exports.getCourses = async (req, res) => {
    try {
        const Courses = await CoursesModel.find();
        if (Courses.length == 0) {
            return res.status(404).json({ status: 404, message: "No data found", data: {} });
        } else {
            return res.status(200).json({ status: 200, message: "All courses Data found successfully.", data: Courses })
        }
    } catch (err) {
        console.log(err);
        return res.status(501).send({ status: 501, message: "server error.", data: {}, });
    }
};
exports.getCoursesbyTrendingServiceId = async (req, res) => {
    try {
        if (req.query.date) {
            const Courses = await CoursesModel.find({ trendingServiceId: req.params.trendingServiceId, tillDate: { $lte: req.query.date } });
            if (Courses.length == 0) {
                return res.status(404).json({ status: 404, message: "No data found", data: {} });
            } else {
                return res.status(200).json({ status: 200, message: "All courses Data found successfully.", data: Courses })
            }
        } else {
            const Courses = await CoursesModel.find({ trendingServiceId: req.params.trendingServiceId });
            if (Courses.length == 0) {
                return res.status(404).json({ status: 404, message: "No data found", data: {} });
            } else {
                return res.status(200).json({ status: 200, message: "All courses Data found successfully.", data: Courses })
            }
        }
    } catch (err) {
        console.log(err);
        return res.status(501).send({ status: 501, message: "server error.", data: {}, });
    }
};
exports.getCoursesById = async (req, res) => {
    try {
        const Courses = await CoursesModel.findById({ _id: req.params.id });
        if (!Courses) {
            return res.status(404).json({ status: 404, message: "No data found", data: {} });
        }
        return res.status(200).json({ status: 200, message: "Data found successfully.", data: Courses })
    } catch (err) {
        console.log(err);
        return res.status(501).send({ status: 501, message: "server error.", data: {}, });
    }
};
exports.DeleteCourses = async (req, res) => {
    try {
        const Courses = await CoursesModel.findById({ _id: req.params.id });
        if (!Courses) {
            return res.status(404).json({ status: 404, message: "No data found", data: {} });
        }
        await CoursesModel.findByIdAndDelete({ _id: req.params.id });
        return res.status(200).json({ status: 200, message: "Courses delete successfully.", data: {} })
    } catch (err) {
        console.log(err);
        return res.status(501).send({ status: 501, message: "server error.", data: {}, });
    }
};
exports.addWhoWeare = async (req, res) => {
    try {
        const findData = await whoWeare.findOne({ type: req.body.type });
        if (findData) {
            return res.status(409).json({ status: 409, message: "Already exit ", data: {} })
        } else {
            const data = {
                title: req.body.title,
                desc: req.body.desc,
                image: req.body.image,
                type: req.body.type
            }
            const Data = await whoWeare.create(data);
            return res.status(200).json({ status: 200, message: "whoWeare is Added ", data: Data })
        }
    } catch (err) {
        console.log(err);
        return res.status(501).send({ status: 501, message: "server error.", data: {}, });
    }
};
exports.getWhoWeare = async (req, res) => {
    try {
        const WhoWeare = await whoWeare.find();
        if (WhoWeare.length == 0) {
            return res.status(404).json({ status: 404, message: "No data found", data: {} });
        } else {
            return res.status(200).json({ status: 200, message: "All WhoWeare Data found successfully.", data: WhoWeare })
        }
    } catch (err) {
        console.log(err);
        return res.status(501).send({ status: 501, message: "server error.", data: {}, });
    }
};
exports.editWhoWeare = async (req, res) => {
    try {
        const WhoWeare = await whoWeare.findById({ _id: req.params.id });
        if (!WhoWeare) {
            return res.status(404).json({ status: 404, message: "No data found", data: {} });
        }
        const data = {
            title: req.body.title || WhoWeare.title,
            desc: req.body.desc || WhoWeare.desc,
            image: req.body.image || WhoWeare.image,
            type: WhoWeare.type,
        }
        let updateContact = await whoWeare.findByIdAndUpdate({ _id: WhoWeare._id }, { $set: data }, { new: true });
        if (updateContact) {
            return res.status(200).send({ status: 200, message: "whoWeare update successfully", data: updateContact });
        }
    } catch (err) {
        console.log(err);
        return res.status(501).send({ status: 501, message: "server error.", data: {}, });
    }
};
exports.getWhoWeareById = async (req, res) => {
    try {
        const WhoWeare = await whoWeare.findById({ _id: req.params.id });
        if (!WhoWeare) {
            return res.status(404).json({ status: 404, message: "No data found", data: {} });
        }
        return res.status(200).json({ status: 200, message: "Data found successfully.", data: WhoWeare })
    } catch (err) {
        console.log(err);
        return res.status(501).send({ status: 501, message: "server error.", data: {}, });
    }
};
exports.DeleteWhoWeare = async (req, res) => {
    try {
        const WhoWeare = await whoWeare.findById({ _id: req.params.id });
        if (!WhoWeare) {
            return res.status(404).json({ status: 404, message: "No data found", data: {} });
        }
        await whoWeare.findByIdAndDelete({ _id: req.params.id });
        return res.status(200).json({ status: 200, message: "Who we are delete successfully.", data: {} })
    } catch (err) {
        console.log(err);
        return res.status(501).send({ status: 501, message: "server error.", data: {}, });
    }
};
exports.addPopularJob = async (req, res) => {
    try {
        const findData = await popularJob.findOne({ title: req.body.title });
        if (findData) {
            return res.status(409).json({ status: 409, message: "Already exit ", data: {} })
        } else {
            const data = {
                title: req.body.title,
                mainImage: req.body.mainImage,
                image: req.body.image,
                desc: req.body.desc,
                descPoints: req.body.descPoints,
                earnUpto: req.body.earnUpto,
                currency: req.body.currency,
                per: req.body.per
            }
            const Data = await popularJob.create(data);
            return res.status(200).json({ status: 200, message: "popularJob is Added ", data: Data })
        }
    } catch (err) {
        console.log(err);
        return res.status(501).send({ status: 501, message: "server error.", data: {}, });
    }
};
exports.getPopularJob = async (req, res) => {
    try {
        const PopularJob = await popularJob.find();
        if (PopularJob.length == 0) {
            return res.status(404).json({ status: 404, message: "No data found", data: {} });
        } else {
            return res.status(200).json({ status: 200, message: "All popularJob Data found successfully.", data: PopularJob })
        }
    } catch (err) {
        console.log(err);
        return res.status(501).send({ status: 501, message: "server error.", data: {}, });
    }
};
exports.editPopularJob = async (req, res) => {
    try {
        const PopularJob = await popularJob.findById({ _id: req.params.id });
        if (!PopularJob) {
            return res.status(404).json({ status: 404, message: "No data found", data: {} });
        }
        const data = {
            title: req.body.title || PopularJob.title,
            mainImage: req.body.mainImage || PopularJob.mainImage,
            image: req.body.image || PopularJob.image,
            desc: req.body.desc || PopularJob.desc,
            descPoints: req.body.descPoints || PopularJob.descPoints,
            earnUpto: req.body.earnUpto || PopularJob.earnUpto,
            currency: req.body.currency || PopularJob.currency,
            per: req.body.per || PopularJob.per,
        }
        let updateContact = await popularJob.findByIdAndUpdate({ _id: PopularJob._id }, { $set: data }, { new: true });
        if (updateContact) {
            return res.status(200).send({ status: 200, message: "popularJob update successfully", data: updateContact });
        }
    } catch (err) {
        console.log(err);
        return res.status(501).send({ status: 501, message: "server error.", data: {}, });
    }
};
exports.getPopularJobById = async (req, res) => {
    try {
        const PopularJob = await popularJob.findById({ _id: req.params.id });
        if (!PopularJob) {
            return res.status(404).json({ status: 404, message: "No data found", data: {} });
        }
        return res.status(200).json({ status: 200, message: "Data found successfully.", data: PopularJob })
    } catch (err) {
        console.log(err);
        return res.status(501).send({ status: 501, message: "server error.", data: {}, });
    }
};
exports.DeletePopularJob = async (req, res) => {
    try {
        const PopularJob = await popularJob.findById({ _id: req.params.id });
        if (!PopularJob) {
            return res.status(404).json({ status: 404, message: "No data found", data: {} });
        }
        await popularJob.findByIdAndDelete({ _id: req.params.id });
        return res.status(200).json({ status: 200, message: "Popular Job delete successfully.", data: {} })
    } catch (err) {
        console.log(err);
        return res.status(501).send({ status: 501, message: "server error.", data: {}, });
    }
};
exports.addTrendingService = async (req, res) => {
    try {
        const findData = await trendingService.findOne({ title: req.body.title });
        if (findData) {
            return res.status(409).json({ status: 409, message: "Already exit ", data: {} })
        } else {
            const data = {
                title: req.body.title,
                image: req.body.image,
                desc: req.body.desc,
            }
            const Data = await trendingService.create(data);
            return res.status(200).json({ status: 200, message: "trendingService is Added ", data: Data })
        }
    } catch (err) {
        console.log(err);
        return res.status(501).send({ status: 501, message: "server error.", data: {}, });
    }
};
exports.getTrendingService = async (req, res) => {
    try {
        const TrendingService = await trendingService.find();
        if (TrendingService.length == 0) {
            return res.status(404).json({ status: 404, message: "No data found", data: {} });
        } else {
            return res.status(200).json({ status: 200, message: "All TrendingService Data found successfully.", data: TrendingService })
        }
    } catch (err) {
        console.log(err);
        return res.status(501).send({ status: 501, message: "server error.", data: {}, });
    }
};
exports.editTrendingService = async (req, res) => {
    try {
        const findData = await trendingService.findById({ _id: req.params.id });
        if (!findData) {
            return res.status(404).json({ status: 404, message: "No data found", data: {} });
        }
        const data = {
            title: req.body.title || findData.title,
            image: req.body.image || findData.image,
            desc: req.body.desc || findData.desc,
        }
        let updateContact = await trendingService.findByIdAndUpdate({ _id: findData._id }, { $set: data }, { new: true });
        if (updateContact) {
            return res.status(200).send({ status: 200, message: "trendingService update successfully", data: updateContact });
        }
    } catch (err) {
        console.log(err);
        return res.status(501).send({ status: 501, message: "server error.", data: {}, });
    }
};
exports.getTrendingServiceById = async (req, res) => {
    try {
        const TrendingService = await trendingService.findById({ _id: req.params.id });
        if (!TrendingService) {
            return res.status(404).json({ status: 404, message: "No data found", data: {} });
        }
        return res.status(200).json({ status: 200, message: "Data found successfully.", data: TrendingService })
    } catch (err) {
        console.log(err);
        return res.status(501).send({ status: 501, message: "server error.", data: {}, });
    }
};
exports.DeleteTrendingService = async (req, res) => {
    try {
        const TrendingService = await trendingService.findById({ _id: req.params.id });
        if (!TrendingService) {
            return res.status(404).json({ status: 404, message: "No data found", data: {} });
        }
        await trendingService.findByIdAndDelete({ _id: req.params.id });
        return res.status(200).json({ status: 200, message: "Trending Service delete successfully.", data: {} })
    } catch (err) {
        console.log(err);
        return res.status(501).send({ status: 501, message: "server error.", data: {}, });
    }
};
exports.addEvent = async (req, res) => {
    try {
        const findData = await eventModel.findOne({ title: req.body.title, type: req.body.type });
        if (findData) {
            return res.status(409).json({ status: 409, message: "Already exit ", data: {} })
        } else {
            const data = {
                title: req.body.title,
                image: req.body.image,
                desc: req.body.desc,
                type: req.body.type
            }
            const Data = await eventModel.create(data);
            return res.status(200).json({ status: 200, message: "event is Added ", data: Data })
        }
    } catch (err) {
        console.log(err);
        return res.status(501).send({ status: 501, message: "server error.", data: {}, });
    }
};
exports.getEvent = async (req, res) => {
    try {
        const event = await eventModel.find();
        if (event.length == 0) {
            return res.status(404).json({ status: 404, message: "No data found", data: {} });
        } else {
            return res.status(200).json({ status: 200, message: "All event Data found successfully.", data: event })
        }
    } catch (err) {
        console.log(err);
        return res.status(501).send({ status: 501, message: "server error.", data: {}, });
    }
};
exports.editEvent = async (req, res) => {
    try {
        const event = await eventModel.findById({ _id: req.params.id });
        if (!event) {
            return res.status(404).json({ status: 404, message: "No data found", data: {} });
        }
        const findData = await eventModel.findOne({ _id: { $ne: event._id }, type: req.body.type });
        if (findData) {
            return res.status(409).json({ status: 409, message: "Already exit ", data: {} })
        } else {
            const data = {
                title: req.body.title || findData.title,
                image: req.body.image || findData.image,
                desc: req.body.desc || findData.desc,
                type: req.body.type || findData.type
            }
            let updateContact = await eventModel.findByIdAndUpdate({ _id: event._id }, { $set: data }, { new: true });
            if (updateContact) {
                return res.status(200).send({ status: 200, message: "Event update successfully", data: updateContact });
            }
        }
    } catch (err) {
        console.log(err);
        return res.status(501).send({ status: 501, message: "server error.", data: {}, });
    }
};
exports.getEventById = async (req, res) => {
    try {
        const event = await eventModel.findById({ _id: req.params.id });
        if (!event) {
            return res.status(404).json({ status: 404, message: "No data found", data: {} });
        }
        return res.status(200).json({ status: 200, message: "Data found successfully.", data: event })
    } catch (err) {
        console.log(err);
        return res.status(501).send({ status: 501, message: "server error.", data: {}, });
    }
};
exports.DeleteEvent = async (req, res) => {
    try {
        const event = await eventModel.findById({ _id: req.params.id });
        if (!event) {
            return res.status(404).json({ status: 404, message: "No data found", data: {} });
        }
        await eventModel.findByIdAndDelete({ _id: req.params.id });
        return res.status(200).json({ status: 200, message: "Event delete successfully.", data: {} })
    } catch (err) {
        console.log(err);
        return res.status(501).send({ status: 501, message: "server error.", data: {}, });
    }
};
exports.addSubEvent = async (req, res) => {
    try {
        const findData = await subEvent.findOne({ title: req.body.title, eventId: req.body.eventId });
        if (findData) {
            return res.status(409).json({ status: 409, message: "Already exit ", data: {} })
        } else {
            const event = await eventModel.findById({ _id: req.body.eventId });
            if (!event) {
                return res.status(404).json({ status: 404, message: "No data found", data: {} });
            }
            const data = {
                eventId: req.body.eventId,
                title: req.body.title,
                mainImage: req.body.mainImage,
                image: req.body.image,
                desc: req.body.desc,
                descPoints: req.body.descPoints,
            }
            const Data = await subEvent.create(data);
            return res.status(200).json({ status: 200, message: "Sub event is Added ", data: Data })
        }
    } catch (err) {
        console.log(err);
        return res.status(501).send({ status: 501, message: "server error.", data: {}, });
    }
};
exports.getSubEvent = async (req, res) => {
    try {
        const event = await subEvent.find({ eventId: req.params.eventId }).populate('eventId');
        if (event.length == 0) {
            return res.status(404).json({ status: 404, message: "No data found", data: {} });
        } else {
            return res.status(200).json({ status: 200, message: "All event Data found successfully.", data: event })
        }
    } catch (err) {
        console.log(err);
        return res.status(501).send({ status: 501, message: "server error.", data: {}, });
    }
};
exports.editSubEvent = async (req, res) => {
    try {
        const events = await subEvent.findById({ _id: req.params.id });
        if (!events) {
            return res.status(404).json({ status: 404, message: "No data found", data: {} });
        }
        const findData = await subEvent.findOne({ title: req.body.title, eventId: req.body.eventId });
        if (findData) {
            return res.status(409).json({ status: 409, message: "Already exit ", data: {} })
        } else {
            if (req.body.eventId) {
                const event = await eventModel.findById({ _id: req.body.eventId });
                if (!event) {
                    return res.status(404).json({ status: 404, message: "No data found", data: {} });
                }
            }
            const data = {
                eventId: req.body.eventId || events.eventId,
                title: req.body.title || events.title,
                mainImage: req.body.mainImage || events.mainImage,
                image: req.body.image || events.image,
                desc: req.body.desc || events.desc,
                descPoints: req.body.descPoints || events.descPoints,
            }
            let updateContact = await subEvent.findByIdAndUpdate({ _id: events._id }, { $set: data }, { new: true });
            if (updateContact) {
                return res.status(200).send({ status: 200, message: "Sub Event update successfully", data: updateContact });
            }
        }
    } catch (err) {
        console.log(err);
        return res.status(501).send({ status: 501, message: "server error.", data: {}, });
    }
};
exports.getSubEventById = async (req, res) => {
    try {
        const event = await subEvent.findById({ _id: req.params.id });
        if (!event) {
            return res.status(404).json({ status: 404, message: "No data found", data: {} });
        }
        return res.status(200).json({ status: 200, message: "Data found successfully.", data: event })
    } catch (err) {
        console.log(err);
        return res.status(501).send({ status: 501, message: "server error.", data: {}, });
    }
};
exports.DeleteSubEvent = async (req, res) => {
    try {
        const event = await subEvent.findById({ _id: req.params.id });
        if (!event) {
            return res.status(404).json({ status: 404, message: "No data found", data: {} });
        }
        await subEvent.findByIdAndDelete({ _id: req.params.id });
        return res.status(200).json({ status: 200, message: "Sub Event delete successfully.", data: {} })
    } catch (err) {
        console.log(err);
        return res.status(501).send({ status: 501, message: "server error.", data: {}, });
    }
};
exports.imageUpload = async (req, res) => {
    try {
        let fileUrl;
        if (req.file) {
            fileUrl = req.file.path;
            return res.status(200).json({ status: 200, message: "image url ", data: fileUrl })
        } else {
            return res.status(404).json({ status: 404, message: "Image not provided " })
        }
    } catch (err) {
        console.log(err);
        return res.status(501).send({ status: 501, message: "server error.", data: {}, });
    }
};
exports.addFreelancing = async (req, res) => {
    try {
        const findData = await freelancing.findOne({ title: req.body.title });
        if (findData) {
            return res.status(409).json({ status: 409, message: "Already exit ", data: {} })
        } else {
            const data = {
                title: req.body.title,
                image: req.body.image,
                desc: req.body.desc,
            }
            const Data = await freelancing.create(data);
            return res.status(200).json({ status: 200, message: "freelancing is Added ", data: Data })
        }
    } catch (err) {
        console.log(err);
        return res.status(501).send({ status: 501, message: "server error.", data: {}, });
    }
};
exports.getFreelancing = async (req, res) => {
    try {
        const Freelancing = await freelancing.find();
        if (Freelancing.length == 0) {
            return res.status(404).json({ status: 404, message: "No data found", data: {} });
        } else {
            return res.status(200).json({ status: 200, message: "All Freelancing Data found successfully.", data: Freelancing })
        }
    } catch (err) {
        console.log(err);
        return res.status(501).send({ status: 501, message: "server error.", data: {}, });
    }
};
exports.editFreelancing = async (req, res) => {
    try {
        const Freelancing = await freelancing.findById({ _id: req.params.id });
        if (!Freelancing) {
            return res.status(404).json({ status: 404, message: "No data found", data: {} });
        }
        if (req.body.title) {
            const findData = await freelancing.findOne({ _id: { $ne: Freelancing._id }, title: req.body.title });
            if (findData) {
                return res.status(409).json({ status: 409, message: "Already exit ", data: {} })
            }
        }
        const data = {
            title: req.body.title || Freelancing.title,
            image: req.body.image || Freelancing.image,
            desc: req.body.desc || Freelancing.desc,
        }
        let updateContact = await freelancing.findByIdAndUpdate({ _id: Freelancing._id }, { $set: data }, { new: true });
        if (updateContact) {
            return res.status(200).send({ status: 200, message: "freelancing update successfully", data: updateContact });
        }
    } catch (err) {
        console.log(err);
        return res.status(501).send({ status: 501, message: "server error.", data: {}, });
    }
};
exports.getFreelancingById = async (req, res) => {
    try {
        const Freelancing = await freelancing.findById({ _id: req.params.id });
        if (!Freelancing) {
            return res.status(404).json({ status: 404, message: "No data found", data: {} });
        }
        return res.status(200).json({ status: 200, message: "Data found successfully.", data: Freelancing })
    } catch (err) {
        console.log(err);
        return res.status(501).send({ status: 501, message: "server error.", data: {}, });
    }
};
exports.DeleteFreelancing = async (req, res) => {
    try {
        const Freelancing = await freelancing.findById({ _id: req.params.id });
        if (!Freelancing) {
            return res.status(404).json({ status: 404, message: "No data found", data: {} });
        }
        await freelancing.findByIdAndDelete({ _id: req.params.id });
        return res.status(200).json({ status: 200, message: "Freelancing delete successfully.", data: {} })
    } catch (err) {
        console.log(err);
        return res.status(501).send({ status: 501, message: "server error.", data: {}, });
    }
};
exports.addAds = async (req, res) => {
    try {
        const findData = await ads.findOne({});
        if (findData) {
            let images = [];
            if (req.files['image']) {
                let image = req.files['image'];
                req.body.image = image[0].path;
            }
            if (req.files['banner']) {
                let banner = req.files['banner'];
                req.body.banner = banner[0].path;
            }
            if (req.files['images']) {
                let imagess = req.files['images'];
                for (let i = 0; i < imagess.length; i++) {
                    images.push(imagess[i].path)
                }
            }
            const data = {
                title: req.body.title || findData.title,
                description: req.body.description || findData.description,
                link: req.body.link || findData.link,
                image: req.body.image,
                images: images,
                desc: req.body.desc || findData.desc,
                banner: req.body.banner || findData.banner,
            }
            const Data = await ads.findByIdAndUpdate({ _id: findData._id }, { $set: data }, { new: true });
            return res.status(200).json({ status: 200, message: "Ads is Added ", data: Data })
        } else {
            let images = [];
            if (req.files['image']) {
                let image = req.files['image'];
                req.body.image = image[0].path;
            }
            if (req.files['banner']) {
                let banner = req.files['banner'];
                req.body.banner = banner[0].path;
            }
            if (req.files['images']) {
                let imagess = req.files['images'];
                for (let i = 0; i < imagess.length; i++) {
                    images.push(imagess[i].path)
                }
            }
            const data = {
                title: req.body.title,
                description: req.body.description,
                link: req.body.link,
                image: req.body.image,
                images: images,
                desc: req.body.desc,
                banner: req.body.banner
            }
            const Data = await ads.create(data);
            return res.status(200).json({ status: 200, message: "Ads is Added ", data: Data })
        }
    } catch (err) {
        console.log(err);
        return res.status(501).send({ status: 501, message: "server error.", data: {}, });
    }
};
exports.getAds = async (req, res) => {
    try {
        const Ads = await ads.findOne();
        if (!Ads) {
            return res.status(404).json({ status: 404, message: "No data found", data: {} });
        } else {
            return res.status(200).json({ status: 200, message: "All Ads Data found successfully.", data: Ads })
        }
    } catch (err) {
        console.log(err);
        return res.status(501).send({ status: 501, message: "server error.", data: {}, });
    }
};
exports.getAdsById = async (req, res) => {
    try {
        const Ads = await ads.findById({ _id: req.params.id });
        if (!Ads) {
            return res.status(404).json({ status: 404, message: "No data found", data: {} });
        }
        return res.status(200).json({ status: 200, message: "Data found successfully.", data: Ads })
    } catch (err) {
        console.log(err);
        return res.status(501).send({ status: 501, message: "server error.", data: {}, });
    }
};
exports.DeleteAds = async (req, res) => {
    try {
        const Ads = await ads.findById({ _id: req.params.id });
        if (!Ads) {
            return res.status(404).json({ status: 404, message: "No data found", data: {} });
        }
        await ads.findByIdAndDelete({ _id: req.params.id });
        return res.status(200).json({ status: 200, message: "Ads delete successfully.", data: {} })
    } catch (err) {
        console.log(err);
        return res.status(501).send({ status: 501, message: "server error.", data: {}, });
    }
};
exports.getClients = async (req, res) => {
    try {
        const Courses = await userModel.find({ userType: "CLIENT" });
        if (Courses.length == 0) {
            return res.status(404).json({ status: 404, message: "No data found", data: {} });
        } else {
            return res.status(200).json({ status: 200, message: "All Client Data found successfully.", data: Courses })
        }
    } catch (err) {
        console.log(err);
        return res.status(501).send({ status: 501, message: "server error.", data: {}, });
    }
}
exports.getStaffs = async (req, res) => {
    try {
        const Courses = await userModel.find({ userType: "STAFF" });
        if (Courses.length == 0) {
            return res.status(404).json({ status: 404, message: "No data found", data: {} });
        } else {
            return res.status(200).json({ status: 200, message: "All Staff Data found successfully.", data: Courses })
        }
    } catch (err) {
        console.log(err);
        return res.status(501).send({ status: 501, message: "server error.", data: {}, });
    }
}
exports.getUserById = async (req, res) => {
    try {
        const Ads = await userModel.findById({ _id: req.params.id });
        if (!Ads) {
            return res.status(404).json({ status: 404, message: "No data found", data: {} });
        }
        return res.status(200).json({ status: 200, message: "Data found successfully.", data: Ads })
    } catch (err) {
        console.log(err);
        return res.status(501).send({ status: 501, message: "server error.", data: {}, });
    }
};
exports.DeleteUser = async (req, res) => {
    try {
        const Ads = await userModel.findById({ _id: req.params.id });
        if (!Ads) {
            return res.status(404).json({ status: 404, message: "No data found", data: {} });
        }
        await userModel.findByIdAndDelete({ _id: req.params.id });
        return res.status(200).json({ status: 200, message: "user delete successfully.", data: {} })
    } catch (err) {
        console.log(err);
        return res.status(501).send({ status: 501, message: "server error.", data: {}, });
    }
};
exports.dashboard = async (req, res, next) => {
    try {
        const client = await User.find({ userType: "CLIENT" }).count()
        const staff = await User.find({ userType: "STAFF" }).count()
        const findEvent = await eventModel.find({}).count()
        const findFreelancing = await freelancing.find({}).count()
        const findSubEvent = await subEvent.find({}).count();
        const findtrendingService = await trendingService.find({}).count()
        const findpopularJob = await popularJob.find({}).count()
        const findwhoWeare = await whoWeare.find({}).count()
        const findCourse = await CoursesModel.find({}).count()
        let obj = {
            client: client,
            staff: staff,
            Event: findEvent,
            Freelancing: findFreelancing,
            subEvent: findSubEvent,
            TrendingService: findtrendingService,
            popularJob: findpopularJob,
            whoWeare: findwhoWeare,
            Course: findCourse
        }
        return res.status(200).json({ status: 200, msg: "DashBoad data", data: obj })
    } catch (error) {
        console.log(error);
        return res.status(501).send({ status: 501, message: "server error.", data: {}, });
    }
};
exports.createBanner = async (req, res) => {
    try {
        const { bannerTitle, bannerDescription, bannerImage, bannerVideo, type, } = req.body;
        let findBanner = await banner.findOne({ type });
        if (findBanner) {
            return res.status(409).json({ status: 409, message: 'Banner already successfully', data: findBanner });
        } else {
            if (req.file) {
                req.body.bannerImage = req.file.path;
            }
            const newCategory = await banner.create(req.body);
            return res.status(200).json({ status: 200, message: 'Banner created successfully', data: newCategory });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to create Banner' });
    }
};
exports.getBannerById = async (req, res) => {
    try {
        const bannerId = req.params.bannerId;
        const user = await banner.findById(bannerId);
        if (user) {
            return res.status(201).json({ message: "Banner found successfully", status: 200, data: user, });
        }
        return res.status(201).json({ message: "Banner not Found", status: 404, data: {}, });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to retrieve Banner" });
    }
};
exports.updateBanner = async (req, res) => {
    try {
        const { bannerTitle, bannerDescription, bannerImage, bannerVideo, type } = req.body;
        const bannerId = req.params.bannerId;
        const findData = await banner.findById(bannerId);
        if (!findData) {
            return res.status(201).json({ message: "Banner not Found", status: 404, data: {}, });
        }
        let findCompany = await banner.findOne({ _id: { $ne: findData._id }, type, });
        if (findCompany) {
            return res.status(409).json({ status: 409, message: 'Banner already Exit', data: findCompany });
        } else {
            if (req.file) {
                req.body.bannerImage = req.file.path;
            }
            let data = {
                bannerTitle: bannerTitle || findData.bannerTitle,
                bannerDescription: bannerDescription || findData.bannerDescription,
                bannerImage: req.body.bannerImage || findData.bannerImage,
                bannerVideo: req.body.bannerVideo || findData.bannerVideo,
                type: type || findData.type,
            }
            const newCategory = await banner.findByIdAndUpdate({ _id: findData._id }, { $set: data }, { new: true });
            return res.status(200).json({ status: 200, message: 'Banner update successfully', data: newCategory });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to create Banner' });
    }
};
exports.deleteBanner = async (req, res) => {
    try {
        const bannerId = req.params.id;
        const user = await banner.findById(bannerId);
        if (user) {
            const user1 = await banner.findByIdAndDelete({ _id: user._id });;
            if (user1) {
                return res.status(201).json({ message: "Banner delete successfully.", status: 200, data: {}, });
            }
        } else {
            return res.status(201).json({ message: "Banner not Found", status: 404, data: {}, });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to retrieve Banner" });
    }
};
exports.getAllBanner = async (req, res) => {
    try {
        const categories = await banner.find();
        if (categories.length > 0) {
            return res.status(200).json({ status: 200, message: 'Banner found successfully', data: categories });
        } else {
            return res.status(404).json({ status: 404, message: 'Banner not found.', data: categories });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to fetch Banner' });
    }
};
exports.getAllBannerByType = async (req, res) => {
    try {
        const categories = await banner.find({ type: req.params.type });
        if (categories.length > 0) {
            return res.status(200).json({ status: 200, message: 'Banner found successfully', data: categories });
        } else {
            return res.status(404).json({ status: 404, message: 'Banner not found.', data: categories });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to fetch Banner' });
    }
};
exports.addPageTitledescription = async (req, res) => {
    try {
        const findData = await allPageTitledescription.findOne({ page: req.body.page });
        if (findData) {
            return res.status(409).json({ status: 409, message: "Already exit ", data: {} })
        } else {
            const data = {
                title: req.body.title,
                page: req.body.page,
                description: req.body.description,
                desc: req.body.desc,
            }
            const Data = await allPageTitledescription.create(data);
            return res.status(200).json({ status: 200, message: "Page Title description is Added ", data: Data })
        }
    } catch (err) {
        console.log(err);
        return res.status(501).send({ status: 501, message: "server error.", data: {}, });
    }
};
exports.getPageTitledescriptionbyPage = async (req, res) => {
    try {
        const Freelancing = await allPageTitledescription.find({ page: req.params.page });
        if (Freelancing.length == 0) {
            return res.status(404).json({ status: 404, message: "No data found", data: {} });
        } else {
            return res.status(200).json({ status: 200, message: "All Page Title description Data found successfully.", data: Freelancing })
        }
    } catch (err) {
        console.log(err);
        return res.status(501).send({ status: 501, message: "server error.", data: {}, });
    }
};
exports.getPageTitledescription = async (req, res) => {
    try {
        const Freelancing = await allPageTitledescription.find();
        if (Freelancing.length == 0) {
            return res.status(404).json({ status: 404, message: "No data found", data: {} });
        } else {
            return res.status(200).json({ status: 200, message: "All Page Title description Data found successfully.", data: Freelancing })
        }
    } catch (err) {
        console.log(err);
        return res.status(501).send({ status: 501, message: "server error.", data: {}, });
    }
};
exports.editPageTitledescription = async (req, res) => {
    try {
        const Freelancing = await allPageTitledescription.findById({ _id: req.params.id });
        if (!Freelancing) {
            return res.status(404).json({ status: 404, message: "No data found", data: {} });
        }
        if (req.body.page) {
            const findData = await allPageTitledescription.findOne({ _id: { $ne: Freelancing._id }, page: req.body.page });
            if (findData) {
                return res.status(409).json({ status: 409, message: "Already exit ", data: {} })
            }
        }
        const data = {
            description: req.body.description || Freelancing.description,
            title: req.body.title || Freelancing.title,
            page: req.body.page || Freelancing.page,
            desc: req.body.desc || Freelancing.desc,
        }
        let updateContact = await allPageTitledescription.findByIdAndUpdate({ _id: Freelancing._id }, { $set: data }, { new: true });
        if (updateContact) {
            return res.status(200).send({ status: 200, message: "Page Title description update successfully", data: updateContact });
        }
    } catch (err) {
        console.log(err);
        return res.status(501).send({ status: 501, message: "server error.", data: {}, });
    }
};
exports.getPageTitledescriptionById = async (req, res) => {
    try {
        const Freelancing = await allPageTitledescription.findById({ _id: req.params.id });
        if (!Freelancing) {
            return res.status(404).json({ status: 404, message: "No data found", data: {} });
        }
        return res.status(200).json({ status: 200, message: "Data found successfully.", data: Freelancing })
    } catch (err) {
        console.log(err);
        return res.status(501).send({ status: 501, message: "server error.", data: {}, });
    }
};
exports.DeletePageTitledescription = async (req, res) => {
    try {
        const Freelancing = await allPageTitledescription.findById({ _id: req.params.id });
        if (!Freelancing) {
            return res.status(404).json({ status: 404, message: "No data found", data: {} });
        }
        await allPageTitledescription.findByIdAndDelete({ _id: req.params.id });
        return res.status(200).json({ status: 200, message: "Page Title description delete successfully.", data: {} })
    } catch (err) {
        console.log(err);
        return res.status(501).send({ status: 501, message: "server error.", data: {}, });
    }
};
exports.createYourDreamsQuickly = async (req, res) => {
    try {
        const { heading, title, desc, image } = req.body;
        let findBanner = await yourDreamsquickly.findOne({});
        if (findBanner) {
            if (req.file) {
                req.body.image = req.file.path;
            }
            let data = {
                heading: heading || findData.heading,
                title: title || findData.title,
                image: req.body.image || findData.image,
                desc: req.body.desc || findData.desc,
            }
            const newCategory = await yourDreamsquickly.findByIdAndUpdate({ _id: findBanner._id }, { $set: data }, { new: true });
            return res.status(200).json({ status: 200, message: 'Your dreams quickly update successfully', data: newCategory });
        } else {
            if (req.file) {
                req.body.image = req.file.path;
            }
            const newCategory = await yourDreamsquickly.create(req.body);
            return res.status(200).json({ status: 200, message: 'Your dreams quickly created successfully', data: newCategory });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to create Your dreams quickly' });
    }
};
exports.getYourDreamsQuicklyById = async (req, res) => {
    try {
        const bannerId = req.params.bannerId;
        const user = await yourDreamsquickly.findById(bannerId);
        if (user) {
            return res.status(201).json({ message: "Banner found successfully", status: 200, data: user, });
        }
        return res.status(201).json({ message: "Banner not Found", status: 404, data: {}, });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to retrieve Banner" });
    }
};
exports.deleteYourDreamsQuickly = async (req, res) => {
    try {
        const bannerId = req.params.id;
        const user = await yourDreamsquickly.findById(bannerId);
        if (user) {
            const user1 = await yourDreamsquickly.findByIdAndDelete({ _id: user._id });;
            if (user1) {
                return res.status(201).json({ message: "Your dreams quickly delete successfully.", status: 200, data: {}, });
            }
        } else {
            return res.status(201).json({ message: "Your dreams quickly not Found", status: 404, data: {}, });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to retrieve Your dreams quickly" });
    }
};
exports.getAllYourDreamsQuickly = async (req, res) => {
    try {
        const categories = await yourDreamsquickly.findOne();
        if (categories) {
            return res.status(200).json({ status: 200, message: 'Your dreams quickly found successfully', data: categories });
        } else {
            return res.status(404).json({ status: 404, message: 'Your dreams quickly not found.', data: categories });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to fetch Your dreams quickly' });
    }
};
exports.createBusinessweSupport = async (req, res) => {
    try {
        const { title, desc, image } = req.body;
        let findBanner = await businessweSupport.findOne({});
        if (findBanner) {
            if (req.file) {
                req.body.image = req.file.path;
            }
            let data = {
                title: title || findData.title,
                image: req.body.image || findData.image,
                desc: desc || findData.desc,
            }
            const newCategory = await businessweSupport.findByIdAndUpdate({ _id: findBanner._id }, { $set: data }, { new: true });
            return res.status(200).json({ status: 200, message: 'Business we Support update successfully', data: newCategory });
        } else {
            if (req.file) {
                req.body.image = req.file.path;
            }
            const newCategory = await businessweSupport.create(req.body);
            return res.status(200).json({ status: 200, message: 'Business we Support created successfully', data: newCategory });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to create Business we Support' });
    }
};
exports.getBusinessweSupportById = async (req, res) => {
    try {
        const bannerId = req.params.bannerId;
        const user = await businessweSupport.findById(bannerId);
        if (user) {
            return res.status(201).json({ message: "Banner found successfully", status: 200, data: user, });
        }
        return res.status(201).json({ message: "Banner not Found", status: 404, data: {}, });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to retrieve Banner" });
    }
};
exports.deleteBusinessweSupport = async (req, res) => {
    try {
        const bannerId = req.params.id;
        const user = await businessweSupport.findById(bannerId);
        if (user) {
            const user1 = await businessweSupport.findByIdAndDelete({ _id: user._id });;
            if (user1) {
                return res.status(201).json({ message: "Business we Support delete successfully.", status: 200, data: {}, });
            }
        } else {
            return res.status(201).json({ message: "Business we Support not Found", status: 404, data: {}, });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to retrieve Business we Support" });
    }
};
exports.getAllBusinessweSupport = async (req, res) => {
    try {
        const categories = await businessweSupport.findOne();
        if (categories) {
            return res.status(200).json({ status: 200, message: 'Business we Support found successfully', data: categories });
        } else {
            return res.status(404).json({ status: 404, message: 'Business we Support not found.', data: categories });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to fetch Business we Support' });
    }
};
exports.addUserinBusinessweSupport = async (req, res) => {
    try {
        const { name, image } = req.body;
        let findBanner = await businessweSupport.findOne({});
        if (findBanner) {
            if (req.file) {
                req.body.image = req.file.path;
            }
            let data = {
                name: name,
                image: req.body.image
            }
            const newCategory = await businessweSupport.findByIdAndUpdate({ _id: findBanner._id }, { $push: { userArray: data } }, { new: true });
            return res.status(200).json({ status: 200, message: 'Business we Support update successfully', data: newCategory });
        } else {
            return res.status(200).json({ status: 200, message: 'Business we Support not found.', data: newCategory });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to create Business we Support' });
    }
};
exports.deleteUserinBusinessweSupport = async (req, res) => {
    try {
        let findCart = await businessweSupport.findOne({});
        if (findCart) {
            for (let i = 0; i < findCart.userArray.length; i++) {
                if (findCart.userArray.length > 1) {
                    if (((findCart.userArray[i]._id).toString() == req.params.id) == true) {
                        let updateCart = await businessweSupport.findByIdAndUpdate({ _id: findCart._id, 'userArray._id': req.params.id }, { $pull: { 'userArray': { _id: req.params.id, name: findCart.userArray[i].name, image: findCart.userArray[i].image, } } }, { new: true })
                        if (updateCart) {
                            return res.status(200).send({ message: "User delete from bussiness we support.", data: updateCart, });
                        }
                    }
                } else {
                    return res.status(200).send({ status: 200, message: "No Data Found ", data: [] });
                }
            }
        } else {
            return res.status(200).send({ status: 200, message: "No Data Found ", cart: [] });
        }

    } catch (error) {
        console.log("353====================>", error)
        return res.status(501).send({ status: 501, message: "server error.", data: {}, });
    }
};
exports.addStaffTalented = async (req, res) => {
    try {
        const findData = await staffTalented.findOne({});
        if (findData) {
            let consultancy = [], image = [];
            if (req.files['formImage']) {
                let formImage = req.files['formImage'];
                req.body.formImage = formImage[0].path;
            }
            if (req.files['image']) {
                let images = req.files['image'];
                for (let i = 0; i < images.length; i++) {
                    image.push(images[i].path)
                }
            }
            if (req.body.consultancyTitle.length > 0) {
                for (let i = 0; i < req.body.consultancyTitle.length; i++) {
                    let obj = {
                        title: req.body.consultancyTitle[i],
                        desc: req.body.consultancyDesc[i],
                    }
                    consultancy.push(obj)
                }
            } else {
                consultancy = findData.consultancy;
            }
            const data = {
                title: req.body.title || findData.title,
                desc: req.body.desc || findData.desc,
                academyHeading: req.body.academyHeading || findData.academyHeading,
                academyTitle: req.body.academyTitle || findData.academyTitle,
                academyDesc: req.body.academyDesc || findData.academyDesc,
                image: req.body.image || findData.image,
                consultancy: consultancy || findData.consultancy,
                youtubeLink: req.body.youtubeLink || findData.youtubeLink,
                formTitle: req.body.formTitle || findData.formTitle,
                formDesc: req.body.formDesc || findData.formDesc,
                formPrivacy: req.body.formPrivacy || findData.formPrivacy,
                formImage: req.body.formImage || findData.formImage,
                formWhatApp: req.body.formWhatApp || findData.formWhatApp,
                formCall: req.body.formCall || findData.formCall,
            }
            const Data = await staffTalented.findByIdAndUpdate({ _id: findData._id }, { $set: data }, { new: true });
            return res.status(200).json({ status: 200, message: "staffTalented is Added ", data: Data })
        } else {
            let consultancy = [], image = [];
            if (req.files['formImage']) {
                let formImage = req.files['formImage'];
                req.body.formImage = formImage[0].path;
            }
            if (req.files['image']) {
                let images = req.files['image'];
                for (let i = 0; i < images.length; i++) {
                    image.push(images[i].path)
                }
            }
            for (let i = 0; i < req.body.consultancyTitle.length; i++) {
                let obj = {
                    title: req.body.consultancyTitle[i],
                    desc: req.body.consultancyDesc[i],
                }
                consultancy.push(obj)
            }
            const data = {
                title: req.body.title,
                desc: req.body.desc,
                academyHeading: req.body.academyHeading,
                academyTitle: req.body.academyTitle,
                academyDesc: req.body.academyDesc,
                image: image,
                consultancy: consultancy,
                youtubeLink: req.body.youtubeLink,
                formTitle: req.body.formTitle,
                formDesc: req.body.formDesc,
                formPrivacy: req.body.formPrivacy,
                formImage: req.body.formImage,
                formWhatApp: req.body.formWhatApp,
                formCall: req.body.formCall,
            }
            const Data = await staffTalented.create(data);
            return res.status(200).json({ status: 200, message: "staffTalented is Added ", data: Data })
        }
    } catch (err) {
        console.log(err);
        return res.status(501).send({ status: 501, message: "server error.", data: {}, });
    }
};
exports.getStaffTalented = async (req, res) => {
    try {
        const StaffTalented = await staffTalented.findOne().populate({ path: 'staffTalentedTypeId', select: "title image" });
        if (!StaffTalented) {
            return res.status(404).json({ status: 404, message: "No data found", data: {} });
        } else {
            return res.status(200).json({ status: 200, message: "All StaffTalented Data found successfully.", data: StaffTalented })
        }
    } catch (err) {
        console.log(err);
        return res.status(501).send({ status: 501, message: "server error.", data: {}, });
    }
};
exports.getStaffTalentedById = async (req, res) => {
    try {
        const StaffTalented = await staffTalented.findById({ _id: req.params.id });
        if (!StaffTalented) {
            return res.status(404).json({ status: 404, message: "No data found", data: {} });
        }
        return res.status(200).json({ status: 200, message: "Data found successfully.", data: StaffTalented })
    } catch (err) {
        console.log(err);
        return res.status(501).send({ status: 501, message: "server error.", data: {}, });
    }
};
exports.DeleteStaffTalented = async (req, res) => {
    try {
        const StaffTalented = await staffTalented.findById({ _id: req.params.id });
        if (!StaffTalented) {
            return res.status(404).json({ status: 404, message: "No data found", data: {} });
        }
        await staffTalented.findByIdAndDelete({ _id: req.params.id });
        return res.status(200).json({ status: 200, message: "StaffTalented  delete successfully.", data: {} })
    } catch (err) {
        console.log(err);
        return res.status(501).send({ status: 501, message: "server error.", data: {}, });
    }
};
exports.addstaffTalentedType = async (req, res) => {
    try {
        const findData = await staffTalentedType.findOne({ title: req.body.title });
        if (findData) {
            let description = [];
            if (req.files['eformImage']) {
                let eformImage = req.files['eformImage'];
                req.body.eformImage = eformImage[0].path;
            }
            if (req.files['image']) {
                let image = req.files['image'];
                req.body.image = image[0].path;
            }
            if (req.body.descriptionTitle.length > 0) {
                let obj = {
                    title: req.body.descriptionTitle[i],
                    desc: req.body.descriptionDesc[i],
                }
                description.push(obj)
            } else {
                description = findData.description;
            }
            const data = {
                title: req.body.title,
                desc: req.body.desc,
                academyHeading: req.body.academyHeading,
                academyTitle: req.body.academyTitle,
                academyDesc: req.body.academyDesc,
                image: req.body.image,
                consultancy: consultancy,
                youtubeLink: req.body.youtubeLink,
                formTitle: req.body.formTitle,
                formDesc: req.body.formDesc,
                formPrivacy: req.body.formPrivacy,
                formImage: req.body.formImage,
                formWhatApp: req.body.formWhatApp,
                formCall: req.body.formCall,
            }
            const Data = await staffTalentedType.findByIdAndUpdate({ _id: findData._id }, { $set: data }, { new: true });
            return res.status(200).json({ status: 200, message: "staffTalented is Added ", data: Data })
        } else {
            let description = [];
            if (req.files['eformImage']) {
                let eformImage = req.files['eformImage'];
                req.body.eformImage = eformImage[0].path;
            }
            if (req.files['image']) {
                let image = req.files['image'];
                req.body.image = image[0].path;
            }
            for (let i = 0; i < req.body.descriptionTitle.length; i++) {
                let obj = {
                    title: req.body.descriptionTitle[i],
                    desc: req.body.descriptionDesc[i],
                }
                description.push(obj)
            }
            const data = {
                title: req.body.title,
                desc: req.body.desc,
                image: req.body.image,
                description: description,
                contactUsformTitle: req.body.contactUsformTitle,
                contactUsformDesc: req.body.contactUsformDesc,
                contactUsformAvailibility: req.body.contactUsformAvailibility,
                contactUsformPrivacy: req.body.contactUsformPrivacy,
                youtubeLink: req.body.youtubeLink,
                eTitle: req.body.eTitle,
                eDesc: req.body.eDesc,
                eformImage: req.body.eformImage,
                eformWhatApp: req.body.eformWhatApp,
                eformCall: req.body.eformCall,
                eformPrivacy: req.body.eformPrivacy,
            }
            const Data = await staffTalentedType.create(data);
            const findData1 = await staffTalented.findOne({});
            if (findData1) {
                let update = await staffTalented.findByIdAndUpdate({ _id: findData1._id }, { $push: { staffTalentedTypeId: Data._id } }, { new: true })
                return res.status(200).json({ status: 200, message: "staffTalented is Added ", data: Data })
            }
        }
    } catch (err) {
        console.log(err);
        return res.status(501).send({ status: 501, message: "server error.", data: {}, });
    }
};
exports.getstaffTalentedType = async (req, res) => {
    try {
        const StaffTalented = await staffTalentedType.find();
        if (!StaffTalented) {
            return res.status(404).json({ status: 404, message: "No data found", data: {} });
        } else {
            return res.status(200).json({ status: 200, message: "All StaffTalented Data found successfully.", data: StaffTalented })
        }
    } catch (err) {
        console.log(err);
        return res.status(501).send({ status: 501, message: "server error.", data: {}, });
    }
};
exports.getstaffTalentedTypeById = async (req, res) => {
    try {
        const StaffTalented = await staffTalentedType.findById({ _id: req.params.id });
        if (!StaffTalented) {
            return res.status(404).json({ status: 404, message: "No data found", data: {} });
        }
        return res.status(200).json({ status: 200, message: "Data found successfully.", data: StaffTalented })
    } catch (err) {
        console.log(err);
        return res.status(501).send({ status: 501, message: "server error.", data: {}, });
    }
};
exports.DeletestaffTalentedType = async (req, res) => {
    try {
        const StaffTalented = await staffTalentedType.findById({ _id: req.params.id });
        if (!StaffTalented) {
            return res.status(404).json({ status: 404, message: "No data found", data: {} });
        }
        await staffTalentedType.findByIdAndDelete({ _id: req.params.id });
        return res.status(200).json({ status: 200, message: "StaffTalented  delete successfully.", data: {} })
    } catch (err) {
        console.log(err);
        return res.status(501).send({ status: 501, message: "server error.", data: {}, });
    }
};