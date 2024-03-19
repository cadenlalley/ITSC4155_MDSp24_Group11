const model = require('../models/user');

exports.index = (req, res) => {
    const activePage = 'groups';

    let id = req.session.user;
    model.findById(id)
        .then(user => {
            res.render("group/index", { user, activePage });
        })
}
