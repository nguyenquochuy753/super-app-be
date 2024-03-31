const mongoose = require('mongoose');

const theaterComplexSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    theaterList: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Theater'
    }],
    cinemaSystemId: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'CinemaSystem'
    }

}, { timestamps: true });

const TheaterComplex = mongoose.model('TheaterComplex', theaterComplexSchema);
module.exports = TheaterComplex;