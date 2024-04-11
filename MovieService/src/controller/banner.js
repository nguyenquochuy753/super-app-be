const Banner = require("../models/banner");

exports.createBanner = async (req, res) => {
  try {
    const { movieId, image } = req.body;

    const banner = new Banner({
      movieId,
      image,
    });
    const savedBanner = await banner.save();
    res.status(201).json(savedBanner);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllBanner = async (req, res) => {
  try {
    const banners = await Banner.find();
    res.status(201).json(banners);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
