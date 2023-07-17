const mongoose = require('mongoose');
const staticContent = mongoose.Schema({
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
        enum: ["JOC", "CR", "ABS"],
    },
}, {
    timestamps: true
})
module.exports = mongoose.model('whoWeare', staticContent);