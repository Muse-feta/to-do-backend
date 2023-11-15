const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    email:{type: String, required: true, unique: true},
    password:{type: String, require: true}
});

const userSchema = mongoose.model('users',schema);

module.exports = userSchema