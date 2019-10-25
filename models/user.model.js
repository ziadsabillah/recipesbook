const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {type: String, required: true},
    username: {type: String, unique: true, trim: true, required: true},
    password: {type: String, required: true, min: 8},
    email: {type: String, unique: true, trim: true, required: true}
});


const User = mongoose.model('User', userSchema);

module.exports = User;