const mongoose = require('mongoose');
const staticContent = mongoose.Schema({
        title: {
                type: String
        },
        image: {
                type: String
        },
        desc: {
                type: String
        },
        type: {
                type: String,
                enum: ["Event", "Service"]
        },
}, {
        timestamps: true
    })
module.exports = mongoose.model('event', staticContent);