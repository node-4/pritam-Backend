const mongoose = require('mongoose');
const schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');
const DocumentSchema = schema({
    clientId: {
        type: schema.Types.ObjectId,
        ref: "user"
    },
    staffId: {
        type: schema.Types.ObjectId,
        ref: "user"
    },
    currentDate: {
        type: Number
    },
    month: {
        type: String
    },
    year: {
        type: String
    },
    date: {
        type: String
    },
    day: {
        type: String
    },
}, { timestamps: true })
DocumentSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("attendance", DocumentSchema);
