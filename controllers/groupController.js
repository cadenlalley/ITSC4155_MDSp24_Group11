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
    let groupMembers = [];

    groupMembers = req.body.groupMembers;

    if (!groupName) {
        return res.status(400).send('Group name is required');
    }
    
    console.log('Group Information:', { groupName, groupDescription, groupMembers });
    let id = req.session.user;
    groupMembers.push(id);
    groupAdmin = req.session.user;
    let group = new groupModel({ groupName, groupDescription, groupMembers, groupAdmin });
   
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
                    model.find({ _id: { $in: group.groupMembers } }).sort({lifetimePoints: -1})
                        .then(members => {
                            console.log('Members:', members); // Log the members
                            groupMembers = members;
                            res.render('./group/show', { user, group, groupMembers, activePage });
                        })
                    
                })
        })
}

exports.edit = (req, res) => {
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
                            res.render('./group/edit', { user, group, groupMembers, activePage });
                        })
                    
                })
        })
}

exports.update = (req, res) => {
    const { groupName, groupDescription } = req.body;
    const groupId = req.params.id; // The ID of the group to update

    if (!groupName) {
        return res.status(400).send('Group name is required');
    }

    // Find the group
    groupModel.findById(groupId)
        .then(group => {
            // Update the group's properties
            group.groupName = groupName;
            group.groupDescription = groupDescription;

            // Save the group
            return group.save();
        })
        .then(() => {
            res.redirect('/groups/' + groupId); // Redirect back to the group page
        })
        .catch(err => {
            console.error('Error updating group:', err);
            res.status(500).send('Error updating group');
        });
}

exports.delete = (req, res) => {
    const id = req.params.id;
    const userId = req.session.user;
    groupModel.findById(id)
        .then(group => {
            if (group.groupAdmin != userId) {
                return res.status(403).send('You are not authorized to delete this group');
            }
            groupModel.findByIdAndDelete(id)
                .then(() => {
                    // Find all users who are members of the group
                    model.find({ groups: id })
                        .then(users => {
                            // For each user, remove the group from their groups array and save the user
                            users.forEach(user => {
                                user.groups = user.groups.filter(group => group != id);
                                user.save();
                            });
                            res.redirect('/groups/');
                        })
                })
        })
        .catch(err => {
            console.error('Error deleting group:', err);
            res.status(500).send('Error deleting group');
        });
}

exports.removeFromGroup = (req, res) => {
    const userId = req.params.id; // The ID of the user to remove
    const groupId = req.body.groupId; // The ID of the group

    // Find the group
    groupModel.findById(groupId)
        .then(group => {
            // Remove the user from the group's groupMembers array
            group.groupMembers = group.groupMembers.filter(id => id != userId);
            console.log(group.groupMembers);
            return group.save(); // Save the group
            
        })
        .then(() => {
            // Find the user
            return model.findById(userId);
        })
        .then(user => {
            // Remove the group from the user's groups array
            user.groups = user.groups.filter(id => id != groupId);
            return user.save(); // Save the user
        })
        .then(() => {
            res.redirect('/groups/' + groupId+ '/edit'); // Redirect back to the group page
        })
        .catch(err => {
            console.error('Error removing user from group:', err);
            res.status(500).send('Error removing user from group');
        });
}
