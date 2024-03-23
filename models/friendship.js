const mongoose = require("mongoose");


const Schema = mongoose.Schema;

const userSchema = new Schema({
    user1: { type: Schema.ObjectId, required: true },
    user2: { type: Schema.ObjectId, required: true },
    status: ['PENDING', 'ACCEPTED', 'DECLINED'],
    default: 'PENDING'
});
