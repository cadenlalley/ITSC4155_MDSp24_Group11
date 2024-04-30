const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const goalSchema = new Schema({
    title: { type: String, required: [true, 'title is required']},
    creator: {type: Schema.Types.ObjectId, ref: 'User'}
});

const Goal = mongoose.model("Goal", goalSchema);

module.exports = Goal;
