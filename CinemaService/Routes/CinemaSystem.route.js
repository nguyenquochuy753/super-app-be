const cinemaSystemController = require("../Controllers/CinemaSystem.controller");
const router = require("express").Router();

router.post("/", cinemaSystemController.addCinemaSystem);
router.patch("/:_id", cinemaSystemController.updateCinemaSystem);
router.get("/", cinemaSystemController.getAllCinemaSystem);
router.get("/:_id", cinemaSystemController.getCinemaSystemByID);
router.delete("/:_id", cinemaSystemController.deleteCinemaSystemById);
router.get("/showtimes/:_id", cinemaSystemController.getShowtimesById)
router.get("/movies/:_id", cinemaSystemController.getShowtimesByMovie);;
module.exports = router;
