const cinemaSystemController = require("../Controllers/CinemaSystem.controller");
const router = require("express").Router();

router.post("/", cinemaSystemController.addCinemaSystem);
router.patch("/:_id", cinemaSystemController.updateCinemaSystem);
router.get("/", cinemaSystemController.getAllCinemaSystem);
router.get(
  "/theatercomplex",
  cinemaSystemController.getAllCinemaSystemAndTheaterComplex
);
router.get(
  "/theatercomplexclient",
  cinemaSystemController.getAllCinemaSystemAndTheaterComplexClient
);
router.get("/:_id", cinemaSystemController.getCinemaSystemByID);
router.delete("/:_id", cinemaSystemController.deleteCinemaSystemById);
router.get("/showtimes/:_id", cinemaSystemController.getShowtimesById);
router.get("/movies/:_id", cinemaSystemController.getShowtimesByMovie);
router.get(
  "/moviesclient/:_id",
  cinemaSystemController.getShowtimesByMovieClient
);
module.exports = router;
