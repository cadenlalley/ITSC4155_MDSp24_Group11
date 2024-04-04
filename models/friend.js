const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const friendSchema = new Schema({
    origin: {type : Schema.Types.ObjectId, ref: 'User'},
    originName: {type: String},
    target: {type: Schema.Types.ObjectId, ref: 'User'},
    targetName: {type: String},
    isFriend: { type: Boolean, default: false },
    status: {
        type: String,
        enum: ['Pending', 'Rejected', 'Not Friends', 'Friends'],
        default: 'Pending'
    },
    createdAt: { type: Date, default: Date.now }
});

const Friend = mongoose.model("Friend", friendSchema);

module.exports = { Friend, friendSchema };
