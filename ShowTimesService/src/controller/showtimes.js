const Showtimes = require("../models/showtimes");
const axios = require("axios");

exports.createShowtimes = async (req, res) => {
  try {
    const { theaterId, movieId, premiereDate, ticketPrice } = req.body;

    const showtimes = new Showtimes({
      theaterId,
      movieId,
      premiereDate,
      ticketPrice,
    });
    const savedShowtimes = await showtimes.save();
    res.status(201).json({ showtimes: savedShowtimes });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllShowtimes = async (req, res) => {
  try {
    const showtimes = await Showtimes.find({});
    const transformShowtimes = [];
    for (const show of showtimes) {
      const theater = await axios.get(
        process.env.APT_THEATER + "/" + show.theaterId.toString()
      );
      const movie = await axios.get(
        process.env.APT_MOVIE + "/" + show.movieId.toString()
      );
      transformShowtimes.push({
        _id: show._id,
        movieId: show.movieId,
        premiereDate: show.premiereDate,
        ticketPrice: show.ticketPrice,
        theaterName: theater.data.name,
        theaterId: theater.data._id,
        movieId: movie.data.movie._id,
        movieName: movie.data.movie.name,
        movieImage: movie.data.movie.image,
        movieHot: movie.data.movie.hot,
        movieNowShowing: movie.data.movie.nowShowing,
        movieComingSoon: movie.data.movie.comingSoon,
      });
    }
    res.status(201).json(transformShowtimes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getShowtimesById = async (req, res) => {
  try {
    const { id } = req.params;
    const showtimes = await Showtimes.findById(id);
    let transformShowtimes;
    const theater = await axios.get(
      process.env.APT_THEATER + "/" + showtimes.theaterId.toString()
    );
    const movie = await axios.get(
      process.env.APT_MOVIE + "/" + showtimes.movieId.toString()
    );
    transformShowtimes = {
      _id: showtimes._id,
      movieId: showtimes.movieId,
      premiereDate: showtimes.premiereDate,
      ticketPrice: showtimes.ticketPrice,
      theaterName: theater.data.name,
      theaterId: theater.data._id,
      movieId: movie.data.movie._id,
      movieName: movie.data.movie.name,
      movieImage: movie.data.movie.image,
      movieHot: movie.data.movie.hot,
      movieNowShowing: movie.data.movie.nowShowing,
      movieComingSoon: movie.data.movie.comingSoon,
    };
    res.status(201).json(transformShowtimes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getShowtimesByMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const showtimes = await Showtimes.find({ movieId: id });
    console.log(showtimes);
    const showtimesData = [];
    for (const show of showtimes) {
      let transformShowtimes;
      const theater = await axios.get(
        process.env.APT_THEATER + "/" + show.theaterId.toString()
      );
      const movie = await axios.get(
        process.env.APT_MOVIE + "/" + show.movieId.toString()
      );
      transformShowtimes = {
        _id: show._id,
        movieId: show.movieId,
        premiereDate: show.premiereDate,
        ticketPrice: show.ticketPrice,
        theaterName: theater.data.name,
        theaterId: theater.data._id,
        movieId: movie.data.movie._id,
        movieName: movie.data.movie.name,
        movieImage: movie.data.movie.image,
        movieHot: movie.data.movie.hot,
        movieNowShowing: movie.data.movie.nowShowing,
        movieComingSoon: movie.data.movie.comingSoon,
      };
      showtimesData.push(transformShowtimes);
    }
    res.status(201).json(showtimesData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
