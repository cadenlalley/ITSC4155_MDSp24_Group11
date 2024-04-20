const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const { friendSchema } = require("./friend");

const Schema = mongoose.Schema;

const goalSchema = new Schema({
    title: { type: String, required: [true, 'title is required']},
    creator: {type: Schema.Types.ObjectId, ref: 'Goal'}
});

const Goal = mongoose.model("Goal", goalSchema);

module.exports = Goal;