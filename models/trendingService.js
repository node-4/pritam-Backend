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
}, {
    timestamps: true
})
module.exports = mongoose.model('trendingService', staticContent);