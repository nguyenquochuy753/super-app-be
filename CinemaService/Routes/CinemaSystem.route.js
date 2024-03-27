const cinemaSystemController = require('../Controllers/CinemaSystem.controller');
const router = require('express').Router();

router.post('/',cinemaSystemController.addCinemaSystem);

module.exports = router;