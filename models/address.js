const mongoose = require("mongoose");
const schema = mongoose.Schema;
const addressSchema = new mongoose.Schema({
        user: {
                type: schema.Types.ObjectId,
                ref: "user",
        },
        address: {
                type: String,
        },
        street: {
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
        name: {
                type: String,
        },
        contactNumber: {
                type: String,
        },
        email: {
                type: String,
        },
        freeParking: {
                type: Boolean,
                default: false,
        },
        location: {
                type: {
                        type: String,
                        enum: ['Point'],
                        default: 'Point',
                },
                coordinates: {
                        type: [Number],
                        default: [0, 0]
                },
        },
        addressType: {
                type: String,
                enum: ["Home", "Work", "Other"]
        },
}, { timestamps: true });
module.exports = mongoose.model("Address", addressSchema);