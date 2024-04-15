const model = require('../models/user');


exports.index = (req, res) => {
    const activePage = 'groups';

    let id = req.session.user;
    model.findById(id)
        .then(user => {
            res.render("group/index", { user, activePage });
        })
}

exports.createGroupPage = (req, res) => {
    const activePage = 'groups';
    const id = req.session.user;
    model.findById(id)
        .then(user => {
            res.render('group/new', { user, activePage });
        })
}

exports.createGroup = (req, res) => {
    const { groupName } = req.body;

    if (!groupName) {
        return res.status(400).send('Group name is required');
    }

    let id = req.session.user;
    User.findByIdAndUpdate(id, { $push: { groups: { name: groupName } } })
        .then(() => {
            res.redirect('/groups');
        })
        .catch(err => {
            console.error('Error creating group:', err);
            res.status(500).send('Error creating group');
        });
}