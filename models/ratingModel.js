const mongoose = require("mongoose");
const schema = new mongoose.Schema({
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "user",
    },
    staffId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "user",
    },
    jobBusinessTypeId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "jobBusinessType",
    },
    jobId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "job",
    },
    roleId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "role",
    },
    bookingId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "booking",
    },
    name: {
        type: String,
    },
    rating: {
        type: Number,
    },
    comment: {
        type: String,
    },
    staffAgain: {
        type: Boolean,
        default: false,
    },
    date: {
        type: Date,
    },
    type: {
        type: String,
    },
}, { timestamps: true });
module.exports = mongoose.model("rating", schema);