const express = require("express");
const {
  createShowtimes,
  getAllShowtimes,
  getShowtimesById,
  getShowtimesByMovie,
  getShowtimesInfo,
  updateShowtime,
  getAllShowtimesClient,
  getShowtimesByMovieClient,
} = require("../controller/showtimes");
const router = express.Router();

router.post("/showtimes/create", createShowtimes);
router.get("/showtimes", getAllShowtimes);
router.get("/showtimesclient", getAllShowtimesClient);
router.get("/showtimes/:id", getShowtimesById);
router.get("/showtimes/info/:id", getShowtimesInfo);
router.get("/showtimes/movie/:id", getShowtimesByMovie);
router.get("/showtimes/movieclient/:id", getShowtimesByMovieClient);

router.patch("/showtimes/:id", updateShowtime);

module.exports = router;
