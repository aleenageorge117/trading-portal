const jwt = require('jsonwebtoken');

exports.jwtCookieAuth = (req, res, next) => {
    const token = req.cookie.token;
    try {
        const user = jwt.verify(token, 'Aleena');
        req.user = user;
        return next();
    } catch(err) {
        res.clearCookie('token')
        let error = new Error('Password incorrect!')
        error.status = 404;
        return next(error)
    }
}