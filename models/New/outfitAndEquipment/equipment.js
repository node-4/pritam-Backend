const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const mongooseAggregatePaginate = require("mongoose-aggregate-paginate");
const schema = mongoose.Schema;
const categorySchema = new mongoose.Schema({
    name: {
        type: String
    },
}, { timestamps: true }
);
categorySchema.plugin(mongoosePaginate);
categorySchema.plugin(mongooseAggregatePaginate);
module.exports = mongoose.model("equipment", categorySchema);
