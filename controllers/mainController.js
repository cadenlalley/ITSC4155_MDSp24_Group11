const model = require('../models/user');
const { CalorieIntakeInfo, CalorieLossInfo } = require('../models/calorieInfo');
const { WeightInfo } = require('../models/weightInfo');


exports.index = (req, res) => {
    let activePage = 'home';
    let id = req.session.user;

    model.findById(id)
        .then(user => {
            WeightInfo.find()
                .then(weightInfo => {
                    CalorieIntakeInfo.find()
                        .then(calorieIntakeInfo => {
                            CalorieLossInfo.find()
                                .then(calorieLossInfo => {
                                    res.render("index", { user, activePage, weightInfo, calorieIntakeInfo, calorieLossInfo });
                                })
                        })
                })
        })

};
