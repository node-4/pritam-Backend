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
        title: {
                type: String
        },
        body: {
                type: String
        },
        image: {
                type: String
        },
        date: {
                type: String
        },
        time: {
                type: String
        },
        isSent: {
                type: Boolean,
                default: false
        },
        // type: {
        //         type: String,
        //         enum: ["Email", "Push", "SMS"]
        // },
        receiverId: [{
                type: Mongoose.Schema.Types.ObjectId,
                ref: "user"
        }],
        status: {
                type: String,
                enum: ["ACTIVE", "BLOCKED", "DELETE"],
                default: "ACTIVE"
        },
}, { timestamps: true });
module.exports = Mongoose.model("notification", notificationModel);