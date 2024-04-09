const express = require("express");
const { createTicket, updateTicket, getAllTicket, getTicketById, deleteTicketById } = require("../controller/ticket");
const router = express.Router();

router.post("/ticket/create", createTicket);
router.patch("/:_id", updateTicket);
router.get("/", getAllTicket);
router.get("/:_id", getTicketById);
router.delete("/:_id", deleteTicketById);


module.exports = router;
