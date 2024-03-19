const model = require('../models/user');

exports.index = (req, res) => {
    const activePage = 'friends';

    let id = req.session.user;
    model.findById(id)
        .then(user => {
            res.render("friend/index", { user, activePage });
        })

}
