const model = require('../models/tradeExchangeModel');
const tradeModel = require('../models/tradeModel');

const mongoose = require('mongoose');

// get trade requests
exports.tradeRequests = (req, res, next) => {
    let userId = req.params.id;
    if(!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid connection id');
        err.status = 400;
        return next(err);
    }

    Promise.all([model.find({userRequesting: userId}).populate(['tradeRequesting', 'tradeRequested']), model.find({userRequested: userId}).populate(['tradeRequesting', 'tradeRequested'])])
    .then(result => {
        const [requestingTrades, requestedTrades] = result;
        if (requestingTrades || requestedTrades) {
            res.json({requestingTrades: requestingTrades, requestedTrades: requestedTrades});
        } else {
            let err = new Error('Cannot get Trade exchange requests')
            err.status = 404;
            next(err);
        }
    })
    .catch(err => next(err));
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
            error.status = 440;
        }
        return next(error)
    });
    
}

// approve trade
//--> swap user ids 
// delete exchange
exports.approveTrade = (req, res, next) => {
    let exchangeReqId = req.params.id;

    if(!exchangeReqId.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid connection id');
        err.status = 400;
        return next(err);
    }


    let requestingTrade = '';
    let requestedTrade = '';
    let requestingUser = '';
    let requestedUser = '';

    Promise.all([tradeModel.findAndModify(
        {
            '_id': requestedTrade
        },
        [[]],
        {
            $set: {
                'author': requestingUser
            }
        },
        {},
        function (err, object) {
            if (err){
                console.log(err.message);  // returns error if no matching object found
            }else{
                console.log(object);
            }
        }
    ), tradeModel.findAndModify(
        {
            '_id': requestingTrade
        },
        [[]],
        {
            $set: {
                'author': requestedUser
            }
        },
        {},
        function (err, object) {
            if (err){
                console.log(err.message);  // returns error if no matching object found
            }else{
                console.log(object);
            }
        }
    )])
    .then(status => {
        if(status) {
            console.log('updated successfully')
            model.findByIdAndDelete(exchangeReqId, {useFindAndModify: false})
            .then(status => {
                if(status) {
                    console.log('delted')
                    res.status = 200;
                    res.json({'response':'success'});
                } else {
                    let err = new Error('Error Updating')
                    err.status = 404;
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

    if(!exchangeReqId.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid connection id');
        err.status = 400;
        return next(err);
    }

    model.findByIdAndDelete(exchangeReqId, {useFindAndModify: false})
    .then(status => {
        if(status) {
            console.log('delted')
            res.status = 200;
            res.json({'response':'success'});
        } else {
            let err = new Error('Error finding request')
            err.status = 404;
        }
    })
    .catch(err=> {
        let error = new Error('Error deleting')
        error.status = 404;
        return next(error)
    });
}