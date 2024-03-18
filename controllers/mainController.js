const model = require('../models/user');

//renders the index.ejs file
exports.index = (req, res) => {
    let activePage = 'home';
    //uncomment once user model is added
    let id = req.session.user;
    model.findById(id)
    .then(user=>{
      res.render("index", {user, activePage});
    })

};
