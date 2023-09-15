const mongoose = require("mongoose");
const vendorDetailsSchema = new mongoose.Schema({
        title: {
                type: String,
        },
        link: {
                type: String,
        },
        image: {
                type: String,
        },
}, {
        timestamps: true
});

module.exports = mongoose.model("ads", vendorDetailsSchema);
