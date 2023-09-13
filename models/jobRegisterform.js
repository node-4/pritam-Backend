const mongoose = require("mongoose");
const vendorDetailsSchema = new mongoose.Schema({
    fullName: {
        type: String,
    },
    email: {
        type: String,
        minLength: 10,
    },
    phone: {
        type: String,
    },
    address: {
        type: String,
    },
    dob: {
        type: String,
    },
}, {
    timestamps: true
});

module.exports = mongoose.model("jobRegisterform", vendorDetailsSchema);
