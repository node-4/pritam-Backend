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
        bottomTitle: {
                type: String
        },
        bottomDesc: {
                type: String
        },
        youtubeLink: {
                type: String
        },
        type: {
                type: String,
                enum: ['bartending', 'freelancing', 'contactus', 'findWork', 'aboutUs', 'event']
        },
}, {
        timestamps: true
})
module.exports = mongoose.model('bartending', staticContent);