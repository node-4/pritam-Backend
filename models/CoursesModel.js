const mongoose = require("mongoose");
const vendorDetailsSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    image: {
        type: Array,
    },
    price: {
        type: String,
    },
    toDay: {
        type: String,
    },
    fromDay: {
        type: String,
    },
    toTime: {
        type: String,
    },
    tillDate: {
        type: Date,
    },
});

module.exports = mongoose.model("course", vendorDetailsSchema);
