const userModel = require('../models/user');
const groupModel = require('../models/group');
const goalModel = require('../models/goal');

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

//checks if user is creator of the group
exports.isHost = (req, res, next)=>{
    let id = req.params.id;
    groupModel.findById(id)
    .then(group=>{
        if(group){
            if(group.groupAdmin == req.session.user){
                return next();
            }else{
                let err = new Error('Unauthorized to access the resource');
                err.status = 401;
                return next(err);
            }
        }else{
            let err = new Error('Cannot find a group with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));
};

//checks if user id creator of the goal
exports.isCreator = (req, res, next)=>{
    let id = req.params.id;
    goalModel.findById(id)
    .then(goal=>{
        if(goal){
            if(goal.creator == req.session.user){
                return next();
            } else {
                let err = new Error('Unauthorized to access the resource');
                err.status = 401;
                return next(err);
            }
        }else{
            let err = new Error('Cannot find a goal with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));        
}
        
    
