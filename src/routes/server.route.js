const express = require('express');
const router = express.Router();
const ServerController = require('../controllers/server.controller');

router.get('/all', ServerController.getAll);
router.post('/', ServerController.createOne);
router.put('/update/:id', ServerController.updateOne);
router.delete('/delete/:id', ServerController.deleteOne);
// router.get('/:id', SeriesController.getASS); //Anime same series


module.exports = router;
