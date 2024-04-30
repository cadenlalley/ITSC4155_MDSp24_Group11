const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const challengeSchema = new Schema({
    name: { type: String, required: false },
    description: { type: String, required: false },
    difficulty: { enum: ['Beginner', 'Intermediate', 'Elite'] },
    points: { type: Number, required: false },
    type: {
        type: String,
        enum: ['Calories', 'Weight', 'Exercise'],
    },
    criteria: { type: Number, required: false },
    completedBy: { type: Schema.ObjectId, ref: 'User' },
    startsAt: { type: Date },
    expiresAt: { type: Date },
});

const Challenge = mongoose.model("Challenge", challengeSchema);

module.exports = Challenge;
