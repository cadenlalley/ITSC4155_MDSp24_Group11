const userModel = require('../models/user');
const friendshipModel = require('../models/friendship');

exports.index = (req, res) => {
    const activePage = 'friends';

    let id = req.session.user;
    userModel.findById(id)
        .then(user => {
            friendshipModel.find({ $or: [{ user1: id }, { user2: id }] })
                .then(friends => {
                    res.render("friend/index", { user, friends, activePage });
                })
        })
}

exports.showFriend = (req, res) => {
    const activePage = 'friends';

    let id = req.session.user;
    userModel.findById(id)
        .then(user => {
            res.render('friend/show', { user, activePage });
        })
}

exports.showAddFriend = (req, res) => {
    const activePage = 'friends';

    let id = req.session.user;
    userModel.findById(id)
        .then(user => {
            // Get 10 random users that are not in the friend list
            userModel.aggregate([
                { $match: { _id: { $ne: user._id } } },
                { $sample: { size: 10 } }
            ])
                .then(randomUsers => {
                    res.render('friend/add', { user, randomUsers, activePage });
                })
        })
}

exports.addFriend = (req, res) => {
    const activePage = 'friends';

    let id = req.session.user;
    userModel.findById(id)
        .then(user => {
            let friendId = req.params.id;
            friendshipModel.create({ user1: id, user2: friendId })
                .then(friendship => {
                    res.redirect('/friends');
                })
        })
};
