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
            } else {
                user.checkPassword(password)
                    .then((result) => {
                        if (result) {
                            req.session.user = user._id;
                            // Flash Success
                            res.redirect('/');
                        } else {
                            // Flash Error
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
        res.redirect('/');
    });

};

exports.delete = (req, res) => {
    let id = req.params.id;
    //let id = req.session.user._id;
    User.findByIdAndDelete(id, {useFindAndModify: false})
    //User.deleteOne(_id, id)
        .then(user => {
            //let activePage = 'home'
            res.redirect('/');
        })     
}
