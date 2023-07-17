const mongoose = require('mongoose');
const staticContent = mongoose.Schema({
        eventId: {
                type: mongoose.SchemaTypes.ObjectId,
                ref: "event",
        },
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
}, {
        timestamps: true
    })
module.exports = mongoose.model('subEvent', staticContent);