const express = require('express');
const router = express.Router();
const GenreController = require('../controllers/genre.controller')
const {verifyToken} = require('../middlewares');

router.get('/all', GenreController.getAll);
router.post('/', verifyToken(2), GenreController.createOne);
router.put('/update/:id', verifyToken(2), GenreController.updateOne);
router.delete('/delete/:id', verifyToken(1), GenreController.deleteOne);
router.get('/anime-of-genre/:id', GenreController.getAAOG);
router.get('/:id', GenreController.getInformation);


module.exports = router;
