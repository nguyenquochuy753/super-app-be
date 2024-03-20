const express = require("express");
const { createMovie } = require("../controller/movie");
const router = express.Router();

router.post("/movie/create", createMovie);

module.exports = router;
