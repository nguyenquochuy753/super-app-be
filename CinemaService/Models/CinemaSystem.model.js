const mongoose = require('mongoose');

const cinemaSystemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        required: true
    },
    aliases: {
        type: String,
        required: true
    }

}, { timestamps: true });

const cinemaSystem = mongoose.model('CinemaSystem', cinemaSystemSchema);
module.exports = cinemaSystem;