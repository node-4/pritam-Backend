const mongoose = require("mongoose");
const schema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "user",
        },
        rating: {
            type: Number,
        },
        comment: {
            type: String,
        },
        date: {
            type: Date,
        },
        type: {
            type: String,
        },
    },
    { timestamps: true }
);
module.exports = mongoose.model("rating", schema);