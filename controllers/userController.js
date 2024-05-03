const User = require('../models/user');
const Goal = require('../models/goal');

const { CalorieIntakeInfo, CalorieLossInfo } = require('../models/calorieInfo');
const { WeightInfo } = require('../models/weightInfo');

exports.showSignup = (req, res) => {
    const activePage = 'signup';

    // This has to be here so that conditional rendering of navbar links works properly
    // if there is a better solution, feel free to change it.
    const user = undefined;

    res.render('./user/signup', { activePage, user });
};

exports.showLogin = (req, res) => {
    const activePage = 'login';

    // This has to be here so that conditional rendering of navbar links works properly
    // if there is a better solution, feel free to change it.
    const user = undefined;

    res.render('./user/login', { activePage, user });
};

exports.signup = async (req, res) => {
    const { username, email, firstName, lastName, password } = req.body;
    const user = new User({ username, firstName, lastName, email, password, undefined });

    try {
        await user.save();
        // Flash Success 
        req.flash('success', 'Account has been created');
        res.redirect('/user/login');
    } catch (error) {
        res.status(500).json({ error });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    User.findOne({ username: username })
        .then(user => {
            if (!user) {
                // Flash Error 
                req.flash('error', 'Username is Incorrect');
                res.redirect('/user/login');
            } else {
                user.checkPassword(password)
                    .then((result) => {
                        if (result) {
                            req.session.user = user._id;
                            // Flash Success
                            req.flash('success', 'You have successfully logged in');
                            res.redirect('/');
                        } else {
                            // Flash Error
                            req.flash('error', 'Incorrect password');
                            res.redirect('/user/login');
                        }
                    })
            }

        })
};

exports.showProfile = (req, res) => {
    const activePage = 'profile';

    let id = req.session.user;
    Promise.all([User.findById(id), Goal.find({ creator: id })])
        .then(results => {
            const [user, goals] = results;
            res.render("user/index", { user, goals, activePage });
        })
}

exports.logout = (req, res, next) => {
    req.session.destroy(err => {
        if (err) {
            return next(err);
        }

        // TODO: Remove comments
        // Commenting this out as it was giving errors upon logout
        // since the user is no longer in the session
        // req.flash('success', 'You have successfully logged out');
        res.redirect('/');
    });
};

exports.delete = (req, res) => {
    let id = req.params.id;

    Promise.all([Goal.deleteMany({creator: id}), User.findByIdAndDelete(id, { useFindAndModify: false })])
        .then(() => {
            req.session.destroy(err => {
                if (err) {
                    return next(err);
                }
            })

            // TODO: Remove comments
            // Having the same error here as in logout
            // req.flash('success', 'You have successfully deleted your account');
            res.redirect('/');
        })
}

exports.showTracking = (req, res) => {
    const activePage = 'profile';
    let id = req.session.user;
    User.findById(id)
        .then(user => {
            res.render("user/tracking", { user, activePage });
        })
}

exports.caloriesConsumed = (req, res) => {
    let id = req.session.user;
    let calIntake = req.body.calorieIntake;
    let trackedCalorieIntake = new CalorieIntakeInfo({ value: calIntake });

    User.findById(id)
        .then(user => {
            if (!user.private) {
                trackedCalorieIntake.username = user.username;
            }

            let today = new Date();
            if (user.calorieIntakeTracking.length == 0) {
                user.calorieIntakeTracking.push(trackedCalorieIntake);
                user.save()
                    .then(() => {
                        trackedCalorieIntake.save();
                        req.flash('success', 'The consumed calories have been tracked successfully!');
                        return res.redirect('/user/tracking');
                    })
            } else {
                if (
                    user.calorieIntakeTracking[user.calorieIntakeTracking.length - 1].trackedAt.getDate() === today.getDate()
                    &&
                    user.calorieIntakeTracking[user.calorieIntakeTracking.length - 1].trackedAt.getMonth() === today.getMonth()
                    &&
                    user.calorieIntakeTracking[user.calorieIntakeTracking.length - 1].trackedAt.getYear() === today.getYear()
                ) {
                    req.flash('error', 'You have already tracked your calories consumed today. You can track them again tomorrow!');
                    return res.redirect('/user/tracking');
                } else {
                    user.calorieIntakeTracking.push(trackedCalorieIntake);
                    user.save()
                        .then(() => {
                            trackedCalorieIntake.save();
                            req.flash('success', 'The consumed calories have been tracked successfully!');
                            return res.redirect('/user/tracking');
                        })
                }
            }
        })
        .catch(err => {
            next(err);
        })
}

exports.caloriesBurned = (req, res) => {
    let id = req.session.user;
    let calLoss = req.body.calorieLoss;
    let trackedCalorieLoss = new CalorieLossInfo({ value: calLoss });

    User.findById(id)
        .then(user => {
            if (!user.private) {
                trackedCalorieLoss.username = user.username;
            }

            let today = new Date();
            if (user.calorieLossTracking.length == 0) {
                user.calorieLossTracking.push(trackedCalorieLoss);
                user.save()
                    .then(() => {
                        trackedCalorieLoss.save();
                        req.flash('success', 'The burned calories have been tracked successfully!');
                        return res.redirect('/user/tracking');
                    })
            } else {
                if (
                    user.calorieLossTracking[user.calorieLossTracking.length - 1].trackedAt.getDate() === today.getDate()
                    &&
                    user.calorieLossTracking[user.calorieLossTracking.length - 1].trackedAt.getMonth() === today.getMonth()
                    &&
                    user.calorieLossTracking[user.calorieLossTracking.length - 1].trackedAt.getYear() === today.getYear()
                ) {
                    req.flash('error', 'You have already tracked your calories burned today. You can track them again tomorrow!');
                    return res.redirect('/user/tracking');
                } else {
                    user.calorieLossTracking.push(trackedCalorieLoss);
                    user.save()
                        .then(() => {
                            trackedCalorieLoss.save();
                            req.flash('success', 'The burned calories have been tracked successfully!');
                            return res.redirect('/user/tracking');
                        })
                }
            } 
        })
        .catch(err => {
            next(err);
        })
}

exports.weight = (req, res, next) => {
    let id = req.session.user;
    let weight = req.body.weight;
    let trackedWeight = new WeightInfo({ value: weight });

    User.findById(id)
        .then(user => {
            if (!user.private) {
                trackedWeight.username = user.username;
            }

            const today = new Date();
            if (user.weightTracking.length == 0) {
                user.weightTracking.push(trackedWeight);
                user.save()
                    .then(() => {
                        trackedWeight.save();
                        req.flash('success', 'Weight has been tracked successfully!');
                        return res.redirect('/user/tracking');
                    })
            } else {
                if (
                    user.weightTracking[user.weightTracking.length - 1].trackedAt.getDate() === today.getDate()
                    &&
                    user.weightTracking[user.weightTracking.length - 1].trackedAt.getMonth() === today.getMonth()
                    &&
                    user.weightTracking[user.weightTracking.length - 1].trackedAt.getYear() === today.getYear()
                ) {
                    req.flash('error', 'You have already tracked your weight today. You can track your weight again tomorrow!')
                    return res.redirect('/user/tracking');
                } else {
                    trackedWeight.differenceSinceLast = weight - user.weightTracking[user.weightTracking.length - 1].value;
                    user.weightTracking.push(trackedWeight);
                    user.save()
                        .then(() => {
                            trackedWeight.save();
                            req.flash('success', 'Weight has been tracked successfully!');
                            return res.redirect('/user/tracking');
                        })
                }
            }
        })
        .catch(err => {
            next(err);
        })
}

exports.createGoal = (req, res, next) => {
    let goal = new Goal(req.body);
    goal.creator = req.session.user;
    goal.save()
        .then(goal => {
            req.flash('success', 'You have created a Goal');
            res.redirect('/user/profile');
        })
        .catch(err => {
            next(err);
        });
}

exports.deleteGoal = (req, res, next) => {
    let id = req.params.id;
    Goal.findByIdAndDelete(id, { useFindAndModify: false })
        .then(goal => {
            req.flash('success', 'You have deleted a Goal');
            res.redirect('/user/profile');
        })
        .catch(err => next(err));
}

exports.togglePrivacy = (req, res, next) => {
    let id = req.session.user;
    User.findById(id)
        .then(user => {
            if (user.private == undefined) {
                user.private = true;
            } else {
                user.private = !user.private;
            }
            user.save()
                .then(() => {
                    req.flash('success', 'Privacy settings have been updated');
                    res.redirect('/user/profile');
                })
        })
        .catch(err => next(err));
}
