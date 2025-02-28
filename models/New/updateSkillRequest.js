const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
var notificationModel = new Schema({
        userId: {
                type: Mongoose.Schema.Types.ObjectId,
                ref: "user"
        },
        jobId: {
                type: schema.Types.ObjectId,
                ref: "job"
        },
        skillId: [{
                type: schema.Types.ObjectId,
                ref: "skill"
        }],
        status: {
                type: String,
                enum: ["pending", "accepted", "rejected"],
                default: "pending"
        },
}, { timestamps: true });
module.exports = Mongoose.model("updateSkillRequest", notificationModel);