
//Check if user is a guest
exports.isGuest = (req, res, next)=>{
    const token = req.cookies.token;

    if(!token) {
        return next();
    }
    else {
        let error = new Error('You are already logged in!')
        error.status = 400;
        return next(error)
    }
};

//Check if user is a authenticated
exports.isLoggedIn = (req, res, next)=>{
    const token = req.cookies.token;

    if(token) {
        return next();
    }
    else {
        res.clearCookie('token')
        let error = new Error('Session Expired! You are required to Login')
        error.code = 11300;
        error.status = 440;
        return next(error)
    }
};