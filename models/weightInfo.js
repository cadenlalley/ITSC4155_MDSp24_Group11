const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const weightInfoSchema = new Schema({
    value: { type: Number, required: true },
    trackedAt: { type: Date, default: Date.now }
});

const WeightInfo = mongoose.model("WeightInfo", weightInfoSchema);

module.exports = { WeightInfo, weightInfoSchema };
