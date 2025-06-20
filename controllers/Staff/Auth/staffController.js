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
        const { role, title, firstName, lastName, phone, password, profileOption } = req.body;
        const user = await userModel.findById(req.params.id);
        if (!user) {
            return res.status(404).send({ status: 404, message: "user not found" });
        }
        if (phone != undefined || phone != null || phone != "") {
            let user1 = await userModel.findOne({ phone: phone, _id: { $ne: user._id }, userType: "STAFF" });
            if (user1) {
                return res.status(409).send({ message: "Phone already Exist", data: [] });
            }
        }
        // if (email != undefined || email != null || email != "") {
        //     req.body.email = email.split(" ").join("").toLowerCase();
        //     let user1 = await userModel.findOne({ email: req.body.email, _id: { $ne: user._id }, userType: "STAFF" });
        //     if (user1) {
        //         return res.status(409).send({ message: "Email already Exist", data: [] });
        //     }
        // }
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
exports.updateBusinessDetails = async (req, res) => {
    try {
        const { jobId, businessName, businessDescription, street1, street2, town, landMark, city, state, country, pinCode, } = req.body;
        const user = await userModel.findById(req.params.id);
        if (!user) {
            return res.status(404).send({ status: 404, message: "user not found" });
        }
        if (jobId) {
            req.body.jobId = jobId;
        } else {
            req.body.jobId = user.jobId;
        }
        if (businessName) {
            req.body.businessName = businessName;
        } else {
            req.body.businessName = user.businessName;
        }
        if (businessDescription) {
            req.body.businessDescription = businessDescription;
        } else {
            req.body.businessDescription = user.businessDescription;
        }
        if (street1) {
            req.body.street1 = street1;
        } else {
            req.body.street1 = user.street1;
        }
        if (street2) {
            req.body.street2 = street2;
        } else {
            req.body.street2 = user.street2;
        }
        if (town) {
            req.body.town = town;
        } else {
            req.body.town = user.town;
        }
        if (landMark) {
            req.body.landMark = landMark;
        } else {
            req.body.landMark = user.landMark;
        }
        if (city) {
            req.body.city = city;
        } else {
            req.body.city = user.city;
        }
        if (state) {
            req.body.state = state;
        } else {
            req.body.state = user.state;
        }
        if (country) {
            req.body.country = country;
        } else {
            req.body.country = user.country;
        }
        if (pinCode) {
            req.body.pinCode = pinCode;
        } else {
            req.body.pinCode = user.pinCode;
        }
        const updated = await userModel.findByIdAndUpdate({ _id: user._id }, { $set: req.body }, { new: true })
        return res.status(200).send({ status: 200, message: "logged in successfully", data: updated });
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({ status: 500, error: "internal server error" + err.message });
    }
};
exports.forgetPassword = async (req, res) => {
    try {
        const { email, userType } = req.body;
        req.body.email = email.split(" ").join("").toLowerCase();
        const data = await userModel.findOne({ email: req.body.email, userType: userType });
        if (!data) {
            return res.status(400).send({ status: 400, data: {}, message: "Incorrect email" });
        } else {
            let otp = Math.floor(100000 + Math.random() * 900000).toString();
            // var transporter = nodemailer.createTransport({ timeout: 600000, pool: true, service: 'gmail', auth: { "user": "support@spinandshare.com", "pass": "bsoxbpovrhmpxdnd" } });
            // let mailOptions;
            // mailOptions = { from: 'Spinand Share <>', to: req.body.email, subject: 'Password verification', text: `Your account verification code is ${otp}`, };
            // let info = await transporter.sendMail(mailOptions);
            // if (info) {
            let accountVerification = false;
            let otpExpiration = new Date(Date.now() + 5 * 60 * 1000);
            const updated = await userModel.findOneAndUpdate({ _id: data._id }, { $set: { accountVerification: accountVerification, otp: otp, otpExpiration: otpExpiration } }, { new: true, });
            if (updated) {
                return res.status(200).json({ message: "Otp send to your email.", status: 200, data: updated });
            }
            // } else {
            //     return res.status(200).json({ message: "Otp not send on your mail please check.", status: 200, data: {} });
            // }
        }
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({ message: "Internal server error", error: err.message, });
    }
};
exports.forgotVerifyOtp = async (req, res) => {
    try {
        const { otp } = req.body;
        const user = await userModel.findOne({ _id: req.params.id });
        if (!user) {
            return res.status(404).send({ message: "user not found" });
        }
        if (user.otp !== otp || user.otpExpiration < Date.now()) {
            return res.status(400).json({ message: "Invalid otp." });
        }
        const updated = await userModel.findByIdAndUpdate({ _id: user._id }, { $set: { accountVerification: true } }, { new: true });
        let obj = { userId: updated._id, otp: updated.otp, }
        return res.status(200).send({ status: 200, message: "Verify otp successfully", data: obj });
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({ error: "Internal server error" + err.message });
    }
};
exports.changePassword = async (req, res) => {
    try {
        const user = await userModel.findOne({ _id: req.params.id });
        if (user) {
            if (req.body.newPassword == req.body.confirmPassword) {
                const updated = await userModel.findOneAndUpdate({ _id: user._id }, { $set: { password: bcrypt.hashSync(req.body.newPassword, 8), accountVerification: true } }, { new: true });
                return res.status(200).send({ status: 200, message: "Password update successfully.", data: updated, });
            } else {
                return res.status(501).send({ message: "Password Not matched.", data: {}, });
            }
        } else {
            return res.status(404).json({ status: 404, message: "No data found", data: {} });
        }
    } catch (error) {
        console.log(error);
        return res.status(501).send({ status: 501, message: "Internal server error.", data: {}, });
    }
};