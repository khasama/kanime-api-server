const express = require('express');
const router = express.Router();
const AnimeController = require('../controllers/anime.controller');
const {verifyAccessToken} = require('../middlewares')

router.get('/all', AnimeController.getAll);
router.post('/', verifyAccessToken, AnimeController.createOne);
router.post('/add-genre', verifyAccessToken, AnimeController.addGenre);
router.delete('/delete-genre', verifyAccessToken, AnimeController.deleteGenre);
router.put('/update/:id', verifyAccessToken, AnimeController.updateOne);
router.put('/activate/:id', verifyAccessToken, AnimeController.activateOne);
router.delete('/delete/:id', verifyAccessToken, AnimeController.deleteSoft);
router.get('/:id', AnimeController.getInformation);

module.exports = router;