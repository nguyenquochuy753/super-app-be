const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    isBook: {
      type: Boolean,
      default: false,
    },
    user: {
      type: String,
    },
    theaterId: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "Theater",
    },
  },
  { timestamps: true }
);

const seat = mongoose.model("Seat", seatSchema);
module.exports = seat;
