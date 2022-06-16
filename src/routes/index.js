const express = require('express');
const router = express.Router();
const animeRoute = require('./anime.route');
const genreRoute = require('./genre.route');

router.use('/anime', animeRoute);
router.use('/genre', genreRoute);

module.exports = router;
