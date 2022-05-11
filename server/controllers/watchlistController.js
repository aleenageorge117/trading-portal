const model = require('../models/watchlistModel');
const mongoose = require('mongoose');


//get watchlist for an user 
exports.getWatchList = (req, res, next) => {

    let userId = req.params.id;
    model.find({ user: userId }).populate(['user', 'trade'])
    .then(items => {
        if (items)
            res.json(items);
        else {
            let error = new Error('Cannot find watchlist for user.')
            error.status = 404;
            return next(error)
        }
    })
    .catch(err => next(err));

}

// create a watchlist
exports.addToWatchList = (req, res, next) => {
    let saveModel = new model(req.body);
    saveModel.save()
    .then(status => {
        if(status) {
            res.status = 200;
            res.json({'response':'success'});
        } else {
            let error = new Error('Error adding item to watchlist');
            error.status = 400;
            return next(error)
        }
    })
    .catch(err => next(err));
}

// remove from watch list
exports.deleteFromWatchList = (req, res, next) => {

    let watchListId = req.params.id;

    model.findByIdAndDelete(watchListId, {useFindAndModify: false})
    .then(status => {
        if(status) {
            res.status = 200;
            res.json({'response':'success'});
        } else {
            let error = new Error('Error deleting item from watchlist');
            error.status = 400;
            return next(error)
        }
    })
    .catch(err=>next(err));
}