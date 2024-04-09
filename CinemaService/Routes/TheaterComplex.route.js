const router = require("express").Router();
const theaterComplexController = require("../Controllers/TheaterComplex.controller");

router.post("/", theaterComplexController.addTheaterComplex);
router.patch("/:_id", theaterComplexController.updateTheaterComplex);
router.get("/", theaterComplexController.getAllTheaterComplex);
router.get("/:_id", theaterComplexController.getTheaterComplexByID);
router.delete("/:_id", theaterComplexController.deleteTheaterComplexById);
router.get(
  "/theater/:_id",
  theaterComplexController.getTheaterComplexByTheaterId
);

module.exports = router;
