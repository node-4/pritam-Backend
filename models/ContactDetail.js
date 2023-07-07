const mongoose = require('mongoose');
const schema = mongoose.Schema;
const DocumentSchema = schema({
        mobileNumber: {
                type: String
        },
        fb: {
                type: String
        },
        instagram: {
                type: String
        },
        linkedIn: {
                type: String
        },
        twitter: {
                type: String
        },
        mobileNumberDescription: {
                type: String
        },
        email: {
                type: String
        },
        emailDescription: {
                type: String
        },
        whatAppchat: {
                type: String
        },
        map: {
                type: String
        },
        whatAppchatDescription: {
                type: String
        },
}, { timestamps: true })
module.exports = mongoose.model("contactDetails", DocumentSchema);