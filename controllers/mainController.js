const model = require('../models/user');

//renders the index.ejs file
exports.index = (req, res) => {
    let activePage = 'home';
    /*let id = req.session.user;
    model.findById(id)
    .then(user=>{
      res.render("index", {user});
    })*/
    res.render("index", { activePage });
};
