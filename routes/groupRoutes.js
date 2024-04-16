const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');


// Route to render the group creation page
router.get('/new',  groupController.createGroupPage);

// Route to handle the creation of a new group
router.post('/create', groupController.createGroup);

//GET / - goes to index.ejs file in the groupController
router.get('/', groupController.index);

router.get('/:id', groupController.show);

module.exports = router;
