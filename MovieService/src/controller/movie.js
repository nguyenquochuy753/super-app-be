const Movie = require("../models/movie");
const slugify = require("slugify");

exports.createMovie = async (req, res) => {
  try {
    const {
      name,
      trailer,
      image,
      description,
      group,
      openingDay,
      rating,
      hot,
      nowShowing,
      comingSoon,
    } = req.body;

    let alias = slugify(name);

    const movie = new Movie({
      name,
      alias,
      trailer,
      image,
      description,
      group,
      openingDay,
      rating,
      hot,
      nowShowing,
      comingSoon,
    });
    const savedMovie = await movie.save();
    res.status(201).json({ movie: savedMovie });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find({});
    res.status(201).json(movies);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getMoviesByPage = async (req, res) => {
  try {
    const { page, pageSize } = req.query;

    let totalMovies = await Movie.countDocuments({});
    let movies = await Movie.find({})
      .skip(pageSize * (page - 1))
      .limit(pageSize)
      .lean();
    res.status(201).json({
      currentPage: page,
      count: pageSize,
      totalPages: Math.ceil(totalMovies / pageSize),
      totalCount: totalMovies,
      movies,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getMoviesByDay = async (req, res) => {
  try {
    const { fromDate, toDate, page, pageSize } = req.query;

    const from = new Date(fromDate);
    const to = new Date(toDate);
    let totalMovies = await Movie.countDocuments({
      openingDay: { $gte: from, $lte: to },
    });

    const movies = await Movie.find({
      openingDay: { $gte: from, $lte: to },
    })
      .skip(pageSize * (page - 1))
      .limit(pageSize)
      .lean();

    res.status(200).json({
      currentPage: page,
      count: pageSize,
      totalPages: Math.ceil(totalMovies / pageSize),
      totalCount: totalMovies,
      movies,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getMoviesById = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findOne({ _id: id });
    res.status(200).json({ movie });
  } catch (error) {
    res.status(404).json({ message: "Movie not found" });
  }
};

exports.getMoviesByName = async (req, res) => {
  try {
    const movie = await Movie.findOne({ name: req.body.name });
    res.status(200).json({ movie });
  } catch (error) {
    res.status(404).json({ message: "Movie not found" });
  }
};

exports.updateMoviesById = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      trailer,
      image,
      description,
      group,
      openingDay,
      rating,
      hot,
      nowShowing,
      comingSoon,
    } = req.body;
    let alias = slugify(name);
    await Movie.findByIdAndUpdate(id, {
      name,
      alias,
      trailer,
      image,
      description,
      group,
      openingDay,
      rating,
      hot,
      nowShowing,
      comingSoon,
    });

    res.status(200).json({
      message: "Movie updated successfully.",
    });
  } catch (error) {
    res.status(404).json({ message: "Movie not updated" });
  }
};

exports.removeMoviesById = async (req, res) => {
  try {
    const { id } = req.params;
    await Movie.findByIdAndDelete(id);
    res.status(200).json({
      message: "Movie deleted successfully.",
    });
  } catch (error) {
    res.status(404).json({ message: "Movie not deleted" });
  }
};
