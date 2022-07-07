const express = require('express');
const router = express.Router();
const YearController = require('../controllers/year.controller');

const {adminVerify} = require("../middlewares");

router.get('/all', YearController.getAll);
router.post('/', YearController.createOne);
router.put('/update/:id', YearController.updateOne);
router.delete('/delete/:id', adminVerify, YearController.deleteOne);



module.exports = router;