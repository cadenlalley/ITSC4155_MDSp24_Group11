const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');

const { isGuest, isLoggedIn, isCreator } = require('../middleware/auth.js');
const { validateSignUp, validateLogIn, validateResult, validateGoal} = require('../middleware/validator.js');

// GET /user/signup : renders signup page
router.get('/signup', isGuest, userController.showSignup);

// GET /user/login : renders login page
router.get('/login', isGuest, userController.showLogin);

// POST /user/signup : creates a new user
router.post('/signup', isGuest, validateSignUp, validateResult, userController.signup);

// POST /user/login : logs in a user
router.post('/login', isGuest, validateLogIn, validateResult, userController.login);

// POST /user/logout: logout a user
router.get('/logout', isLoggedIn, userController.logout);

// GET /user/profile: check profile
router.get('/profile', isLoggedIn, userController.showProfile);

// DELETE /user/:id - delete the event identified by id
router.delete('/delete/:id', isLoggedIn, userController.delete);

// GET /user/tracking: renders tracking page
router.get('/tracking', isLoggedIn, userController.showTracking);

// POST /user/tracking/calories-consumed: adds todays calories consumed to the calorieInfo collection 
router.post('/tracking/calories-consumed', isLoggedIn, userController.caloriesConsumed);

// POST /user/tracking/calories-burned: adds todays calories burned to the calorieInfo collection 
router.post('/tracking/calories-burned', isLoggedIn, userController.caloriesBurned);

// POST /user/tracking/weight: adds todays weight to the weightInfo collection 
router.post('/tracking/weight', isLoggedIn, userController.weight);

// POST /user/createGoal : creates a goal that is connected to the user
router.post('/createGoal', isLoggedIn, validateGoal, userController.createGoal);

//DELETE /user/delete/:id - delete the goal identified by id
router.delete('/deleteGoal/:id', isLoggedIn, isCreator, userController.deleteGoal);

// POST /user/privacy/:id - toggle privacy setting of the user
router.get('/privacy/:id', isLoggedIn, userController.togglePrivacy);

module.exports = router;
