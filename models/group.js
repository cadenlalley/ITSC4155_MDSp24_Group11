const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const groupSchema = new Schema({
    groupName: { type: String, required: true },
    groupMembers: [{
        type: Schema.ObjectId
    }],
    created_at: { type: Date, default: Date.now },
    challenges: [{
        type: Schema.ObjectId
    }],
    groupAdmin: { type: Schema.ObjectId },
    groupDescription: { type: String, required: false },
    

});

const Group = mongoose.model("Group", groupSchema);

module.exports = Group;