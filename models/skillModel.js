const mongoose = require("mongoose");
const vendorDetailsSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    descriptionPoints: {
        type: Array,
    },
}, {
    timestamps: true
});

module.exports = mongoose.model("skill", vendorDetailsSchema);
