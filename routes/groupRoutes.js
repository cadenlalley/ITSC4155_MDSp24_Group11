const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');
const {isLoggedIn, isHost } = require('../middleware/auth.js');

// Route to render the group creation page
router.get('/new', isLoggedIn, groupController.createGroupPage);

// Route to handle the creation of a new group
router.post('/create', isLoggedIn, groupController.createGroup);

//GET / - goes to index.ejs file in the groupController
router.get('/', isLoggedIn, groupController.index);

router.get('/:id', isLoggedIn, groupController.show);

module.exports = router;
