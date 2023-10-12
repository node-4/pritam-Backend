const mongoose = require('mongoose');
const staticContent = mongoose.Schema({
        title: {
                type: String
        },
        desc: {
                type: String
        },
        image: {
                type: String
        },
        contactUsformTitle: {
                type: String
        },
        contactUsformDesc: {
                type: String
        },
        contactUsformAvaili: {
                type: String
        },
        contactUsformWhatApp: {
                type: String
        },
        contactUsformCall: {
                type: String
        },
        contactUsformPrivacy: {
                type: String
        },
        privacy: {
                type: String
        },
        contactUsformTerms: {
                type: String
        },
        youtubeLink: {
                type: String
        },
}, {
        timestamps: true
})
module.exports = mongoose.model('bartending', staticContent);