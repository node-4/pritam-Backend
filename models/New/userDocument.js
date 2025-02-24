const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
var notificationModel = new Schema({
        userId: {
                type: Mongoose.Schema.Types.ObjectId,
                ref: "user"
        },
        Id: {
                type: String
        },
        addressProof: {
                type: String
        },
        attestationDocument: {
                type: String
        },
}, { timestamps: true });
module.exports = Mongoose.model("userDocument", notificationModel);