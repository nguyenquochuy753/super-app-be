const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    alias: {
      type: String,
      required: true,
    },
    trailer: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    group: {
      type: String,
    },
    openingDay: {
      type: Date,
    },
    rating: {
      type: Number,
    },
    hot: {
      type: Boolean,
      default: false,
    },
    nowShowing: {
      type: Boolean,
      default: false,
    },
    comingSoon: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", movieSchema);
