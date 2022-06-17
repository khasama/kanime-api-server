const express = require('express');
const router = express.Router();

// const { getAll, getInformation, createOne, updateOne, deleteSoft, activateOne  } = require('../controllers/anime.controller');
const AnimeController = require('../controllers/anime.controller');

router.get('/all', AnimeController.getAll);
router.post('/', AnimeController.createOne);
// router.put('/update/:id', updateOne);
router.put('/activate/:id', AnimeController.activateOne);
router.delete('/delete/:id', AnimeController.deleteSoft);
router.get('/:id', AnimeController.getInformation);


module.exports = router;
