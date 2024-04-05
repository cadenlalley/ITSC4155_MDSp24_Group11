const express = require('express');
const controller = require('../controllers/friendController');

const { isLoggedIn, isFriend, friendShipExists } = require('../middleware/auth');

const router = express.Router();

// GET /friends : Renders Friends Page
router.get('/', isLoggedIn, controller.index);

router.get('/view/:id', isLoggedIn, isFriend, controller.showFriend);

router.get('/add', isLoggedIn, controller.showAddFriend);
router.post('/add/:id', isLoggedIn, controller.addFriend);

router.post('/cancel/:friendShipId/:friendId', isLoggedIn, friendShipExists, controller.cancelFriend);
router.post('/decline/:friendShipId/:friendId', isLoggedIn, friendShipExists, controller.declineFriend);
router.post('/accept/:friendShipId/:friendId', isLoggedIn, friendShipExists, controller.acceptFriend);

module.exports = router;
