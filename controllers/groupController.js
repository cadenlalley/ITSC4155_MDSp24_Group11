const model = require('../models/user');

exports.index = (req, res) => {
    const activePage = 'groups';
    //uncomment once user model is added
    /*let id = req.session.user;
    model.findById(id)
    .then(user=>{
      res.render("group/index", {user, activePage});
    })*/
    //delete once user model is added
    res.render("group/index", { activePage });
}
