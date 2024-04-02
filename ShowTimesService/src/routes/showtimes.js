const express = require("express");
const { createShowtimes, getAllShowtimes, getShowtimesById } = require("../controller/showtimes");
const router = express.Router();

router.post("/showtimes/create", createShowtimes);
router.get("/showtimes", getAllShowtimes);
router.get("/showtimes/:id", getShowtimesById);
module.exports = router;
