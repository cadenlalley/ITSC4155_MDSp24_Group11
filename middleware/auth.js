const userModel = require('../models/user');

exports.isGuest = (req, res, next) => {
	if (req.session.user) {
		req.flash('error', 'You are already logged in.');
		return res.redirect('/user/profile');
	}

	return next();
};

// Ensure that the User is Authenticated
exports.isLoggedIn = (req, res, next) => {
	if (!req.session.user) {
		req.flash('error', 'You must be logged in to do that.');
		return res.redirect('/user/login');
	}

	return next();
};

exports.isFriend = (req, res, next) => {
    let friendId = req.params.id;
    let userId = req.session.user;
    userModel.findById(userId)
        .then(user => {
            let isFriend = user.friendsList.some(friend => {
                return friend.target == friendId && friend.status == 'Friends' || friend.origin == friendId && friend.status == 'Friends';
            });
            if (!isFriend) {
                req.flash('error', 'You must be friends to do that.');
                return res.redirect('/friends');
            }
            return next();
        })
        .catch(err => {
            next(err);
        });
};

exports.friendShipExists = (req, res, next) => {
    let friendShipId = req.params.friendShipId;
    console.log(friendShipId);
    let userId = req.session.user;
    userModel.findById(userId)
        .then(user => {
            let isFriend = user.friendsList.some(friend => {
                return friend._id == friendShipId;
            });
            if (!isFriend) {
                req.flash('error', 'Friendship does not exist.');
                return res.redirect('/friends');
            }
            return next();
        })
        .catch(err => {
            next(err);
        });
};
