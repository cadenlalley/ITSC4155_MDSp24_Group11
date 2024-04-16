const { body } = require('express-validator');
const { validationResult } = require('express-validator');

//checks whether the id is valid
exports.validateId = (req, res, next) => {
    let id = req.params.id;
    //an objectId is a 24-bit Hex string
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid id');
        err.status = 400;
        return next(err);
    } else {
        return next();
    }
};

exports.validateSignUp = [
    body('username', 'Username cannot be empty').notEmpty().trim().escape(),
    body('email', 'Email must be a valid email address').notEmpty().isEmail().trim().escape().normalizeEmail(),
    body('firstName', 'First name cannot be empty').notEmpty().trim().escape(),
    body('lastName', 'Last name cannot be empty').notEmpty().trim().escape(),
    body('password', 'Password must be at least 8 characters and at most 64 characters').notEmpty().isLength({ min: 8, max: 64 }).trim()
];

exports.validateLogIn = [
    body('username', 'Username cannot be empty').notEmpty().trim().escape(),
    body('password', undefined).notEmpty().withMessage('Password cannot be empty')
        .isLength({ min: 8, max: 64 })
        .withMessage('Password must be at least 8 characters and at most 64 characters').trim()
];

exports.validateResult = (req, res, next) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        errors.array().forEach(error => {
            req.flash('error', error.msg);
        });
        return res.redirect('back');
    } else {
        return next();
    }
}
