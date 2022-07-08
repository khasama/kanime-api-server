const express = require('express');
const router = express.Router();
const AnimeController = require('../controllers/anime.controller');
const {verifyToken} = require('../middlewares');

router.get('/all', AnimeController.getAll);
router.post('/', verifyToken(2), AnimeController.createOne);
router.post('/add-genre', verifyToken(2), AnimeController.addGenre);
router.delete('/delete-genre', verifyToken(2), AnimeController.deleteGenre);
router.put('/update/:id', verifyToken(2), AnimeController.updateOne);
router.put('/activate/:id', verifyToken(2), AnimeController.activateOne);
router.delete('/delete/:id', verifyToken(2), AnimeController.deleteSoft);
router.get('/:id', AnimeController.getInformation);

module.exports = router;