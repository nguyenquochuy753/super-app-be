const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema(
  {
    movieId: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "Movie",
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Banner", bannerSchema);
