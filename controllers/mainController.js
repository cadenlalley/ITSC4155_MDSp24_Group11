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
                                    model.find().sort({ lifetimePoints: -1 }).limit(10)
                                        .then(leaderboard => {
                                            res.render("index", { user, activePage, weightInfo, calorieIntakeInfo, calorieLossInfo, leaderboard });
                                        })
                                })
                        })
                })
        })
};
