const mongoose = require("mongoose");
const vendorDetailsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    staff: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    bookingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "booking",
        default: null,
    },
    description: {
        type: String,
    },
}, { timestamps: true });
module.exports = mongoose.model("journey", vendorDetailsSchema);
