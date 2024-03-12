const express = require('express');
const controller = require('../controllers/mainController');

const router = express.Router();

//GET / - goes to index.ejs file in mainController
router.get('/', controller.index);

module.exports = router;