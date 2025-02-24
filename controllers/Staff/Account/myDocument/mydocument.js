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
exports.getAllUserDocument = async (req, res) => {
    try {
        const data = await userDocument.findOne({ userId: req.user._id })
        if (data) {
            return res.status(200).json({ message: "Transaction  found", data: data });
        } else {
            return res.status(404).json({ status: 404, message: "No data found", data: {} });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ status: 500, message: "server error", message: err.message });
    }
};
exports.updateUserDocument = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ status: 404, message: "No data found", data: {} });
        } else {
            const data = await userDocument.findOne({ userId: req.user._id })
            if (data) {
                let Id, addressProof, attestationDocument;
                if (req.files['Id']) {
                    let Ids = req.files['Id'];
                    Id = Ids[0].path;
                } else {
                    Id = findData.Id
                }
                if (req.files['addressProof']) {
                    let Ids = req.files['addressProof'];
                    addressProof = Ids[0].path;
                } else {
                    addressProof = findData.addressProof
                }
                if (req.files['attestationDocument']) {
                    let Ids = req.files['attestationDocument'];
                    attestationDocument = Ids[0].path;
                } else {
                    attestationDocument = findData.attestationDocument
                }
                let update = await userDocument.findOneAndUpdate({ _id: data._id }, { $set: { Id: Id, addressProof: addressProof, attestationDocument: attestationDocument } }, { new: true })
                return res.status(200).json({ status: 200, message: "Update user document  found", data: update });
            } else {
                let Id, addressProof, attestationDocument;
                if (req.files['Id']) {
                    let Ids = req.files['Id'];
                    Id = Ids[0].path;
                } else {
                    Id = findData.Id
                }
                if (req.files['addressProof']) {
                    let Ids = req.files['addressProof'];
                    addressProof = Ids[0].path;
                } else {
                    addressProof = findData.addressProof
                }
                if (req.files['attestationDocument']) {
                    let Ids = req.files['attestationDocument'];
                    attestationDocument = Ids[0].path;
                } else {
                    attestationDocument = findData.attestationDocument
                }
                let obj = {
                    userId: req.user._id,
                    Id: Id,
                    addressProof: addressProof,
                    attestationDocument: attestationDocument
                }
                let save = await userDocument.create(obj);
                if (save) {
                    return res.status(200).json({ status: 200, message: "Update user document  found", data: save });
                }
            }
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ status: 500, message: "server error", message: err.message });
    }
};