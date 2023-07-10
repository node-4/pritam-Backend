const mongoose = require("mongoose");
const schema = mongoose.Schema;
var userSchema = new schema(
    {
        fullName: {
            type: String,
        },
        firstName: {
            type: String,
        },
        lastName: {
            type: String,
        },
        image: {
            type: String,
        },
        phone: {
            type: String,
        },
        email: {
            type: String,
            minLength: 10,
        },
        password: {
            type: String,
        },
        selectQuestion: {
            type: String,
        },
        yourAnswer: {
            type: String,
        },
        interest: {
            type: String,
        },
        pinCode: {
            type: String,
        },
        address1: {
            type: String,
        },
        address2: {
            type: String,
        },
        otp: {
            type: String,
        },
        otpExpiration: {
            type: Date,
        },
        accountVerification: {
            type: Boolean,
            default: false,
        },
        userType: {
            type: String,
            enum: ["CLIENT", "STAFF", "ADMIN"],
        },
        status: {
            type: String,
            enum: ["Approved", "Reject", "Pending"],
        },
        wallet: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);
module.exports = mongoose.model("user", userSchema);
