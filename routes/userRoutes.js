const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

const { isGuest, isLoggedIn } = require('../middleware/auth');


// GET /user/signup : renders signup page
router.get('/signup', isGuest, userController.showSignup);

// GET /user/login : renders login page
router.get('/login', isGuest, userController.showLogin);

// POST /user/signup : creates a new user
router.post('/signup', isGuest, userController.signup);

// POST /user/login : logs in a user
router.post('/login', isGuest, userController.login);

// POST /user/logout: logout a user
router.get('/logout', isLoggedIn, userController.logout);

// GET /user/profile: check profile
router.get('/profile', isLoggedIn, userController.showProfile);

//DELETE /user/:id - delete the event identified by id
router.delete('/delete/:id', isLoggedIn, userController.delete);

module.exports = router;
