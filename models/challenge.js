const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const challengeSchema = new Schema({
    name: { type: String, required: false},
    description: { type: String, required: false },
    points: { type: Number, required: false },
    //amount of calories/weight loss or gain needed to complete challenge
    toComplete: { type: Number, required: false}
});


const Challenge = mongoose.model("Challenge", challengeSchema);

module.exports = Challenge;