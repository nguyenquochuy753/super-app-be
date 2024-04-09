const seatController = require("../Controllers/Seat.controller");
const router = require("express").Router();

router.post("/", seatController.addSeat);
router.get("/", seatController.getAllSeat);
router.patch("/:_id", seatController.updateSeat);
router.delete("/:_id", seatController.deleteSeat);
router.get("/:_id", seatController.getSeatByID);
router.get("/theater/:_id", seatController.getSeatByTheaterId);

module.exports = router;
