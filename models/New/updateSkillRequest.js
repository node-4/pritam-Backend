const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
var notificationModel = new Schema({
        userId: {
                type: Mongoose.Schema.Types.ObjectId,
                ref: "user"
        },
        jobId: {
                type: Schema.Types.ObjectId,
                ref: "job"
        },
        skillId: [{
                type: Schema.Types.ObjectId,
                ref: "skill"
        }],
        status: {
                type: String,
                enum: ["pending", "accepted", "rejected"],
                default: "pending"
        },
}, { timestamps: true });
module.exports = Mongoose.model("updateSkillRequest", notificationModel);