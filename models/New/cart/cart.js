const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const cartDepartmentSchema = new Schema({
    departmentId: {
        type: Schema.Types.ObjectId,
        ref: "department"
    },
    quantity: {
        type: Number,
        default: 1
    }
}, { _id: false });
const carRoleSchema = new Schema({
    roleId: {
        type: Schema.Types.ObjectId,
        ref: "role"
    },
    quantity: {
        type: Number,
        default: 1
    }
}, { _id: false })
const CartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    departments: {
        type: [cartDepartmentSchema]
    },
    roles: {
        type: [carRoleSchema]
    },
    outfit: [{
        type: String,
    }],
    equipment: [{
        type: String,
    }],
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
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date,
    },
    allowMultipleProfessionals: {
        type: Boolean,
        default: false,
    },
    dateArray: [{
        date: {
            type: Date,
        },
        startTime: {
            type: Date,
        },
        endTime: {
            type: Date,
        }
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
    mobility: {
        type: Array
    },
    missionDescription: {
        type: String
    },
    taskList: [{
        task: {
            type: String,
        },
    }],
    missionPrice: {
        type: Number
    },
    vat: {
        type: Number
    },
    subTotal: {
        type: Number
    },
    total: {
        type: Number
    },
    invoiceName: {
        type: String,
    },
    invoiceAddress: {
        type: String,
    },
    invoicePostCode: {
        type: String,
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
}, {
    timestamps: true
})
module.exports = mongoose.model("cart", CartSchema)