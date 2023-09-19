const mongoose = require('mongoose');
const mongoosePaginate = require("mongoose-paginate");
const mongooseAggregatePaginate = require("mongoose-aggregate-paginate");
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
companyCategorySchema.plugin(mongoosePaginate);
companyCategorySchema.plugin(mongooseAggregatePaginate);
const CompanyCategory = mongoose.model('banner', companyCategorySchema);
module.exports = CompanyCategory;
