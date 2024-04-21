const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },
    showtimeId: {
      type: String,
      required: true,
    },
    seatId: [],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ticket", ticketSchema);
