const mongoose = require('mongoose');
const staticContent = mongoose.Schema({
        title: {
                type: String
        },
        desc: {
                type: String
        },
        bannerImage: {
                type: String
        },
        imageArray: [{
                title: {
                        type: String
                },
                desc: {
                        type: String
                },
                image: {
                        type: String
                },
        }],
        formImage: {
                type: String
        },
        formTitle: {
                type: String
        },
        formCall: {
                type: String
        },
        formWhatApp: {
                type: String
        },
}, {
        timestamps: true
})
module.exports = mongoose.model('permanentJobRegistration', staticContent);