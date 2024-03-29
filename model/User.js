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
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'others'],
    },
    city: {
        type: String,
        enum: ['Mumbai', 'Pune', 'Ahmedabad'],
    },
    state: {
        type: String,
        enum: ['Gujarat', 'Maharashtra', 'Karnataka'],
    },
    howDidYouHear: [
        {
            type: String,
            enum: ['linkedin', 'friends', 'job-portal', 'others'],
        },
    ],
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
