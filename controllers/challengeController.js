const model = require('../models/user');

exports.index = (req, res) => {
    const activePage = 'challenges';

    let id = req.session.user;
    model.findById(id)
        .then(user => {
            res.render("challenge/index", { user, activePage });
        })

}
