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
    const { groupName, groupDescription } = req.body;
    let groupMembers = req.body.groupMembers;

    if (!groupName) {
        return res.status(400).send('Group name is required');
    }
    
    console.log('Group Information:', { groupName, groupDescription, groupMembers });
    let id = req.session.user;
    groupMembers.push(id);
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

exports.show = (req, res) => {
    const activePage = 'groups';
    const id = req.session.user;
    model.findById(id)
        .then(user => {
            groupModel.findById(req.params.id)
                .then(group => {
                    console.log('Group:', group); // Log the group
                    let groupMembers = [];
                    model.find({ _id: { $in: group.groupMembers } })
                        .then(members => {
                            console.log('Members:', members); // Log the members
                            groupMembers = members;
                            res.render('./group/show', { user, group, groupMembers, activePage });
                        })
                    
                })
        })
}