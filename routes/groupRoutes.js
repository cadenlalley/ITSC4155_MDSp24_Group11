const express = require('express');
const controller = require('../controllers/groupController');

const router = express.Router();

// Route to render the group creation page
router.get('/create', groupController.createGroupPage);

// Route to handle the creation of a new group
router.post('/create', groupController.createGroup);

//GET / - goes to index.ejs file in the groupController
router.get('/', controller.index);

module.exports = router;
