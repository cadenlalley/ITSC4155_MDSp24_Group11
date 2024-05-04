const userModel = require('../models/user');
const { Friend } = require('../models/friend');
const { Challenge } = require('../models/challenge');

const activePage = 'friends';

exports.index = (req, res, next) => {
    let id = req.session.user;

    userModel.findById(id)
        .then(user => {
            res.render('friend/index', { user, activePage });
        })
        .catch(err => {
            next(err);
        })
}

exports.showFriend = (req, res) => {
    let id = req.session.user;
    let friendId = req.params.id;

    userModel.findById(id)
        .then(user => {
            userModel.findById(friendId)
                .then(friend => {
                    Challenge.find({ completedBy: { $in: [friend._id] } })
                        .then(challenges => {
                            res.render('friend/show', { user, friend, challenges, activePage });
                        })
                })
        })
        .catch(err => {
            next(err);
        });
}

exports.showAddFriend = (req, res, next) => {
    let id = req.session.user;
    let friendIds = [];

    userModel.findById(id)
        .then(user => {
            if (user.friendsList.length > 0) {
                user.friendsList.forEach(friend => {
                    if (!friendIds.includes(friend.origin)) {
                        friendIds.push(friend.origin);
                    }
                    if (!friendIds.includes(friend.target)) {
                        friendIds.push(friend.target);
                    }
                });
                userModel.find({ _id: { $nin: friendIds } })
                    .limit(25)
                    .then(prospects => {
                        res.render('friend/add', { user, prospects, activePage });
                    })
                    .catch(err => {
                        next(err);
                    });
            } else {
                userModel.find({ _id: { $ne: user._id } })
                    .limit(25)
                    .then(prospects => {
                        res.render('friend/add', { user, prospects, activePage });
                    })
                    .catch(err => {
                        next(err);
                    });
            }
        })
        .catch(err => {
            next(err);
        });
}

exports.addFriend = (req, res, next) => {
    let userId = req.session.user;
    let friendId = req.params.id;

    userModel.findById(userId)
        .then(user => {
            userModel.findById(friendId)
                .then(prospect => {
                    let friend = new Friend({
                        origin: user._id,
                        originName: user.username,
                        target: prospect._id,
                        targetName: prospect.username,
                    });
                    prospect.friendsList.push(friend);
                    user.friendsList.push(friend);
                    user.save()
                        .then(() => {
                            prospect.save()
                                .then(() => {
                                    req.flash('success', 'Friend request sent!');
                                    res.redirect('/friends');
                                })
                        })
                })
        })
        .catch(err => {
            next(err);
        });
};

exports.acceptFriend = (req, res, next) => {
    let userId = req.session.user;
    let friendId = req.params.friendId;
    let friendShipId = req.params.friendShipId;

    userModel.findById(userId)
        .then(user => {
            userModel.findById(friendId)
                .then(friend => {
                    user.friendsList.forEach(userFriends => {
                        if (userFriends._id == friendShipId) {
                            userFriends.status = 'Friends';
                            userFriends.isFriend = true;
                            return;
                        }
                    })
                    friend.friendsList.forEach(friendFriends => {
                        if (friendFriends._id == friendShipId) {
                            friendFriends.status = 'Friends';
                            friendFriends.isFriend = true;
                            return;
                        }
                    })
                    user.save()
                        .then(() => {
                            friend.save()
                                .then(() => {
                                    req.flash('success', 'Friend request accepted!');
                                    res.redirect('/friends');
                                })
                        })
                })
        })
        .catch(err => {
            next(err);
        });
};

exports.cancelFriend = (req, res, next) => {
    let userId = req.session.user;
    let friendId = req.params.friendId;
    let friendShipId = req.params.friendShipId;
    userModel.findById(userId)
        .then(user => {
            userModel.findById(friendId)
                .then(friend => {
                    user.friendsList.remove(friendShipId);
                    friend.friendsList.remove(friendShipId);
                    user.save()
                        .then(() => {
                            friend.save()
                                .then(() => {
                                    req.flash('success', 'Friend request cancelled!');
                                    res.redirect('/friends');
                                })
                        })
                })
        })
        .catch(err => {
            next(err);
        });
};

exports.declineFriend = (req, res, next) => {
    let userId = req.session.user;
    let friendId = req.params.friendId;
    let friendShipId = req.params.friendShipId;


    userModel.findById(userId)
        .then(user => {
            userModel.findById(friendId)
                .then(friend => {
                    user.friendsList.forEach(userFriends => {
                        if (userFriends._id == friendShipId) {
                            userFriends.status = 'Rejected';
                            userFriends.isFriend = true;
                            return;
                        }
                    })
                    friend.friendsList.forEach(friendFriends => {
                        if (friendFriends._id == friendShipId) {
                            friendFriends.status = 'Rejected';
                            friendFriends.isFriend = true;
                            return;
                        }
                    })
                    user.save()
                        .then(() => {
                            friend.save()
                                .then(() => {
                                    req.flash('success', 'Friend request declined!');
                                    res.redirect('/friends');
                                })
                        })
                })
        })
        .catch(err => {
            next(err);
        });
};
