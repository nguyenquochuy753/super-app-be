const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
      required: true,
    },
    aliases: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const seat = mongoose.model("seatSchema", seatSchema);
module.exports = seat;
