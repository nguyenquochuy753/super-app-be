const mongoose = require('mongoose');

const theaterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Theater = mongoose.model('Theater', theaterSchema);
module.exports = Theater;