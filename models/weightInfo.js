const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const weightInfoSchema = new Schema({
    username: { type: String, required: false },
    value: { type: Number, required: true },
    differenceSinceLast: { type: Number, required: false },
    trackedAt: { type: Date, default: Date.now }
});

const WeightInfo = mongoose.model("WeightInfo", weightInfoSchema);

module.exports = { WeightInfo, weightInfoSchema };
