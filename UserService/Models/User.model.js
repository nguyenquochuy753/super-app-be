const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: {
            validator: validator.isEmail,
            message: 'Invalid email address'
        }
    },
    password: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        default: "client"
    }

},{timestamps: true});

const User = mongoose.model('User',userSchema);
module.exports = User;