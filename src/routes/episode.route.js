const express = require('express');
const router = express.Router();
const EpisodeController = require('../controllers/episode.controller');
const {verifyToken} = require('../middlewares');

router.get('/get-ep/:idAnime-:idServer', EpisodeController.getEp);
router.get('/get-link/:id', EpisodeController.getLink);
router.get('/get-furl/:idAnime-:episode', EpisodeController.getFullUrl);
router.post('/add', verifyToken(2), EpisodeController.addEP);
router.post('/add-multi', verifyToken(2), EpisodeController.addMultiEP);
router.put('/update/:id', verifyToken(2), EpisodeController.updateOne);
router.delete('/delete/:id', verifyToken(1), EpisodeController.deleteEp);

module.exports = router;