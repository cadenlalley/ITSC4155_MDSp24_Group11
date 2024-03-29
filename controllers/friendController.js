const userModel = require('../models/user');
const friendshipModel = require('../models/friendship');
const activePage = 'friends';

exports.index = (req, res, next) => {
    let id = req.session.user;

    userModel.findById(id)
        .then(user => {
            friendshipModel.find({ $or: [{ user1: user._id }, { user2: user._id }] })
                .then(friendships => {
                    res.render('friend/index', { user, friendships, activePage });
                })
                .catch(err => {
                    next(err);
                })
        })
}

exports.showFriend = (req, res) => {
    let id = req.session.user;

    userModel.findById(id)
        .then(user => {
            res.render('friend/show', { user, activePage });
        })
        .catch(err => {
            next(err);
        });
}

exports.showAddFriend = (req, res, next) => {
    let id = req.session.user;

    userModel.findById(id)
        .then(user => {
            userModel.aggregate([{ $match: { _id: { $ne: user._id } } }, { $limit: 20 }])
                .then(randomUsers => {
                    // Get friendship IDs stored in the current user, see if they match.
                    // if they do, add object to array. EX: {randomUser, frienshipStatus}
                    res.render('friend/add', { user, randomUsers, activePage });
                });
        })
        .catch(err => {
            next(err);
        });
}

exports.addFriend = (req, res, next) => {
    let id = req.session.user;
    let friendId = req.body.friendId;

    // Find current user in the DB
    userModel.findById(id)
        .then(user => {

            // Find the friend in the DB using the ID param
            userModel.findById(friendId)
                .then(friend => {

                    // Find and update, or create a new friendship
                    friendshipModel.findOneAndUpdate({ $or: [{ user1: user._id, user2: friend._id }, { user1: friend._id, user2: user._id }] }, { new: true, upsert: true })
                        .then(friendship => {

                            // Add the friendship ID to the current user's friendships array
                            // (We will add the same ID to the other user when they accept the request)
                            userModel.findByIdAndUpdate(user._id, {
                                // Change array
                                $set: {
                                    friendships: {
                                        // If the friendship ID is already in the array, do nothing
                                        $cond: {
                                            if: { $in: [friendship._id, user.friendships] },
                                            then: user.friendships,
                                            else: user.friendships.concat(friendship._id)
                                        }
                                    }
                                }
                            })
                                .then(() => {

                                    // Redirect to the friends page
                                    res.redirect('/friends');
                                })
                        })
                })
        })
        .catch(err => {
            next(err);
        });
};
