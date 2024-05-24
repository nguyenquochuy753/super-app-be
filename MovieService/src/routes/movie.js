const express = require("express");
const {
  createMovie,
  getAllMovies,
  getMoviesByPage,
  getMoviesByDay,
  getMoviesById,
  updateMoviesById,
  removeMoviesById,
  getMoviesByName,
} = require("../controller/movie");
const router = express.Router();

router.post("/movie/create", createMovie);
router.get("/movies/pagination", getMoviesByPage);
router.get("/movies/day", getMoviesByDay);
router.get("/movies", getAllMovies);
router.get("/movies/:id", getMoviesById);
router.post("/moviesbyname", getMoviesByName);
router.put("/movies/:id", updateMoviesById);
router.delete("/movies/:id", removeMoviesById);

module.exports = router;
