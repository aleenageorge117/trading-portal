const model = require('../models/tradeExchangeModel');
const tradeModel = require('../models/tradeModel');

const mongoose = require('mongoose');

// get trade requests
exports.tradeRequests = (req, res, next) => {
    let userId = req.params.id;

    Promise.all([model.find({userRequesting: userId}).populate(['tradeRequesting', 'tradeRequested']), model.find({userRequested: userId}).populate(['tradeRequesting', 'tradeRequested'])])
    .then(result => {
        const [requestingTrades, requestedTrades] = result;
        if (requestingTrades || requestedTrades) {
            
            res.json({requestingTrades: requestingTrades, requestedTrades: requestedTrades});
        } else {
            let err = new Error('Cannot get Trade exchange requests')
            err.status = 400;
            return next(err)
        }
    })
    .catch(err => {
        
        next(err)});
}

//request trade 
//--> select item to trade --> confirm
exports.requestTrade = (req, res, next) => {

    let saveModel = new model(req.body);
    saveModel.save()
    .then(() => {
        res.status = 200;
        res.json({'response':'success'});
    })
    .catch(err => {
        if(err.name === 'ValidationError') {
            let error = new Error('Error creating request')
            error.status = 400;
            return next(error)
        }
    });
    
}

// approve trade
//--> swap user ids 
// delete exchange
exports.approveTrade = (req, res, next) => {
    let exchangeReqId = req.params.id;

    let requestingTrade = req.body.requestingTrade;
    let requestedTrade = req.body.requestedTrade;
    let requestingUser = req.body.requestingUser;
    let requestedUser = req.body.requestedUser;

    Promise.all([
        tradeModel.update(
            { '_id': requestedTrade },
            { $set: { 'author': requestingUser }}
        ), 
        tradeModel.update(
            { '_id': requestingTrade },
            { $set: { 'author': requestedUser }},
        )
    ])
    .then(status => {
        if(status) {
            model.findByIdAndDelete(exchangeReqId, {useFindAndModify: false})
            .then(status => {
                if(status) {
                    res.status = 200;
                    res.json({'response':'success'});
                } else {
                    let error = new Error('Error Updating')
                    error.status = 400;
                    return next(error)
                }
            })
            .catch(err=> {
                let error = new Error('Error deleting')
                error.status = 400;
                return next(error)
            });
        } else {
            let err = new Error('Cannot find Exchange request');
            err.status = 404;
            return next(err)
        }
    })
    .catch(err=>{
        let error = new Error('Error Updating')
        error.status = 400;
        return next(error)
    });
}


// reject trade
//--> delete exchange
exports.deleteExchange = (req, res, next) => {
    let exchangeReqId = req.params.id;

    model.findByIdAndDelete(exchangeReqId, {useFindAndModify: false})
    .then(status => {
        if(status) {
            res.status = 200;
            res.json({'response':'success'});
        } else {
            let err = new Error('Error finding request')
            err.status = 404;
            return next(err)
        }
    })
    .catch(err=> {
        let error = new Error('Error deleting')
        error.status = 404;
        return next(error)
    });
}