const mongoose = require('mongoose');
const staticContent = mongoose.Schema({
        heading: {
                type: String
        },
        title: {
                type: String
        },
        desc: {
                type: Array
        },
        image: {
                type: String
        },
}, {
        timestamps: true
})
module.exports = mongoose.model('yourDreamsquickly', staticContent);