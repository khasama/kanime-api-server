const express = require('express');
const router = express.Router();
const { getAll, getInformation, create, deleteSoft } = require('../controllers/anime.controller');

router.get('/all', getAll);
router.post('/', create);
router.delete('/delete/:id', deleteSoft);
router.get('/:id', getInformation);


module.exports = router;
