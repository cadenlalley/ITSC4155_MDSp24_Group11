const express = require('express');
const router = express.Router();
const userController = require('./userController');

// Signup
router.post('/signup', userController.signup);

// Login
router.post('/login', userController.login);

module.exports = router;