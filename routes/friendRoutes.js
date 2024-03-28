const express = require('express');
const controller = require('../controllers/friendController');

const { isLoggedIn } = require('../middleware/auth');

const router = express.Router();

// GET /friends : Renders Friends Page
router.get('/', isLoggedIn, controller.index);

router.get('/view/:id', isLoggedIn, controller.showFriend);

router.get('/add', isLoggedIn, controller.showAddFriend);
router.post('/add/:id', isLoggedIn, controller.addFriend);


module.exports = router;
