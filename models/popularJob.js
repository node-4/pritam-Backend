const mongoose = require('mongoose');
const staticContent = mongoose.Schema({
    title: {
        type: String
    },
    mainImage: {
        type: String
    },
    image: {
        type: String
    },
    desc: {
        type: String
    },
    descPoints: {
        type: Array
    },
    earnUpto: {
        type: String
    },
    currency: {
        type: String
    },
    per: {
        type: String,
        enum: ["Hour", "Weekly", "Monthly"]
    },
}, {
    timestamps: true
})
module.exports = mongoose.model('popularJob', staticContent);