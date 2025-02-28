const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const companyCategorySchema = new mongoose.Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    image: {
        type: String,
    },
    link: {
        type: String,
    },
}, { timestamps: true });
const CompanyCategory = mongoose.model('Benefit', companyCategorySchema);
module.exports = CompanyCategory;
