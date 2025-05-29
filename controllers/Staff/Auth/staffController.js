const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require("../../../configs/auth.config");
const userModel = require("../../../models/userModel");
const ContactDetail = require("../../../models/ContactDetail");
const CoursesModel = require("../../../models/CoursesModel");
const inquire = require("../../../models/inquireModel");
const newLetter = require("../../../models/newLetter");
const ratingModel = require("../../../models/ratingModel");
const jobRegisterform = require("../../../models/jobRegisterform");

exports.login = async (req, res) => {
    try {
        const { email, userType } = req.body;
        req.body.email = email.split(" ").join("").toLowerCase();
        const phone = await userModel.findOne({ email: req.body.email, userType: userType });
        if (phone) {
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            let update = await userModel.findByIdAndUpdate({ _id: phone._id }, { $set: { otp: otp } }, { new: true });
            return res.status(200).send({ status: 200, message: "Login successfully ", data: update, });
        } else {
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            req.body.otp = otp;
            req.body.refferalCode = await reffralCode();
            req.body.userType = userType;
            req.body.isTermsAccepted = true;
            const newUser = await userModel.create(req.body);
            return res.status(200).send({ status: 200, message: "Login successfully ", data: newUser, });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, errorName: error.name, message: error.message, });
    }
};
const reffralCode = async () => {
    var digits = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let OTP = '';
    for (let i = 0; i < 9; i++) {
        OTP += digits[Math.floor(Math.random() * 36)];
    }
    return OTP;
}
exports.verifyOtp = async (req, res) => {
    try {
        const { otp } = req.body;
        const user = await userModel.findById(req.params.id);
        if (!user) {
            return res.status(404).send({ status: 404, message: "user not found" });
        }
        if (user.otp !== otp || user.otpExpiration < Date.now()) {
            return res.status(400).json({ message: "Invalid OTP" });
        }
        const updated = await userModel.findByIdAndUpdate({ _id: user._id }, { accountVerification: true }, { new: true });
        const accessToken = await jwt.sign({ id: user._id }, 'pritambackend123App@', { expiresIn: '365d', });
        let obj = {
            userId: updated._id,
            otp: updated.otp,
            email: updated.email,
            token: accessToken,
        }
        return res.status(200).send({ status: 200, message: "logged in successfully", data: obj });
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({ status: 500, error: "internal server error" + err.message });
    }
};
////////////////// credentials   /////////////////
exports.updateCredentials = async (req, res) => {
    try {
        const { role, title, firstName, lastName, email, phone, password, profileOption } = req.body;
        const user = await userModel.findById(req.params.id);
        if (!user) {
            return res.status(404).send({ status: 404, message: "user not found" });
        }
        if (phone) {
            let user1 = await userModel.findOne({ phone: phone, _id: { $ne: user._id }, userType: "STAFF" });
            if (user1) {
                return res.status(409).send({ message: "Already Exist", data: [] });
            }
        }
        if (email) {
            req.body.email = email.split(" ").join("").toLowerCase();
            let user1 = await userModel.findOne({ email: req.body.email, _id: { $ne: user._id }, userType: "STAFF" });
            if (user1) {
                return res.status(409).send({ message: "Already Exist", data: [] });
            }
        }
        if (password) {
            req.body.password = bcrypt.hashSync(password, 8);
        }
        const updated = await userModel.findByIdAndUpdate({ _id: user._id }, { $set: req.body }, { new: true })
        return res.status(200).send({ status: 200, message: "logged in successfully", data: updated });
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({ status: 500, error: "internal server error" + err.message });
    }
};
///////////////// Demographics ///////////////////////
exports.updateDemographics = async (req, res) => {
    try {
        const { gender, dateOfBirth, street1, street2, town, landMark, city, state, country, pinCode, interest, expertise, yearOfExperience, bio, interestedCity, eligibleToWorkInUk, ownCar, license } = req.body;
        const user = await userModel.findById(req.params.id);
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
///////////////// Right to work ///////////////////////
exports.updateRightToWork = async (req, res) => {
    try {
        const { facePhoto, frontPassport, backPassport, frontId, backId, cv, uniqueTaxPayerReferenceNumber, shareCode } = req.body;
        const user = await userModel.findById(req.params.id);
        if (!user) {
            return res.status(404).send({ status: 404, message: "user not found" });
        }
        if (req.files['facePhoto']) {
            let facePhoto = req.files['facePhoto'];
            req.body.facePhoto = facePhoto[0].path;
        } else {
            req.body.facePhoto = user.facePhoto;
        }
        if (req.files['frontPassport']) {
            let frontPassport = req.files['frontPassport'];
            req.body.frontPassport = frontPassport[0].path;
        } else {
            req.body.frontPassport = user.frontPassport;
        }
        if (req.files['backPassport']) {
            let backPassport = req.files['backPassport'];
            req.body.backPassport = backPassport[0].path;
        } else {
            req.body.backPassport = user.backPassport;
        }
        if (req.files['frontId']) {
            let frontId = req.files['frontId'];
            req.body.frontId = frontId[0].path;
        } else {
            req.body.frontId = user.frontId;
        }
        if (req.files['backId']) {
            let backId = req.files['backId'];
            req.body.backId = backId[0].path;
        } else {
            req.body.backId = user.backId;
        }
        if (req.files['cv']) {
            let cv = req.files['cv'];
            req.body.cv = cv[0].path;
        } else {
            req.body.cv = user.cv;
        }
        if (uniqueTaxPayerReferenceNumber) {
            req.body.uniqueTaxPayerReferenceNumber = uniqueTaxPayerReferenceNumber;
        } else {
            req.body.uniqueTaxPayerReferenceNumber = user.uniqueTaxPayerReferenceNumber;
        }
        if (shareCode) {
            req.body.shareCode = shareCode;
        } else {
            req.body.shareCode = user.shareCode;
        }
        const updated = await userModel.findByIdAndUpdate({ _id: user._id }, { $set: req.body }, { new: true })
        return res.status(200).send({ status: 200, message: "logged in successfully", data: updated });
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({ status: 500, error: "internal server error" + err.message });
    }
};
//////////////// Bank Details ////////////////////////
exports.updateBankDetails = async (req, res) => {
    try {
        const { bank, accountName, accountNumber, sortCode } = req.body;
        const user = await userModel.findById(req.params.id);
        if (!user) {
            return res.status(404).send({ status: 404, message: "user not found" });
        }
        if (bank) {
            req.body.bank = bank;
        } else {
            req.body.bank = user.bank;
        }
        if (accountName) {
            req.body.accountName = accountName;
        } else {
            req.body.accountName = user.accountName;
        }
        if (accountNumber) {
            req.body.accountNumber = accountNumber;
        } else {
            req.body.accountNumber = user.accountNumber;
        }
        if (sortCode) {
            req.body.sortCode = sortCode;
        } else {
            req.body.sortCode = user.sortCode;
        }
        const updated = await userModel.findByIdAndUpdate({ _id: user._id }, { $set: req.body }, { new: true })
        return res.status(200).send({ status: 200, message: "logged in successfully", data: updated });
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({ status: 500, error: "internal server error" + err.message });
    }
};
///////////////// Availability ////////////////////////
exports.updateAvailability = async (req, res) => {
    try {
        const { available } = req.body;
        const user = await userModel.findById(req.params.id);
        if (!user) {
            return res.status(404).send({ status: 404, message: "user not found" });
        }
        if (available) {
            req.body.available = available;
        } else {
            req.body.available = user.available;
        }
        const updated = await userModel.findByIdAndUpdate({ _id: user._id }, { $set: req.body }, { new: true })
        return res.status(200).send({ status: 200, message: "update availability in successfully", data: updated });
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({ status: 500, error: "internal server error" + err.message });
    }
};
exports.updateTermsAccepted = async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id);
        if (!user) {
            return res.status(404).send({ status: 404, message: "user not found" });
        }
        let termsAccepted;
        if (user.termsAccepted != (null || undefined)) {
            termsAccepted = new Date(Date.now());
        } else {
            termsAccepted = user.termsAccepted;
        }
        const updated = await userModel.findByIdAndUpdate({ _id: user._id }, { $set: { termsAccepted: termsAccepted } }, { new: true })
        return res.status(200).send({ status: 200, message: "update availability in successfully", data: updated });
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({ status: 500, error: "internal server error" + err.message });
    }
};
/////////////////////////////Home////

