const model = require('../models/user');

//renders the index.ejs file
exports.index = (req, res) => {
    let id = req.session.user;
    model.findById(id)
    .then(user=>{
      res.render("index");
    })
    
  };