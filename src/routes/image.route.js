const express = require('express');
const router = express.Router();
const ImageController = require('../controllers/image.controller');

router.get('/anime/:key', ImageController.getAnimeImage);

module.exports = router;