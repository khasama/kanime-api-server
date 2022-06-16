const express = require('express');
const router = express.Router();
const { getAll, getAAOG } = require('../controllers/genre.controller')

router.get('/all', getAll);
router.get('/anime-of-genre/:id', getAAOG);


module.exports = router;
