const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: { type: String },
    username: { type: String, required: false, unique: true },
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    email: { type: String, required: false, unique: true },
    password: {
        type: String,
        required: false,
        validate: {
            validator: function(v) {
                return v.length >= 8; // replace 8 with your desired minimum length
            },
            message: (props) => `Password should be at least 8 characters!`,
        },
    },

});

const User = mongoose.model("User", userSchema);

module.exports = User;
