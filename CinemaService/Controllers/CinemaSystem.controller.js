const cinemaSystemModel = require("../Models/CinemaSystem.model");
const slugify = require("slugify");
const TheaterComplexModel = require("../Models/TheaterComplex.model");
const axios = require("axios");

const checkMovieExist = (listMovie, movieId) => {
  for (let i = 0; i < listMovie.length; i++) {
    if (listMovie[i].movieId == movieId) {
      return i;
    }
  }
  return -1;
};

const checkTheaterExistMovie = (listTheater, theaterId) => {
  for (const theater of listTheater) {
    if (theater._id.toString() == theaterId) {
      return true;
    }
  }
  return false;
};

const checkCinemaExist = (listCinema, cinemaId) => {
  for (const cinema of listCinema) {
    if (cinema._id.toString() == cinemaId.toString()) {
      return true;
    }
  }
  return false;
};

const checkTheaterExist = (listShowtimes, theaterId) => {
  for (const show of listShowtimes) {
    if (show.theaterId.toString() == theaterId.toString()) {
      return show;
    }
  }
  return null;
};

const checkTheaterComplexExist = (listTheaterComplex, theaterComplexId) => {
  for (const theaterComplex of listTheaterComplex) {
    if (
      theaterComplex.theaterComplexId.toString() == theaterComplexId.toString()
    ) {
      return true;
    }
  }
  return false;
};
const filterTheaterByShowtimes = (listTheater, showtimes) => {
  const data = [];
  for (const theater of listTheater) {
    for (const show of showtimes) {
      if (show.theaterId == theater._id) {
        data.push(show);
      }
    }
  }
  return data;
};

