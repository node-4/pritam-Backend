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
    nearestRegion: {
        type: String,
    },
    interest: {
        type: String,
    },
}, {
    timestamps: true
});

module.exports = mongoose.model("newLetter", vendorDetailsSchema);
