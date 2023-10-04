const mongoose = require('mongoose');
const staticContent = mongoose.Schema({
        staffTalentedTypeId: [{
                type: mongoose.SchemaTypes.ObjectId,
                ref: "staffTalentedType",
        }],
        title: {
                type: String
        },
        desc: {
                type: String
        },
        academyHeading: {
                type: String
        },
        academyTitle: {
                type: String
        },
        academyDesc: {
                type: String
        },
        image: {
                type: Array
        },
        consultancy: [{
                title: {
                        type: String
                },
                desc: {
                        type: String
                },
        }],
        youtubeLink: {
                type: String
        },
        formTitle: {
                type: String
        },
        formDesc: {
                type: String
        },
        formPrivacy: {
                type: String
        },
        formImage: {
                type: String
        },
        formWhatApp: {
                type: String
        },
        formCall: {
                type: String
        },
}, {
        timestamps: true
})
module.exports = mongoose.model('staffTalented', staticContent);