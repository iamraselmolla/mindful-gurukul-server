const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        unique: true
    },
    author: {
        type: String,
        require: true,
    }
}, { timestamps: true });

const AddedUser = mongoose.model('AddedUser', userSchema);

module.exports = AddedUser;
