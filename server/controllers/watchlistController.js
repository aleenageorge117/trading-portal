const model = require('../models/watchlistModel');
const mongoose = require('mongoose');


//get watchlist for an user 
exports.getWatchList = (req, res, next) => {

    let userId = req.params.id;
    if(!userId.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid connection id');
        err.status = 400;
        return next(err);
    }
    // model.find({author: id}).populate('author')

    model.find({ user: userId }).populate(['user', 'trade'])
    .then(items => {
        console.log(userId)
        if (items)
            res.json(items);
        else {
            let err = new Error('Cannot find watchlist for user.')
            err.status = 404;
            next(err);
        }
    })
    .catch(err => next(err));

}

// create a watchlist
exports.addToWatchList = (req, res, next) => {
    console.log('create watchlist----------->')
    console.log(req)
    let saveModel = new model(req.body);
    saveModel.save()
    .then(status => {
    console.log(status)

        if(status) {
            res.status = 200;
            res.json({'response':'success'});
        } else {
            let err = new Error('Error adding item to watch list');
            err.status = 404;
        }
    })
    .catch(err => next(err));
}

// remove from watch list
exports.deleteFromWatchList = (req, res, next) => {

    let watchListId = req.params.id;
    if(!watchListId.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid connection id');
        err.status = 400;
        return next(err);
    }

    model.findByIdAndDelete(watchListId, {useFindAndModify: false})
    .then(status => {
        if(status) {
            console.log('deleted')
            res.status = 200;
            res.json({'response':'success'});
        } else {
            let err = new Error('Cannot find item in watchlist with id ' + watchListId );
            err.status = 404;
        }
    })
    .catch(err=>next(err));
}