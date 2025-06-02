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
const banner = require("../../../models/banner");
const Booking = require('../../../models/New/Order/booking');
const AllBooking = require('../../../models/New/Order/AllBooking');
const Cart = require('../../../models/New/cart/cart');
const Address = require("../../../models/address");
//// banner //////////
exports.getAllBanner = async (req, res) => {
    try {
        const categories = await banner.find();
        if (categories.length > 0) {
            return res.status(200).json({ status: 200, message: 'Banner found successfully', data: categories });
        } else {
            return res.status(404).json({ status: 404, message: 'Banner not found.', data: categories });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, message: "server error", message: error.message });
    }
};
exports.getBannerById = async (req, res) => {
    try {
        const bannerId = req.params.bannerId;
        const user = await banner.findById(bannerId);
        if (user) {
            return res.status(200).json({ message: "Banner found successfully", status: 200, data: user, });
        }
        return res.status(404).json({ message: "Banner not Found", status: 404, data: {}, });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, message: "server error", message: error.message });
    }
};
///////////// add job ///////////////
exports.addAddressToCart = async (req, res, next) => {
    try {
        const data = await User.findOne({ _id: req.user._id, });
        if (data) {
            const data1 = await Address.findById({ _id: req.params.id });
            if (data1) {
                let findCart = await Cart.findOne({ user: req.user._id });
                if (findCart) {
                    let obj = {
                        address: data1.address,
                        street: data1.street,
                        city: data1.city,
                        state: data1.state,
                        country: data1.country,
                        pinCode: data1.pinCode,
                        name: data1.name,
                        contactNumber: data1.contactNumber,
                        email: data1.email,
                    }
                    let update = await Cart.findByIdAndUpdate({ _id: findCart._id }, { $set: obj }, { new: true });
                    if (update) {
                        return res.status(200).json({ status: 200, message: "Address added to cart", data: update });
                    }
                } else {
                    let obj = {
                        address: data1.address,
                        street: data1.street,
                        city: data1.city,
                        state: data1.state,
                        country: data1.country,
                        pinCode: data1.pinCode,
                        name: data1.name,
                        contactNumber: data1.contactNumber,
                        email: data1.email,
                        user: req.user._id
                    }
                    let create = await Cart.create(obj);
                    if (create) {
                        return res.status(200).json({ status: 200, message: "Address added to cart", data: create });
                    }
                }
            } else {
                return res.status(404).json({ status: 404, message: "No data found", data: {} });
            }
        } else {
            return res.status(404).json({ status: 404, msg: "User not found", data: {} });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, message: "server error", message: error.message });
    }
};
exports.addShiftDateAndTimeToCart = async (req, res, next) => {
    try {
        const data = await User.findOne({ _id: req.user._id, });
        if (data) {
            let findCart = await Cart.findOne({ user: req.user._id });
            if (findCart) {
                let obj = {
                    startDate: req.body.startDate,
                    endDate: req.body.endDate,
                    dateArray: req.body.dateArray,
                    allowMultipleProfessionals: req.body.allowMultipleProfessionals,
                    bringYourId: req.body.bringYourId,
                    staffMealProvided: req.body.staffMealProvided,
                }
                let update = await Cart.findByIdAndUpdate({ _id: findCart._id }, { $set: obj }, { new: true });
                if (update) {
                    return res.status(200).json({ status: 200, message: "Address added to cart", data: update });
                }
            } else {
                let obj = {
                    startDate: req.body.startDate,
                    endDate: req.body.endDate,
                    dateArray: req.body.dateArray,
                    user: req.user._id,
                    bringYourId: req.body.bringYourId,
                    staffMealProvided: req.body.staffMealProvided,
                }
                let create = await Cart.create(obj);
                if (create) {
                    return res.status(200).json({ status: 200, message: "Address added to cart", data: create });
                }
            }
        } else {
            return res.status(404).json({ status: 404, msg: "User not found", data: {} });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, message: "server error", message: error.message });
    }
};
exports.addJobDetailsToCart = async (req, res, next) => {
    try {
        const data = await User.findOne({ _id: req.user._id, });
        if (data) {
            let findCart = await Cart.findOne({ user: req.user._id });
            if (findCart) {
                let obj = {
                    roles: req.body.roles,
                    departments: req.body.departments,
                }
                let update = await Cart.findByIdAndUpdate({ _id: findCart._id }, { $set: obj }, { new: true });
                if (update) {
                    return res.status(200).json({ status: 200, message: "Address added to cart", data: update });
                }
            } else {
                let obj = {
                    roles: req.body.roles,
                    departments: req.body.departments,
                    user: req.user._id,
                }
                let create = await Cart.create(obj);
                if (create) {
                    return res.status(200).json({ status: 200, message: "Address added to cart", data: create });
                }
            }
        } else {
            return res.status(404).json({ status: 404, msg: "User not found", data: {} });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, message: "server error", message: error.message });
    }
};
exports.addAddOnToCart = async (req, res, next) => {
    try {
        const data = await User.findOne({ _id: req.user._id, });
        if (data) {
            let findCart = await Cart.findOne({ user: req.user._id });
            if (findCart) {
                let obj = {
                    outfit: req.body.outfit,
                    equipment: req.body.equipment,
                    onsiteContact: req.body.onsiteContact,
                    mobility: req.body.mobility,
                    missionDescription: req.body.missionDescription,
                    taskList: req.body.taskList,
                    missionPrice: req.body.missionPrice,
                }
                let update = await Cart.findByIdAndUpdate({ _id: findCart._id }, { $set: obj }, { new: true });
                if (update) {
                    return res.status(200).json({ status: 200, message: "Address added to cart", data: update });
                }
            } else {
                let obj = {
                    outfit: req.body.outfit,
                    equipment: req.body.equipment,
                    onsiteContact: req.body.onsiteContact,
                    mobility: req.body.mobility,
                    missionDescription: req.body.missionDescription,
                    taskList: req.body.taskList,
                    missionPrice: req.body.missionPrice,
                    user: req.user._id,
                }
                let create = await Cart.create(obj);
                if (create) {
                    return res.status(200).json({ status: 200, message: "Address added to cart", data: create });
                }
            }
        } else {
            return res.status(404).json({ status: 404, msg: "User not found", data: {} });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, message: "server error", message: error.message });
    }
};
exports.addInvoiceDetailsToCart = async (req, res, next) => {
    try {
        const data = await User.findOne({ _id: req.user._id, });
        if (data) {
            let findCart = await Cart.findOne({ user: req.user._id });
            if (findCart) {
                let obj = {
                    invoiceName: req.body.invoiceName,
                    invoiceAddress: req.body.invoiceAddress,
                    invoicePostCode: req.body.invoicePostCode,
                    invoiceCity: req.body.invoiceCity,
                    invoiceCountry: req.body.invoiceCountry,
                    companyRegistrationNumber: req.body.companyRegistrationNumber,
                    invoiceDetails: req.body.invoiceDetails,
                }
                let update = await Cart.findByIdAndUpdate({ _id: findCart._id }, { $set: obj }, { new: true });
                if (update) {
                    return res.status(200).json({ status: 200, message: "Address added to cart", data: update });
                }
            } else {
                let obj = {
                    invoiceName: req.body.invoiceName,
                    invoiceAddress: req.body.invoiceAddress,
                    invoicePostCode: req.body.invoicePostCode,
                    invoiceCity: req.body.invoiceCity,
                    invoiceCountry: req.body.invoiceCountry,
                    companyRegistrationNumber: req.body.companyRegistrationNumber,
                    invoiceDetails: req.body.invoiceDetails,
                    user: req.user._id,
                }
                let create = await Cart.create(obj);
                if (create) {
                    return res.status(200).json({ status: 200, message: "Address added to cart", data: create });
                }
            }
        } else {
            return res.status(404).json({ status: 404, msg: "User not found", data: {} });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, message: "server error", message: error.message });
    }
};
//////////////// Dashboard //////////////////////
exports.getDashboard = async (req, res) => {
    try {
        const ongoingJobs = await Booking.countDocuments({ user: req.user._id, fromTime: { $gte: new Date() } })
        const completedJobs = await Booking.countDocuments({ user: req.user._id, fromTime: { $lt: new Date() } })
        const totalJobsPosted = await AllBooking.countDocuments({ user: req.user._id })
        const totalInvoicesData = await AllBooking.countDocuments({ user: req.user._id });
        let totalInvoices = 0;
        if (totalInvoicesData.length === 0) {
            totalInvoicesData.forEach((invoice) => {
                totalInvoices += invoice.total;
            })
        }
        let obj = {
            ongoingJobs: ongoingJobs,
            completedJobs: completedJobs,
            totalJobsPosted: totalJobsPosted,
            totalInvoices: totalInvoices,
        }
        return res.status(200).json({ message: "Dashboard info found successfully", status: 200, data: obj, });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, message: "server error", message: error.message });
    }
};