const mongoose = require('mongoose');
const staticContent = mongoose.Schema({
        title: {
                type: String
        },
        desc: {
                type: String
        },
        description: {
                type: Array
        },
        page: {
                type: String
        },
}, {
        timestamps: true
})
module.exports = mongoose.model('allPageTitledescription', staticContent);