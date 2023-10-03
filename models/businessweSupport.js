const mongoose = require('mongoose');
const staticContent = mongoose.Schema({
        title: {
                type: String
        },
        desc: {
                type: String
        },
        userArray: [{
                name: {
                        type: String
                },
                image: {
                        type: String
                },
        }],
        image: {
                type: String
        },
}, {
        timestamps: true
})
module.exports = mongoose.model('businessweSupport', staticContent);