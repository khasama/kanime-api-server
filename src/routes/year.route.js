const express = require('express');
const router = express.Router();
const YearController = require('../controllers/year.controller');
const {verifyToken} = require('../middlewares');

router.get('/all', YearController.getAll);
router.post('/', verifyToken(2), YearController.createOne);
router.put('/update/:id', verifyToken(2), YearController.updateOne);
router.delete('/delete/:id', verifyToken(1), YearController.deleteOne);



module.exports = router;