const mongoose = require('mongoose');
const schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');
const mongooseAggregatePaginate = require("mongoose-aggregate-paginate");
const DocumentSchema = schema({
        staffId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user",
        },
        date: {
                type: Date,
        },
        slot: {
                type: String,
        },
        isBooked: {
                type: Boolean,
                default: false,
        },
        slotBlocked: {
                type: Boolean,
                default: false,
        },
        dayName: {
                type: String,
        }
}, { timestamps: true });
DocumentSchema.plugin(mongooseAggregatePaginate);
DocumentSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("slot", DocumentSchema);
