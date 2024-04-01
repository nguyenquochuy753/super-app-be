const express = require("express");
const { createShowtimes, getAllShowtimes } = require("../controller/showtimes");
const router = express.Router();

router.post("/showtimes/create", createShowtimes);
router.get("/showtimes", getAllShowtimes);

module.exports = router;
