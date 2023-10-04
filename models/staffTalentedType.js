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
        description: [{
                title: {
                        type: String
                },
                desc: {
                        type: String
                },
        }],
        contactUsformTitle: {
                type: String
        },
        contactUsformDesc: {
                type: String
        },
        contactUsformAvailibility: {
                type: String
        },
        contactUsformPrivacy: {
                type: String
        },
        youtubeLink: {
                type: String
        },
        eTitle: {
                type: String
        },
        eDesc: {
                type: String
        },
        eformImage: {
                type: String
        },
        eformWhatApp: {
                type: String
        },
        eformCall: {
                type: String
        },
        eformPrivacy: {
                type: String
        },
}, {
        timestamps: true
})
module.exports = mongoose.model('staffTalentedType', staticContent);