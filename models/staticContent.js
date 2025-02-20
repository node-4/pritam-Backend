const mongoose = require('mongoose');
const staticContent = mongoose.Schema({
    terms: {
        type: String,
    },
    privacy: {
        type: String,
    },
    title: {
        type: String
    },
    image: {
        type: String
    },
    desc: [{
        title: {
            type: String
        },
        desc: {
            type: String
        },
    }],
    type: {
        type: String,
        enum: ["ABOUTUS", "TERMS", "PRIVACY", "CANCELATION"],
    },
}, {
    timestamps: true
})
module.exports = mongoose.model('staticContent', staticContent);