const mongoose = require("mongoose");
const vendorDetailsSchema = new mongoose.Schema({
        user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user",
        },
        coupon: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Coupon",
                default: null,
        },
        couponUsed: {
                type: Boolean,
                default: false
        },
        bookingIds: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: "booking",
                default: null,
        }],
        orderId: {
                type: String,
        },
        vat: {
                type: Number,
                default: 0
        },
        couponDiscount: {
                type: Number,
                default: 0
        },
        subTotal: {
                type: Number,
                default: 0
        },
        total: {
                type: Number,
                default: 0
        },
        outfits: [{
                type: String,
        }],
        equipment: [{
                type: String,
        }],
        staffMealProvided: {
                type: Boolean,
                default: false,
        },
        bringYourId: {
                type: Boolean,
                default: false,
        },
        onsiteContact: {
                name: {
                        type: String
                },
                contactNumber: {
                        type: String
                },
        },
        taskList: [{
                task: {
                        type: String,
                },
        }],
        missionDescription: {
                type: String
        },
        contactName: {
                type: String,
        },
        phone: {
                type: String,
        },
        mobility: [{
                type: String,
        }],
        description: {
                type: String,
        },
        pinCode: {
                type: Number,
        },
        parkingAccess: {
                type: String,
        },
        name: {
                type: String,
        },
        address: {
                type: String,
        },
        country: {
                type: String,
        },
        state: {
                type: String,
        },
        city: {
                type: String,
        },
        location: {
                type: {
                        type: String,
                        default: "Point"
                },
                coordinates: {
                        type: [Number],
                        default: [0, 0]
                },
        },
        invoiceName: {
                type: String,
        },
        invoiceAddress: {
                type: String,
        },
        invoicePinCode: {
                type: Number,
        },
        invoiceCity: {
                type: String,
        },
        invoiceCountry: {
                type: String,
        },
        companyRegistrationNumber: {
                type: String,
        },
        invoiceDetails: {
                type: String,
        },
        status: {
                type: String,
                default: "Pending"
        }
}, { timestamps: true });
vendorDetailsSchema.index({ location: "2dsphere" });
module.exports = mongoose.model("AllBooking", vendorDetailsSchema);
