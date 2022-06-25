const express = require('express');
const router = express.Router();
const animeRoute = require('./anime.route');
const genreRoute = require('./genre.route');
const seriesRoute = require('./series.route');
const seasonRoute = require('./season.route');
const serverRoute = require('./server.route');
const episodeRoute = require('./episode.route');
const imageRoute = require('./image.route');

router.use('/anime', animeRoute);
router.use('/genre', genreRoute);
router.use('/series', seriesRoute);
router.use('/season', seasonRoute);
router.use('/server', serverRoute);
router.use('/episode', episodeRoute);
router.use('/images', imageRoute);

module.exports = router;
