const express = require('express');
const router = express.Router();
const EpisodeController = require('../controllers/episode.controller');

router.get('/get-ep/:idAnime-:idServer', EpisodeController.getEp);
// router.post('/', ServerController.createOne);
// router.put('/update/:id', ServerController.updateOne);
// router.delete('/delete/:id', ServerController.deleteOne);
// router.get('/:id', SeriesController.getASS); //Anime same series


module.exports = router;