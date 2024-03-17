const express = require('express');
const controller = require('../controllers/groupController');

const router = express.Router();

//GET / - goes to index.ejs file in the groupController
router.get('/', controller.index);

module.exports = router;
