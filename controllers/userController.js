const User = require('../models/user');

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
    const { username, firstName, lastName, email, password } = req.body;
    const user = new User({ username, firstName, lastName, email, password });
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
                req.flash('error', 'Wrong Email Address');  
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
                            req.flash('error', 'Wrong Password'); 
                            res.redirect('/user/login');
                        }
                    })
            }

        })
};

exports.showProfile = (req, res) => {
    const activePage = 'profile';

    let id = req.session.user;
    User.findById(id)
        .then(user => {
            res.render("user/index", { user, activePage });
        })     
}

exports.logout = (req, res, next) => {
    req.session.destroy(err => {
        if (err) {
            return next(err);
        }
        req.flash('success', 'You have successfully logged out');
        res.redirect('/');
    });

};

exports.delete = (req, res) => {
    let id = req.params.id;

    User.findByIdAndDelete(id, {useFindAndModify: false})
        .then(user => {
            req.flash('success', 'You have successfully deleted your account');
            res.redirect('/');
        })     
}
