const express = require("express");
const { createBanner, getAllBanner } = require("../controller/banner");
const router = express.Router();

router.post("/create", createBanner);
router.get("/", getAllBanner);

module.exports = router;
