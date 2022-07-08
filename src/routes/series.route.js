const express = require('express');
const router = express.Router();
const SeriesController = require('../controllers/series.controller');
const {verifyToken} = require('../middlewares');

router.get('/all', SeriesController.getAll);
router.post('/', verifyToken(2), SeriesController.createOne);
router.delete('/delete/:id', verifyToken(1), SeriesController.deleteOne);
router.put('/update/:id', verifyToken(2), SeriesController.updateOne);
router.get('/:id', SeriesController.getASS); //Anime same series


module.exports = router;
