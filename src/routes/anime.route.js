const express = require('express');
const router = express.Router();
const AnimeController = require('../controllers/anime.controller');
const {verifyAccessToken} = require('../middlewares');

router.get('/all', AnimeController.getAll);
router.post('/', AnimeController.createOne);
router.post('/add-genre', AnimeController.addGenre);
router.delete('/delete-genre', AnimeController.deleteGenre);
router.put('/update/:id', AnimeController.updateOne);
router.put('/activate/:id', AnimeController.activateOne);
router.delete('/delete/:id', AnimeController.deleteSoft);
router.get('/:id', AnimeController.getInformation);

module.exports = router;