const express = require('express');
const router = express.Router();
const SeriesController = require('../controllers/series.controller');

router.get('/all', SeriesController.getAll);
router.post('/', SeriesController.createOne);
router.delete('/delete/:id', SeriesController.deleteOne);
router.put('/update/:id', SeriesController.updateOne);
router.get('/:id', SeriesController.getASS); //Anime same series


module.exports = router;
