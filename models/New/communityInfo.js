const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
var notificationModel = new Schema({
        communityId: {
                type: Mongoose.Schema.Types.ObjectId,
                ref: "community"
        },
        title: {
                type: String
        },
        description: {
                type: String
        },
        image: {
                type: String
        },
}, { timestamps: true });
module.exports = Mongoose.model("communityInfo", notificationModel);