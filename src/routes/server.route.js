const express = require('express');
const router = express.Router();
const ServerController = require('../controllers/server.controller');
const {verifyToken} = require('../middlewares');

router.get('/all', ServerController.getAll);
router.post('/', verifyToken(2), ServerController.createOne);
router.put('/update/:id', verifyToken(2), ServerController.updateOne);
router.delete('/delete/:id', verifyToken(1), ServerController.deleteOne);


module.exports = router;
