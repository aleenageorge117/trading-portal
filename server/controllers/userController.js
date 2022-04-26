const model = require('../models/userModel');
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

exports.login = (req, res, next)=>{
    console.log('---> controller login')
    let emailId = req.body.emailId;
    let password = req.body.password;
    model.findOne({ emailId: emailId })
    .then(user => {
        if (!user) {
            console.log('Wrong email address');
            let err = new Error('Wrong email address')
            err.status = 404;
        } else {
            user.comparePassword(password)
                .then(result => {
                    if (result) {
                        // req.session.user = user._id;
                        const token = jwt.sign(req.body, 'Aleena', {expiresIn: "1h"})
                        res.cookie("token", token, {
                            httpOnly: true
                        })
                        console.log(req.session)
                        res.status = 200;
                        res.json({ 'response': 'success' });
                    } else {
                        let err = new Error('Password incorrect!')
                        err.status = 404;
                        next(err)
                    }
                });
        }     
    })
    .catch(err => next(err));
};

exports.getUser = () => {
    model.find()
    .then(user => {
        if (user) {
            res.json(user);
        } else {
            let err = new Error('Cannot get user data')
            err.status = 404;
        }
    })
    .catch(err => next(err));
}