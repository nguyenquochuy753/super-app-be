const express = require("express");
const {
  createShowtimes,
  getAllShowtimes,
  getShowtimesById,
  getShowtimesByMovie,
  getShowtimesInfo,
  updateShowtime,
} = require("../controller/showtimes");
const router = express.Router();

router.post("/showtimes/create", createShowtimes);
router.get("/showtimes", getAllShowtimes);
router.get("/showtimes/:id", getShowtimesById);
router.get("/showtimes/info/:id", getShowtimesInfo);
router.get("/showtimes/movie/:id", getShowtimesByMovie);
router.patch("/showtimes/:id", updateShowtime);

module.exports = router;
