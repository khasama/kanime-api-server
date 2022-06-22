const express = require('express');
const router = express.Router();
const animeRoute = require('./anime.route');
const genreRoute = require('./genre.route');
const seriesRoute = require('./series.route');

router.use('/anime', animeRoute);
router.use('/genre', genreRoute);
router.use('/series', seriesRoute);

module.exports = router;
