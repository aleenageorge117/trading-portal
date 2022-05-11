const rateLimit = require('express-rate-limit')

exports.loginLimiter = rateLimit({
	windowMs: 60 * 1000, // 15 minutes
	max: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    // message: 'Too many requests! try again later'
    handler: (request, response, next) => {
        let err = new Error('Too many requests! try again later')
        err.status = 429;
        return next(err)
    }
})