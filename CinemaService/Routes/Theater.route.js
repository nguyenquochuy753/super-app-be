const router = require("express").Router();
const theaterController = require("../Controllers/Theater.controller");

router.post(
  "/theaterComplexName",
  theaterController.addTheaterByTheaterComplexName
);
router.post("/:theaterComplexId", theaterController.addTheater);
router.get("/", theaterController.getAllTheaters);
router.get("/:_id", theaterController.getTheaterComplexByID);

module.exports = router;
