const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Address = require("../../../models/address");
const User = require("../../../models/userModel");
exports.createContactPreference = async (req, res, next) => {
    try {
        const data = await User.findOne({ _id: req.user._id, });
        if (data) {
            let obj = {
                name: req.body.name,
                phoneNumber: req.body.phoneNumber,
            }
            let update = await User.findByIdAndUpdate({ _id: req.user._id }, { $push: { contactPreference: obj } }, { new: true });
            if (update) {
                return res.status(200).json({ message: "Add contact preference successfully.", data: update });
            }
        } else {
            return res.status(404).json({ status: 404, message: "No data found", data: {} });
        }
    } catch (error) {
        console.log(error);
        return res.status(501).send({ status: 501, message: "server error.", data: {}, });
    }
};
exports.deleteContactPreference = async (req, res) => {
    try {
        const findCart = await User.findOne({ _id: req.user._id, });
        if (findCart) {
            for (let i = 0; i < findCart.contactPreference.length; i++) {
                if (findCart.contactPreference.length > 0) {
                    if (((findCart.contactPreference[i]._id).toString() == req.params.id) == true) {
                        let updateCart = await User.findByIdAndUpdate({ _id: findCart._id, 'contactPreference._id': req.params.id }, { $pull: { 'contactPreference': { _id: req.params.id, phoneNumber: findCart.contactPreference[i].phoneNumber, name: findCart.contactPreference[i].name, } } }, { new: true })
                        if (updateCart) {
                            return res.status(200).send({ message: "Expertise Array delete from ABOUT.", data: updateCart, });
                        }
                    }
                } else {
                    return res.status(200).send({ status: 200, message: "No Data Found ", data: [] });
                }
            }
        } else {
            return res.status(200).send({ status: 200, message: "No Data Found ", data: {} });
        }
    } catch (error) {
        console.log("353====================>", error)
        return res.status(501).send({ status: 501, message: "server error.", data: {}, });
    }
};
exports.updateContactPreference = async (req, res) => {
    try {
        const { name, phoneNumber } = req.body;
        const { id } = req.params;
        const findCart = await User.findOne({ _id: req.user._id, });
        if (findCart) {
            const updatedUser = await User.findOneAndUpdate({ _id: findCart._id, "contactPreference._id": id }, { $set: { "contactPreference.$.name": name, "contactPreference.$.phoneNumber": phoneNumber, } }, { new: true });
            if (updatedUser) {
                return res.status(200).send({ message: "Contact preference updated successfully.", data: updatedUser, });
            } else {
                return res.status(404).send({ status: 404, message: "Contact preference not found.", data: {}, });
            }
        } else {
            return res.status(200).send({ status: 200, message: "No Data Found ", data: {} });
        }
    } catch (error) {
        console.error("Update Error =>", error);
        return res.status(500).send({
            status: 500,
            message: "Server error.",
            data: {},
        });
    }
};
