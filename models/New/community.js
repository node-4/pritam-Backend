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
    user: [{
        id: {
            type: Schema.Types.ObjectId,
            ref: "user"
        },
        status: {
            type: String,
            enum: ['pending', 'approved',],
            default: 'pending'
        }
    }],
}, { timestamps: true });
const CompanyCategory = mongoose.model('community', companyCategorySchema);
module.exports = CompanyCategory;
