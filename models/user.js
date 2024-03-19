const mongoose = require("mongoose");
const bcrypt = require('bcrypt');


const Schema = mongoose.Schema;

const userSchema = new Schema({
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

userSchema.pre('save', function(next) {
    let user = this;
    if (!user.isModified('password')) {
        return next();
    }

    bcrypt
        .hash(user.password, 10)
        .then((hash) => {
            user.password = hash;
            next();
        })
        .catch((error) => next(error));
});

userSchema.methods.checkPassword = function(inputPassword) {
    let user = this;
    return bcrypt.compare(inputPassword, user.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
