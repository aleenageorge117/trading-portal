const model = require('../models/tradeModel');
const mongoose = require('mongoose');

exports.tradeList = (req, res, next) => {
    model.find()
    .then(trade => {
        if (trade) {
            let tradesList = {};
            for (let i = 0; i < trade.length; i++) {
                if (tradesList[trade[i].tag] == undefined) {
                    tradesList[trade[i].tag] = [];
                    tradesList[trade[i].tag].push(trade[i])
                }
                else 
                tradesList[trade[i].tag].push(trade[i])      
            }
            res.json(tradesList);
        }

        else {
            let err = new Error('Cannot get Trade list')
            err.status = 404;
            // next(err);
        }
    })
    .catch(err => next(err));
}

exports.trade = (req, res, next) => {
    if(!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid connection id');
        err.status = 400;
        return next(err);
    }
    let id = req.params.id;
    if(!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid connection id');
        err.status = 400;
        return next(err);
    }
    model.findById(id)
    .then(trade => {
        if (trade)
            res.json(trade);
        else {
            let err = new Error('Cannot find Trade with id '+ id )
            err.status = 404;
            next(err);
        }
    })
    .catch(err => next(err));

}

exports.createTrade = (req, res, next) => {
    let saveModel = new model(req.body);
    saveModel.save()
    .then(() => {
        res.status = 200;
        res.json({'response':'success'});
    })
    .catch(err => next(err));
    
}

exports.update = (req, res, next) => {
    if(!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid connection id');
        err.status = 400;
        return next(err);
    }
    model.findByIdAndUpdate(req.params.id, req.body, {useFindAndModify: false, runValidators: true})
    .then(status=>{
        if (status) {
            res.status = 200;
            res.json({'response':'success'});
        } else {
            let err = new Error('Cannot update trade with id ' + id );
            err.status = 404;
        }
    })
    .catch(err => next(err));
}

exports.delete = (req, res, next) => {
    if(!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid connection id');
        err.status = 400;
        return next(err);
    }
    model.findByIdAndDelete(req.params.id, {useFindAndModify: false})
    .then(status => {
        if(status) {
            console.log('delted')
            res.status = 200;
            res.json({'response':'success'});
        } else {
            let err = new Error('Cannot find trade with id ' + id );
            err.status = 404;
        }
    })
    .catch(err=>next(err));
}