const express = require('express');
const router = express.Router();
const StatusController = require('../controllers/status.controller')

router.get('/all', StatusController.getAll);
router.post('/', StatusController.createOne);
router.put('/update/:id', StatusController.updateOne);
router.delete('/delete/:id', StatusController.deleteOne);



module.exports = router;