const express = require("express");
const {
  createTicket,
  updateTicket,
  getAllTicket,
  getTicketById,
  deleteTicketById,
  getTicketByUser,
} = require("../controller/ticket");
const router = express.Router();

router.post("/ticket/create", createTicket);
router.patch("/ticket/:_id", updateTicket);
router.get("/ticket/", getAllTicket);
router.get("/ticket/user/:_id", getTicketByUser);
router.get("/ticket/:_id", getTicketById);
router.delete("/ticket/:_id", deleteTicketById);

module.exports = router;
