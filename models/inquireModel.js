const mongoose = require("mongoose");
const vendorDetailsSchema = new mongoose.Schema({
    trendingServiceId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "trendingService",
    },
    courseId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "course",
    },
    whoWeareId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "whoWeare",
    },
    eventId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "event",
    },
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
    nearestRegion: {
        type: String,
    },
    interest: {
        type: String,
    },
}, {
    timestamps: true
});

module.exports = mongoose.model("inquire", vendorDetailsSchema);
