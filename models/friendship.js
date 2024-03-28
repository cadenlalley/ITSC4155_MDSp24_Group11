const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const friendshipSchema = new Schema({
    user1: { type: Schema.ObjectId, required: true },
    user2: { type: Schema.ObjectId, required: true },
    friends: { type: Boolean, default: false },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    },
    created_at: { type: Date, default: Date.now }
     
});

const Friendship = mongoose.model("Friendship", friendshipSchema);

module.exports = Friendship;
