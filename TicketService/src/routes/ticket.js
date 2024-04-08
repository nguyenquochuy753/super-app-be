const express = require("express");
const { createTicket } = require("../controller/ticket");
const router = express.Router();

router.post("/ticket/create", createTicket);

module.exports = router;
