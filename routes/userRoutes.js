const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


// GET /user/signup : renders signup page
router.get('/signup', userController.showSignup);

// GET /user/login : renders login page
router.get('/login', userController.showLogin);

// POST /user/signup : creates a new user
router.post('/signup', userController.signup);


// POST /user/login : logs in a user
router.post('/login', userController.login);

//POST /users/logout: logout a user
router.get('/logout', userController.logout);

module.exports = router;