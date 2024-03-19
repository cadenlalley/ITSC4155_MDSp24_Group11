exports.isGuest = (req, res, next) => {
	if (req.session.user) {
        // Uncomment when flash messages are setup
		// req.flash('error', 'You are already logged in.');
		return res.redirect('/user/profile');
	}

	return next();
};

// Ensure that the User is Authenticated
exports.isLoggedIn = (req, res, next) => {
	if (!req.session.user) {
        // Uncomment when flash messages are setup
		// req.flash('error', 'You must be logged in to do that.');
		return res.redirect('/user/login');
	}

	return next();
};