const cinemaSystemController = {
  addCinemaSystem: async (req, res) => {
    try {
      let alias = slugify(req.body.name, {
        replacement: "-",
        lower: true,
      });
      const newCinemaSystem = new cinemaSystemModel({
        name: req.body.name,
        logo: req.body.logo,
        aliases: alias,
      });
      await newCinemaSystem.save();
      res.status(201).json(newCinemaSystem);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  updateCinemaSystem: async (req, res) => {
    try {
      const { _id } = req.params;
      await cinemaSystemModel.findByIdAndUpdate(_id, req.body, { new: true });
      res.status(200).json("Updated successfully");
    } catch (error) {
      res.status(400).json(error);
    }
  },

  getAllCinemaSystem: async (req, res) => {
    try {
      const cinemaSystems = await cinemaSystemModel.find({});
      res.status(200).json(cinemaSystems);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getCinemaSystemByID: async (req, res) => {
    try {
      const { _id } = req.params;
      const cinemaSystem = await cinemaSystemModel.findById(_id);
      res.status(200).json(cinemaSystem);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  deleteCinemaSystemById: async (req, res) => {
    try {
      const { _id } = req.params;
      await cinemaSystemModel.findByIdAndDelete(_id);
      res.status(200).json("Deleted successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getShowtimesById: async (req, res) => {
    try {
      const { _id } = req.params;
      let cinema = await cinemaSystemModel.findById(_id);
      const theatercomplexes = await TheaterComplexModel.find({
        cinemaSystemId: _id,
      }).populate("theaterList");
      const showtimes = await axios.get(process.env.SHOWTIMES_URL);

      const lstTheaterComplexes = theatercomplexes.map((t) => {
        let listMovie = [];
        showtimes.data.map((show) => {
          if (checkTheaterExistMovie(t.theaterList, show.theaterId)) {
            const checked = checkMovieExist(listMovie, show.movieId);
            const newShow = {
              showtimesId: show._id,
              theaterId: show.theaterId,
              theaterName: show.theaterName,
              premiereDate: show.premiereDate,
              ticketPrice: show.ticketPrice,
              isDone: show.isDone,
            };
            if (checked < 0) {
              listMovie.push({
                showtimesByMovie: [newShow],
                movieId: show.movieId,
                movieName: show.movieName,
                movieImage: show.movieImage,
                movieHot: show.movieHot,
                movieNowShowing: show.movieNowShowing,
                movieComingSoon: show.movieComingSoon,
              });
            } else {
              listMovie[checked].showtimesByMovie.push(newShow);
            }
          }
        });
        return {
          listMovie: listMovie,
          theaterComplexId: t._id,
          theaterComplexName: t.name,
          theaterComplexAddress: t.address,
        };
      });

      res.status(200).json({
        lstTheaterComplexes,
        cinema,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getShowtimesByMovie: async (req, res) => {
    try {
      const { _id } = req.params;
      const movie = await axios.get(process.env.MOVIE_URL + "/" + _id);
      const movieData = {
        movieId: movie.data.movie._id,
        movieName: movie.data.movie.name,
        movieAlias: movie.data.movie.alias,
        movieTrailer: movie.data.movie.trailer,
        movieImage: movie.data.movie.image,
        movieDescription: movie.data.movie.description,
        movieGroup: movie.data.movie.group,
        movieHot: movie.data.movie.hot,
        movieNowShowing: movie.data.movie.nowShowing,
        movieComingSoon: movie.data.movie.comingSoon,
        movieOpeningDay: movie.data.movie.openingDay,
        movieRating: movie.data.movie.rating,
      };
      const cinemas = await cinemaSystemModel.find();
      const showtimes = await axios.get(
        process.env.SHOWTIMES_URL + "/movie/" + _id
      );
      const cinemaByMovie = [];
      for (const cinema of cinemas) {
        const theaterComplex = await TheaterComplexModel.find({
          cinemaSystemId: cinema._id,
        });
        for (const theaterList of theaterComplex) {
          for (const theater of theaterList.theaterList) {
            const show = checkTheaterExist(showtimes.data, theater);
            console.log(theaterList.name, theater, show);
            if (show != null) {
              if (!checkCinemaExist(cinemaByMovie, cinema._id)) {
                cinemaByMovie.push({
                  ...cinema.toObject(),
                  theaterComplexByMovie: [
                    {
                      showtimes: filterTheaterByShowtimes(
                        theaterList.theaterList,
                        showtimes.data
                      ),
                      theaterComplexId: theaterList._id,
                      theaterComplexName: theaterList.name,
                      theaterComplexAddress: theaterList.address,
                      theaterComplexImage: theaterList.image,
                    },
                  ],
                });
              } else if (
                !checkTheaterComplexExist(
                  cinemaByMovie[cinemaByMovie.length - 1].theaterComplexByMovie,
                  theaterList._id
                )
              ) {
                cinemaByMovie[
                  cinemaByMovie.length - 1
                ].theaterComplexByMovie.push({
                  showtimes: filterTheaterByShowtimes(
                    theaterList.theaterList,
                    showtimes.data
                  ),
                  theaterComplexId: theaterList._id,
                  theaterComplexName: theaterList.name,
                  theaterComplexAddress: theaterList.address,
                  theaterComplexImage: theaterList.image,
                });
              }
            }
          }
        }
      }

      res.status(200).json({
        cinemaByMovie,
        ...movieData,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getShowtimesByMovieClient: async (req, res) => {
    try {
      const { _id } = req.params;
      const movie = await axios.get(process.env.MOVIE_URL + "/" + _id);
      const movieData = {
        movieId: movie.data.movie._id,
        movieName: movie.data.movie.name,
        movieAlias: movie.data.movie.alias,
        movieTrailer: movie.data.movie.trailer,
        movieImage: movie.data.movie.image,
        movieDescription: movie.data.movie.description,
        movieGroup: movie.data.movie.group,
        movieHot: movie.data.movie.hot,
        movieNowShowing: movie.data.movie.nowShowing,
        movieComingSoon: movie.data.movie.comingSoon,
        movieOpeningDay: movie.data.movie.openingDay,
        movieRating: movie.data.movie.rating,
      };
      const cinemas = await cinemaSystemModel.find();
      const showtimes = await axios.get(
        process.env.SHOWTIMES_URL + "/movieclient/" + _id
      );
      const cinemaByMovie = [];
      for (const cinema of cinemas) {
        const theaterComplex = await TheaterComplexModel.find({
          cinemaSystemId: cinema._id,
        });
        for (const theaterList of theaterComplex) {
          for (const theater of theaterList.theaterList) {
            const show = checkTheaterExist(showtimes.data, theater);
            console.log(theaterList.name, theater, show);
            if (show != null) {
              if (!checkCinemaExist(cinemaByMovie, cinema._id)) {
                cinemaByMovie.push({
                  ...cinema.toObject(),
                  theaterComplexByMovie: [
                    {
                      showtimes: filterTheaterByShowtimes(
                        theaterList.theaterList,
                        showtimes.data
                      ),
                      theaterComplexId: theaterList._id,
                      theaterComplexName: theaterList.name,
                      theaterComplexAddress: theaterList.address,
                      theaterComplexImage: theaterList.image,
                    },
                  ],
                });
              } else if (
                !checkTheaterComplexExist(
                  cinemaByMovie[cinemaByMovie.length - 1].theaterComplexByMovie,
                  theaterList._id
                )
              ) {
                cinemaByMovie[
                  cinemaByMovie.length - 1
                ].theaterComplexByMovie.push({
                  showtimes: filterTheaterByShowtimes(
                    theaterList.theaterList,
                    showtimes.data
                  ),
                  theaterComplexId: theaterList._id,
                  theaterComplexName: theaterList.name,
                  theaterComplexAddress: theaterList.address,
                  theaterComplexImage: theaterList.image,
                });
              }
            }
          }
        }
      }

      res.status(200).json({
        cinemaByMovie,
        ...movieData,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getAllCinemaSystemAndTheaterComplex: async (req, res) => {
    try {
      const cinemaSystems = await cinemaSystemModel.find({});
      const cinemas = [];
      for (const cinema of cinemaSystems) {
        const data = [];
        let listTheaterComplex = await TheaterComplexModel.find({
          cinemaSystemId: cinema._id.toString(),
        }).populate("theaterList");
        const showtimes = await axios.get(process.env.SHOWTIMES_URL);
        for (let i = 0; i < listTheaterComplex.length; i++) {
          let listMovie = [];
          showtimes.data.map((show) => {
            if (
              checkTheaterExistMovie(
                listTheaterComplex[i].theaterList,
                show.theaterId
              )
            ) {
              const checked = checkMovieExist(listMovie, show.movieId);
              const newShow = {
                showtimesId: show._id,
                theaterId: show.theaterId,
                theaterName: show.theaterName,
                premiereDate: show.premiereDate,
                ticketPrice: show.ticketPrice,
              };
              if (checked < 0) {
                listMovie.push({
                  showtimesByMovie: [newShow],
                  movieId: show.movieId,
                  movieName: show.movieName,
                  movieImage: show.movieImage,
                  movieHot: show.movieHot,
                  movieNowShowing: show.movieNowShowing,
                  movieComingSoon: show.movieComingSoon,
                });
              } else {
                listMovie[checked].showtimesByMovie.push(newShow);
              }
            }
          });
          listTheaterComplex[i].listMovie = listMovie;
          data.push({
            listMovie: listMovie,
            theaterComplexId: listTheaterComplex[i]._id,
            theaterComplexName: listTheaterComplex[i].name,
            theaterComplexAddress: listTheaterComplex[i].address,
          });
        }
        cinemas.push({
          logo: cinema.logo,
          listTheaterComplex: data,
          _id: cinema._id,
          name: cinema.name,
        });
      }
      res.status(200).json(cinemas);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getAllCinemaSystemAndTheaterComplexClient: async (req, res) => {
    try {
      const cinemaSystems = await cinemaSystemModel.find({});
      const cinemas = [];
      for (const cinema of cinemaSystems) {
        const data = [];
        let listTheaterComplex = await TheaterComplexModel.find({
          cinemaSystemId: cinema._id.toString(),
        }).populate("theaterList");
        const showtimes = await axios.get(process.env.SHOWTIMES_URL + "client");
        console.log(process.env.SHOWTIMES_URL + "client", showtimes);
        for (let i = 0; i < listTheaterComplex.length; i++) {
          let listMovie = [];
          showtimes.data.map((show) => {
            if (
              checkTheaterExistMovie(
                listTheaterComplex[i].theaterList,
                show.theaterId
              )
            ) {
              const checked = checkMovieExist(listMovie, show.movieId);
              const newShow = {
                showtimesId: show._id,
                theaterId: show.theaterId,
                theaterName: show.theaterName,
                premiereDate: show.premiereDate,
                ticketPrice: show.ticketPrice,
              };
              if (checked < 0) {
                listMovie.push({
                  showtimesByMovie: [newShow],
                  movieId: show.movieId,
                  movieName: show.movieName,
                  movieImage: show.movieImage,
                  movieHot: show.movieHot,
                  movieNowShowing: show.movieNowShowing,
                  movieComingSoon: show.movieComingSoon,
                });
              } else {
                listMovie[checked].showtimesByMovie.push(newShow);
              }
            }
          });
          listTheaterComplex[i].listMovie = listMovie;
          data.push({
            listMovie: listMovie,
            theaterComplexId: listTheaterComplex[i]._id,
            theaterComplexName: listTheaterComplex[i].name,
            theaterComplexAddress: listTheaterComplex[i].address,
          });
        }
        cinemas.push({
          logo: cinema.logo,
          listTheaterComplex: data,
          _id: cinema._id,
          name: cinema.name,
        });
      }
      res.status(200).json(cinemas);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = cinemaSystemController;
