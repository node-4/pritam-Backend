const mongoose = require("mongoose");
const quesSchema = mongoose.Schema({
        question: {
                type: String,
        },
}, { timestamps: true });
const quesModel = mongoose.model("question", quesSchema);
module.exports = quesModel;
