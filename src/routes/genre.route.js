const express = require('express');
const router = express.Router();
const GenreController = require('../controllers/genre.controller')

router.get('/all', GenreController.getAll);
router.post('/', GenreController.createOne);
router.get('/anime-of-genre/:id', GenreController.getAAOG);
router.get('/:id', GenreController.getInformation);


module.exports = router;
