const express = require("express");
const { createShowtimes, getAllShowtimes, getShowtimesById, getShowtimesByMovie } = require("../controller/showtimes");
const router = express.Router();

router.post("/showtimes/create", createShowtimes);
router.get("/showtimes", getAllShowtimes);
router.get("/showtimes/:id", getShowtimesById);
router.get("/showtimes/movie/:id", getShowtimesByMovie);
module.exports = router;
