const model = require('../models/userModel');
const tradeModel = require('../models/tradeModel');

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

exports.signUp = (req, res, next) => {
    let user = new model(req.body);
    if(user.emailId)
        user.emailId = user.emailId.toLowerCase();    
    user.save()
    .then(() => {
        res.status = 200;
        res.json({'response':'success'});
    })
    .catch(err => {
        if(err.name === 'ValidationError' ) {
            let error = new Error('Missing information')
            error.status = 400;
            return next(error)
        }
        if(err.code === 11000) {
            let error = new Error('Email has been used.')
            error.status = 400;
            return next(error)
        }
        
    });
}

exports.login = (req, res, next) => {
    let emailId = req.body.emailId;
    if (emailId)
        emailId = emailId.toLowerCase();

    let password = req.body.password;

    model.findOne({ emailId: emailId })
    .then(user => {
        
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
                        let error = new Error('Invalid Password')
                        error.status = 400;
                        return next(error)
                    }
                });
        }     
    })
    .catch(err => next(err));
};

exports.logOut = (req, res, next) => {
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
    if (req.cookies.token != undefined) {
        try {
            const user = jwt.verify(token, 'Aleena');
            return next();
        } catch(err) {
            res.clearCookie('token')

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
