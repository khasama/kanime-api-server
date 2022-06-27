const express = require('express');
const router = express.Router();
const YearController = require('../controllers/year.controller')

router.get('/all', YearController.getAll);
router.post('/', YearController.createOne);
router.put('/update/:id', YearController.updateOne);
router.delete('/delete/:id', YearController.deleteOne);



module.exports = router;