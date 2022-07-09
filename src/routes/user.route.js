const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const {verifyToken} = require('../middlewares');

router.post('/admin/login', UserController.loginAdminSite);
router.post('/login', UserController.login);
router.get('/logout', UserController.logout);
router.post('/register', UserController.register);

router.get('/all', verifyToken(2), UserController.getAll);
// router.gut('/update/:id', UserController.updateOne);
// router.delete('/delete/:id', UserController.deleteOne);

module.exports = router;