const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const calorieLossInfoSchema = new Schema({
    username: { type: String, required: false },
    value: { type: Number, required: true },
    trackedAt: { type: Date, default: Date.now }
});

const calorieIntakeInfoSchema = new Schema({
    username: { type: String, required: false },
    value: { type: Number, required: true },
    trackedAt: { type: Date, default: Date.now }
});

const CalorieLossInfo = mongoose.model("CalorieLossInfo", calorieLossInfoSchema);
const CalorieIntakeInfo = mongoose.model("CalorieIntakeInfo", calorieIntakeInfoSchema);

module.exports = { CalorieLossInfo, CalorieIntakeInfo, calorieLossInfoSchema, calorieIntakeInfoSchema }
