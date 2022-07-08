const express = require('express');
const router = express.Router();
const StatusController = require('../controllers/status.controller')
const {verifyToken} = require('../middlewares');

router.get('/all', StatusController.getAll);
router.post('/', verifyToken(2), StatusController.createOne);
router.put('/update/:id', verifyToken(2), StatusController.updateOne);
router.delete('/delete/:id', verifyToken(1), StatusController.deleteOne);



module.exports = router;