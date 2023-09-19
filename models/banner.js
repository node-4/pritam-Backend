const mongoose = require('mongoose');
const companyCategorySchema = new mongoose.Schema({
        bannerTitle: {
                type: String,
                required: true,
        },
        bannerDescription: {
                type: String,
                required: false,
        },
        bannerImage: {
                type: String,
                required: false,
        },
        bannerVideo: {
                type: String,
                required: false,
        },
        type: {
                type: String,
        },
}, { timestamps: true });
const CompanyCategory = mongoose.model('banner', companyCategorySchema);
module.exports = CompanyCategory;
