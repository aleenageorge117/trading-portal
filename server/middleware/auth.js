const Tournament = require('../models/story');

//Check if user is a guest
exports.isGuest = (req, res, next)=>{
    if(!req.session.user){
        return next();
    }
    else{
        req.flash('error', 'you are logged in already');
        return res.redirect('/users/profile');
    }
};

//Check if user is a authenticated
exports.isLoggedIn = (req, res, next)=>{
    if(req.session.user){
        return next();
    }
    else{
        req.flash('error', 'you need to log in first');
        return res.redirect('/users/login');
    }
};

//Check if user is author of the tournament
exports.isAuthor = (req, res, next)=>{
    let id = req.params.id;
    Tournament.findById(id)
    .then(tournament=>{
        if(tournament){
            if(tournament.creator == req.session.user){
                console.log("success");
                next();
            } else{
                let err = new Error('Unauthorized to access the resource');
                err.status = 401;
                return next(err);
            }
        }
    })

};