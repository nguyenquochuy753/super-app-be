const cinemaSystemModel = require("../Models/CinemaSystem.model");
const slugify = require("slugify");
const TheaterComplexModel = require("../Models/TheaterComplex.model");
const axios = require("axios");

const checkMovieExist = (listMovie, movieId) => {
  // for (const movie of listMovie) {
  //   if (movie.movieId == movieId) {
  //     return true;
  //   }
  // }
  // return false;
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

const checkListTheaterExistMovie = (listTheater, theaterId) => {
  for (const lst of listTheater) {
    for (const theater of lst.theaterList) {
      console.log(theater.toString());
      if (theater.toString() == theaterId) {
        return true;
      }
    }
  }
  return false;
};

const checkTheaterExist = (listShowtimes, theaterId) => {
  for(const show of listShowtimes){
    if(show.theaterId.toString() == theaterId.toString()){
      return true;
    }
  }
  return false;
}

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
      // console.log(showtimes);
      // console.log(cinemas);
      const cinemaByMovie = [];
      for (const cinema of cinemas) {
        const theaterComplex = await TheaterComplexModel.find({
          cinemaSystemId: cinema._id,
        });
        console.log(cinema.name);
        for(const theaterList of theaterComplex){
          // console.log(theaterList);
          for(const theater of theaterList.theaterList){
            console.log(theater);
            if(checkTheaterExist(showtimes.data, theater)){
              cinemaByMovie.push(cinema);
            }
          }
        }
        // for (const show of showtimes.data) {
        //   if (checkListTheaterExistMovie(theaterComplex, show.theaterId)) {
        //     console.log(cinema.name);
        //     cinemaByMovie.push(cinema);
        //   }
        // }
      }

      res.status(200).json({
        cinemaByMovie,
        ...movieData,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = cinemaSystemController;
