const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');
const mongooseAggregatePaginate = require("mongoose-aggregate-paginate");
const userSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "user",
    },
    candidate: {
        type: mongoose.Schema.ObjectId,
        ref: "user",
    },
    booking: {
        type: mongoose.Schema.ObjectId,
        ref: "booking",
    },
    id: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    amount: {
        type: Number,
    },
    month: {
        type: String,
    },
    description: {
        type: String,
    },
    paymentMode: {
        type: String,
    },
    type: {
        type: String,
    },
    createdBy: {
        type: String,
    },
    Status: {
        type: String,
    },
}, { timestamps: true });
userSchema.plugin(mongoosePaginate);
userSchema.plugin(mongooseAggregatePaginate);
module.exports = mongoose.model("transaction", userSchema);