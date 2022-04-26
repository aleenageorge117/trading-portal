const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    userName : { type: String, required: [true, 'Name is a required field.']},
    emailId : { type: String, required: [true, 'Email ID is a required field.'], unique: true},
    password : { type: String, required: [true, 'Password is a required field.']}
});

userSchema.pre('save', function (next) {
    let user = this;
    if (!user.isModified('password'))
        return next();
    bcrypt.hash(user.password, 10)
        .then(hash => {
            user.password = hash;
            next();
        })
        .catch(err => next(error));
});


userSchema.methods.comparePassword = function (inputPassword) {
    let user = this;
    return bcrypt.compare(inputPassword, user.password);
}

module.exports = mongoose.model('User', userSchema);