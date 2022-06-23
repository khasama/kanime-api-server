const express = require('express');
const router = express.Router();
const SeasonController = require('../controllers/season.controller');

router.post('/add', SeasonController.addSeason);
router.delete('/delete/:id', SeasonController.deleteSeason);
router.get('/:id', SeasonController.getAnimeSeason);


module.exports = router;