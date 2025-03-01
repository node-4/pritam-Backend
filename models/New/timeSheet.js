const mongoose = require("mongoose");
const vendorDetailsSchema = new mongoose.Schema({
        user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user",
        },
        bookingId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "booking",
                default: null,
        },
        date: {
                type: Date
        },
        staffData: [{
                staff: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "user",
                },
                date: {
                        type: Date
                },
                startTime: {
                        type: String
                },
                endTime: {
                        type: String
                },
        }],
}, { timestamps: true });
module.exports = mongoose.model("timeSheet", vendorDetailsSchema);
