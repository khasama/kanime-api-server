const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');

router.post('/admin/login', UserController.loginAdminSite);
router.post('/login', UserController.login);
router.get('/logout', UserController.logout);
router.post('/register', UserController.register);

module.exports = router;