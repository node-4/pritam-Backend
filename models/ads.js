const mongoose = require("mongoose");
const vendorDetailsSchema = new mongoose.Schema({
        title: {
                type: String,
        },
        description: {
                type: String,
        },
        link: {
                type: String,
        },
        image: {
                type: String,
        },
        banner: {
                type: String,
        },
        images: {
                type: Array,
        },
        desc: {
                type: Array,
        },
}, {
        timestamps: true
});

module.exports = mongoose.model("ads", vendorDetailsSchema);
