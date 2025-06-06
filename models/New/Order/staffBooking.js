const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');
const mongooseAggregatePaginate = require("mongoose-aggregate-paginate");
const Schema = mongoose.Schema;
const cartDepartmentSchema = new Schema({
        departmentId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "department"
        },
        quantity: {
                type: Number,
                default: 1
        }
}, { _id: false });
const carRoleSchema = new Schema({
        roleId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "role"
        },
        quantity: {
                type: Number,
                default: 1
        }
}, { _id: false })
const vendorDetailsSchema = new mongoose.Schema({
        user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user",
        },
        staff: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user",
        },
        departments: {
                type: [cartDepartmentSchema]
        },
        roles: {
                type: [carRoleSchema]
        },
        bookingId: {
                type: mongoose.SchemaTypes.ObjectId,
                ref: "booking",
        },
        date: {
                type: Date,
        },
        toTime: {
                type: Date,
        },
        fromTime: {
                type: Date,
        },
        workingHours: {
                type: Number,
        },
        pax: {
                type: Number,
        },
        totalMin: {
                type: Number
        },
        totalTime: {
                type: String
        },
        remark: {
                type: String
        },
        remarkType: {
                type: String
        },
        price: {
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
        startTime: {
                type: String
        },
        endTime: {
                type: String
        },
        timeTaken: {
                type: String
        },
        jobStatus: {
                type: String,
                default: "Pending"
        },
        status: {
                type: String,
                default: "Pending"
        }
}, { timestamps: true });
vendorDetailsSchema.plugin(mongoosePaginate);
vendorDetailsSchema.plugin(mongooseAggregatePaginate);
module.exports = mongoose.model("staffBooking", vendorDetailsSchema);




