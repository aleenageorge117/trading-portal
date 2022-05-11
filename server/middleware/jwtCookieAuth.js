const jwt = require('jsonwebtoken');


exports.jwtCookieAuth = (req, res, next) => {
    const token = req.cookies.token;
    if (token != undefined) {
        try {
            const user = jwt.verify(token, 'Aleena');
            return next();
        } catch(err) {
            res.clearCookie('token')
            let error = new Error('Session Expired! You are required to Login')
            error.code = 11300;
            error.status = 440;
            return next(error)
        }
    } else {
        let error = new Error('Log In first!')
        console.log('----->error')

        error.code = 11300;
        error.status = 440;
        console.log(error)

        return next(error)
    }
}