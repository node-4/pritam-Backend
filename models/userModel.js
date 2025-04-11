const mongoose = require("mongoose");
const schema = mongoose.Schema;
var userSchema = new schema({
    jobId: [{
        type: schema.Types.ObjectId,
        ref: "job"
    }],
    skillId: [{
        type: schema.Types.ObjectId,
        ref: "skill"
    }],
    title: {
        type: String,
    },
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
    profileOption: {
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
    role: {
        type: String,
        enum: ["EMPLOYMENT", "FREELANCER", ""],
        default: ""
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
    language: {
        type: String,
    },
    /////////////////////////// employment Profile /////
    gender: {
        type: String,
    },
    dateOfBirth: {
        type: Date,
    },
    /////////////////////////// add your address
    street1: {
        type: String,
    },
    street2: {
        type: String,
    },
    town: {
        type: String,
    },
    landMark: {
        type: String,
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    country: {
        type: String,
    },
    pinCode: {
        type: String,
    },
    ///////////////////////// other Details
    interest: {
        type: String,
    },
    expertise: [{
        type: String,
    }],
    yearOfExperience: {
        type: String,
    },
    bio: {
        type: String,
    },
    interestedCity: {
        type: String,
    },
    eligibleToWorkInUk: {
        type: Boolean,
    },
    ownCar: {
        type: Boolean,
    },
    license: {
        type: Boolean,
    },
    /////////////////////// Right to work /////////////////
    facePhoto: {
        type: String,
    },
    frontPassport: {
        type: String,
    },
    backPassport: {
        type: String,
    },
    frontId: {
        type: String,
    },
    backId: {
        type: String,
    },
    cv: {
        type: String,
    },
    uniqueTaxPayerReferenceNumber: {
        type: String,
    },
    /////////////////////// Bank detail /////////////////
    bank: {
        type: String,
    },
    accountName: {
        type: String,
    },
    accountNumber: {
        type: String,
    },
    sortCode: {
        type: String,
    },
    available: {
        type: String,
        enum: ["fullDay", "partTime", ""],
    },
    termsAccepted: {
        type: Date,
    },
    contactPreference: [{
        name: {
            type: String,
        },
        phoneNumber: {
            type: String,
        },
    }],
    //////////////// My Mission Preference //////////////////////////
    travellingDistanceFrom: {
        type: Number,
    },
    travellingDistanceTo: {
        type: Number,
    },
    hourPreferenceFrom: {
        type: Number,
    },
    hourPreferenceTo: {
        type: Number,
    },
    drivingLicense: {
        type: String,
    },
    roleIds: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "role",
    }],
}, { timestamps: true });
module.exports = mongoose.model("user", userSchema);
