const User = require('../models/user');
const Goal = require('../models/goal');

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
    console.log(user);

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
    Promise.all([User.findById(id), Goal.find({creator: id})])
        .then(results => {
            const[user, goals] = results;
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

    User.findByIdAndDelete(id, { useFindAndModify: false })
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

exports.showForm = (req, res) => {
    const activePage = 'profile';
    let id = req.session.user;
    User.findById(id)
        .then(user => {
            res.render("user/inputForm", { user, activePage });
        })
}

exports.inputForm = (req, res) => {
    const activePage = 'profile';
    let id = req.session.user;
    let calIntake = req.body.calorieIntake;
    let calLoss = req.body.calorieLoss
    let weight = req.body.weight;
    
    User.findByIdAndUpdate(id, {$inc: {calorieIntake: calIntake,  calorieLoss: calLoss,  weight: weight}}, { useFindAndModify: false })
    .then(user=>{
        req.flash('success', 'The form has been submitted');
        res.render("user/index", { user, activePage });
    })
    .catch(err => {
        next(err);
    });

}

exports.createGoal = (req, res, next)=>{
    let goal = new Goal(req.body);
    goal.creator = req.session.user;
    goal.save() 
    .then(goal=> {
        req.flash('success', 'You have created a Goal');
        res.redirect('/user/profile');
    })
    .catch(err=>{
        next(err);
    });
}

exports.deleteGoal = (req, res, next)=>{
    let id = req.params.id;
    Goal.findByIdAndDelete(id, { useFindAndModify: false })
    .then(goal=>{
        req.flash('success', 'You have deleted a Goal');
        res.redirect('/user/profile');
    })
    .catch(err=>next(err));
}