const model = require('../models/user');
const { Challenge } = require('../models/challenge');

exports.index = (req, res, next) => {
    const activePage = 'challenges';

    let id = req.session.user;
    model.findById(id)
        .then(user => {
            Challenge.find({ completedBy: { $ne: user._id } })
                .then(challenges => {
                    challenges.forEach(challenge => {
                        if (challenge.type == "Weight") {
                            if (user.weightTracking[user.weightTracking.length - 1].value <= challenge.criteria) {
                                challenge.eligibleBy.push(user._id);
                            }
                        } else if (challenge.type == "Diet") {
                            if (user.calorieIntakeTracking[user.calorieIntakeTracking.length - 1].value <= challenge.criteria) {
                                challenge.eligibleBy.push(user._id);
                            }
                        } else {
                            if (user.calorieLossTracking[user.calorieLossTracking.length - 1].value >= challenge.criteria) {
                                challenge.eligibleBy.push(user._id);
                            }
                        }
                    })
                    res.render("challenge/index", { user, activePage, challenges });
                })
        })
        .catch(err => next(err));
}

exports.complete = (req, res, next) => {
    let id = req.session.user;
    let challengeId = req.params.id;

    model.findById(id)
        .then(user => {
            Challenge.findById(challengeId)
                .then(challenge => {
                    user.completedChallenges.push(challenge._id);
                    challenge.completedBy.push(user._id);
                    user.lifetimePoints += challenge.points;
                    user.challengeCompletionDates.push(new Date());
                    if (user.challengeCompletionDates.length > 0) {
                        if (
                            user.challengeCompletionDates[user.challengeCompletionDates.length - 1].getMonth() == new Date().getMonth()
                            &&
                            user.challengeCompletionDates[user.challengeCompletionDates.length - 1].getFullYear() == new Date().getFullYear()
                            &&
                            user.challengeCompletionDates[user.challengeCompletionDates.length - 1].getDate() == new Date().getDate()
                        ) {
                            req.flash('error', 'You have already completed a challenge today, come back tomorrow!');
                            return res.redirect('/challenges');
                        }
                    }
                    user.save()
                        .then(() => {
                            challenge.save()
                                .then(() => {
                                    req.flash('success', 'Challenge completed!');
                                    return res.redirect('/challenges');
                                })
                        })
                })
        });

}

// Used for development purposes
exports.new = (req, res, next) => {
    const { name, description, difficulty, points, type, criteria } = req.body;
    console.log(req.body);
    const challenge = new Challenge({ name, description, difficulty, points, type, criteria });

    challenge.save()
        .then(() => {
            res.redirect('/challenges');
        })
        .catch(err => next(err));
}
