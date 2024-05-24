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
      isDone: false,
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
        isDone: show.isDone,
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

exports.getAllShowtimesClient = async (req, res) => {
  try {
    const showtimes = await Showtimes.find({});
    const transformShowtimes = [];
    for (const show of showtimes) {
      if (show.isDone == true) {
        continue;
      }
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
        isDone: show.isDone,
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
      isDone: showtimes.isDone,
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
        isDone: show.isDone,
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

exports.getShowtimesByMovieClient = async (req, res) => {
  try {
    const { id } = req.params;
    const showtimes = await Showtimes.find({ movieId: id });
    console.log("Client", showtimes);
    const showtimesData = [];
    for (const show of showtimes) {
      if (show.isDone == true) {
        continue;
      }
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
        isDone: show.isDone,
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

exports.getShowtimesInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const showtimes = await Showtimes.findById(id);

    const timestamp = showtimes.premiereDate;

    const timestampYear = new Date(timestamp).getFullYear();
    const timestampMonth = new Date(timestamp).getUTCMonth() + 1;
    const timestampDay = new Date(timestamp).getUTCDate();
    // const premiereDate = `${
    //   timestampMonth < 10 ? "0" + timestampMonth : timestampMonth
    // }/${
    //   timestampDay < 10 ? "0" + timestampDay : timestampDay
    // }/${timestampYear}`;

    const premiereDate = `${
      timestampDay < 10 ? "0" + timestampDay : timestampDay
    }/${
      timestampMonth < 10 ? "0" + timestampMonth : timestampMonth
    }/${timestampYear}`;

    const timestampHours = new Date(timestamp).getUTCHours();
    const timestampMinutes = new Date(timestamp).getUTCMinutes();
    const premiereTime = `${
      timestampHours < 10 ? "0" + timestampHours : timestampHours
    }:${timestampMinutes < 10 ? "0" + timestampMinutes : timestampMinutes}`;

    const theater = await axios.get(
      process.env.APT_THEATER + "/" + showtimes.theaterId.toString()
    );

    const theaterComplex = await axios.get(
      process.env.APT_THEATER_COMPLEX +
        "/theater/" +
        showtimes.theaterId.toString()
    );

    const movie = await axios.get(
      process.env.APT_MOVIE + "/" + showtimes.movieId.toString()
    );

    const seats = await axios.get(
      process.env.APT_SEAT + "/theater/" + showtimes.theaterId.toString()
    );

    const seatsByShowtimes = seats.data.map((seat) => ({
      ...seat,
      price:
        seat.type == "Vip" ? showtimes.ticketPrice * 2 : showtimes.ticketPrice,
    }));

    const infoMovie = {
      showtimesId: showtimes._id,
      theaterComplexName: theaterComplex.data.name,
      theaterName: theater.data.name,
      address: theaterComplex.data.address,
      movieName: movie.data.movie.name,
      movieImage: movie.data.movie.image,
      premiereDate: premiereDate,
      premiereTime: premiereTime,
    };

    res.status(201).json({ infoMovie: infoMovie, listSeat: seatsByShowtimes });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateShowtime = async (req, res) => {
  try {
    const { id } = req.params;
    const showtime = await Showtimes.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (showtime.isDone == true) {
      await axios.post(process.env.APT_SEAT + "/done", {
        theaterId: showtime.theaterId,
      });
    }
    res.status(200).json("Showtime updated successfully");
  } catch (error) {
    res.status(400).json(error);
  }
};
