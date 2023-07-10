const mongoose = require("mongoose");
const vendorDetailsSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    phone: {
        type: String,
    },
    email: {
        type: String,
        minLength: 10,
    },
    comment: {
        type: String,
    },
    date: {
        type: Date,
    },
    slot: {
        type: String,
    },
});

module.exports = mongoose.model("inquire", vendorDetailsSchema);
