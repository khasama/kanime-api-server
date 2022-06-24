const express = require('express');
const router = express.Router();
const EpisodeController = require('../controllers/episode.controller');

router.get('/get-ep/:idAnime-:idServer', EpisodeController.getEp);
router.get('/get-link/:id', EpisodeController.getLink);
router.get('/get-furl/:idAnime-:episode', EpisodeController.getFullUrl);
router.post('/add', EpisodeController.addEP);
router.put('/update/:id', EpisodeController.updateOne);
router.delete('/delete/:id', EpisodeController.deleteEp);
// router.get('/:id', SeriesController.getASS); //Anime same series


module.exports = router;