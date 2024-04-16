// const User = require('../models/user');
const model = require('../models/user');
const groupModel = require('../models/group');


exports.index = (req, res) => {
    const activePage = 'groups';

    let id = req.session.user;
    model.findById(id)
        .then(user => {
            groupModel.find({ _id: { $in: user.groups } })
                .then(groups => {
                    res.render("group/index", { user, groups, activePage });
                })
        })
}

exports.createGroupPage = (req, res) => {
    const activePage = 'groups';
    const id = req.session.user;
    model.findById(id)
        .then(user => {
            res.render('./group/new', { user, activePage });
        })
}

exports.createGroup = (req, res) => {
    const { groupName, groupDescription, groupMembers } = req.body;

    if (!groupName) {
        return res.status(400).send('Group name is required');
    }
    // groupMembers.push(id);
    console.log('Group Information:', { groupName, groupDescription, groupMembers });
    let id = req.session.user;
    let group = new groupModel({ groupName, groupDescription, groupMembers });
    console.log('Group:', group);
    group.save()
        .then(() => {
            model.findById(id).then(user => {
                user.groups.push(group._id);
                user.save();
                res.redirect('/groups/');
            })
        })
        .catch(err => {
            console.error('Error creating group:', err);
            res.status(500).send('Error creating group');
        });
}