const model = require('../models/userModel');
const tradeModel = require('../models/tradeModel');

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

exports.signUp = (req, res, next) => {
    let user = new model(req.body);
    user.save()
    .then(() => {
        res.status = 200;
        res.json({'response':'success'});
    })
    .catch(err => {
        if(err.name === 'ValidationError' ) {
            let err = new Error(err.message)
            err.status = 404;
        }

        if(err.code === 11000) {
            let err = new Error('Email has been used')
            err.status = 404;
        }
        
        next(err);
    });
}

exports.login = (req, res, next) => {
    console.log('---> controller login')
    let emailId = req.body.emailId;
    let password = req.body.password;

    model.findOne({ emailId: emailId })
    .then(user => {
        console.log('user')
        
        console.log(user)
        if (!user) {
            res.status(404).send('Wrong email address');
        } else {
            user.comparePassword(password)
                .then(result => {
                    if (result) {
                        const token = jwt.sign(req.body, 'Aleena', {expiresIn: "1h"})
                        res.cookie("token", token, {
                            httpOnly: true
                        })
                        res.status(200)
                        res.json({'token':token, 'id': user._id, 'name': user.userName, });
                    } else {
                        res.status(401).send('Invalid Password');
                    }
                });
        }     
    })
    .catch(err => next(err));
};

exports.logOut = (req, res, next) => {
    console.log('------------> logout')
    try {
        res.clearCookie('token')
        res.status = 200;
        res.json({ 'response': 'success' });
    } catch (err) {
        let error = new Error('Error Logging out')
        error.status = 440;
        return next(error)
    }
}

exports.isLoggedIn = (req, res, next) => {
    const token = req.cookies.token;
    console.log('------>token')
    if (req.cookies.token != undefined) {
        try {
            const user = jwt.verify(token, 'Aleena');
            return next();
        } catch(err) {
            res.clearCookie('token')
            console.log('------>token'+ token)

            let error = new Error('Session Expired! You are required to Login')
            error.status = 440;
            return next(error)
        }
    } else {
        let error = new Error('Log In first!')
        error.status = 400;
        return next(error)
    }
}

exports.jwtCookieAuth = (req, res, next) => {
    const token = req.cookies.token;
    if (token != undefined) {
        try {
            const user = jwt.verify(token, 'Aleena');
            return next();
        } catch(err) {
            res.clearCookie('token')
            let error = new Error('Session Expired! You are required to Login')
            console.log('----->error')

            error.code = 11300;
            error.status = 440;
            console.log(error)

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

exports.isSessionValid = (req, res, next) => {
    res.status = 200;
    res.json({ 'response': 'success' });
}

exports.getUserTrades = (req, res, next) => {
    let id = req.params.id;

    tradeModel.find({author: id}).populate('author')
    .then(trades => {
        res.status = 200;
        res.json(trades); 
    })
    .catch(err => {
        // err.error(404, 'Error fetching Trades')
        // err.status = 404;
        res.status(404).send('Error fetching Trades');
        next(err)
    });
};
