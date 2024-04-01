const mongoose = require("mongoose");

const showtimesSchema = new mongoose.Schema(
  {
    theaterId: {
      type: mongoose.Schema.ObjectId,
      ref: "Theater",
    },
    movieId: {
      type: mongoose.Schema.ObjectId,
      ref: "Movie",
    },
    premiereDate: {
      type: Date,
    },
    ticketPrice: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Showtimes", showtimesSchema);
