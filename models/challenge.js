const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const challengeSchema = new Schema({
    name: { type: String, required: false },
    description: { type: String, required: false },
    difficulty: { enum: ['Beginner', 'Intermediate', 'Elite'] },
    points: { type: Number, required: false },
    type: {
        type: String,
        enum: ['Diet', 'Weight', 'Exercise'],
    },
    criteria: { type: Number, required: false },
    eligibleBy: [Schema.ObjectId],
    completedBy: [Schema.ObjectId],
    startsAt: { type: Date, default: new Date(2024, 4, 4) },
    expiresAt: { type: Date, default: new Date(2024, 4, 13) }
});

const Challenge = mongoose.model("Challenge", challengeSchema);

module.exports = { Challenge }
