const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const { friendSchema } = require("./friend");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: [true, 'username is required'], unique: [true, 'this username has been used'] },
    firstName: { type: String, required: [true, 'first name is required'] },
    lastName: { type: String, required: [true, 'last name is required'] },
    email: { type: String, required: [true, 'email is required'], unique: [true, 'this email address has been used'] },
    password: { type: String, required: [true, 'password is required']},
    friendsList: [friendSchema],
    createdAt: { type: Date, default: Date.now },
    calorieIntake: {type: Number, required: false},
    calorieLoss: {type: Number, required: false},
    weight: {type: Number, required: false}
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
