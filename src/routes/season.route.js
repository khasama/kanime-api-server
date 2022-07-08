const express = require('express');
const router = express.Router();
const SeasonController = require('../controllers/season.controller');
const {verifyToken} = require('../middlewares');

router.post('/add', verifyToken(2), SeasonController.addSeason);
router.delete('/delete/:id', verifyToken(1), SeasonController.deleteSeason);
router.get('/:id', SeasonController.getAnimeSeason);


module.exports = router;