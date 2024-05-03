const express = require('express');
const controller = require('../controllers/challengeController');

const router = express.Router();

router.get('/', controller.index);

router.post('/', controller.new);

router.post('/complete/:id', controller.complete);

module.exports = router;
