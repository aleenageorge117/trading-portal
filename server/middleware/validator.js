const { body, validationResult } = require('express-validator');

//Check if user is a guest
exports.validateId = (req, res, next) => {
    let id = req.params.id;
    //an objectId is a 24-bit Hex string
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid id');
        err.status = 400;
        return next(err);
    }
    else {
        next();
    }
};

exports.validateLogin = [
    body('emailId', 'Email must be a valid one').isEmail().trim().escape().normalizeEmail(),
    body('password', 'Password must be atleast 6 characters and atmost 64 characters').isLength({min: 6, max: 64})
];

exports.validateSignUp = [
    body('userName', 'Last Name cannot be empty').notEmpty().trim().escape(),
    body('emailId', 'Email must be a valid one').isEmail().trim().escape().normalizeEmail(),
    body('password', 'Password must be atleast 6 characters and atmost 64 characters').isLength({min: 6, max: 64})
];

exports.validateTrade = [
    body('tradeName', 'Trade Name cannot be empty').notEmpty().trim().escape().isLength({min: 6, max: 64}),
    body('tradeDescription', 'Trade Description cannot be empty').notEmpty().trim().escape(),
    body('tag', 'Tag cannot be empty').notEmpty().trim().escape(),
];

exports.validateResult = (req, res, next) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        errors.array().forEach(error => {
            let err = new Error(error.msg);
            err.status = 400;
            return next(err);     
        })
        return next(error);
    } else {
        return next();
    }
}