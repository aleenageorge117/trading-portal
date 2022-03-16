const model = require('../models/tradeModel');

exports.tradeList = (req, res, next) => {
    let trade = model.getTradeList();
    if (trade)
        res.json(trade);
    else {
        let err = new Error('Cannot get Trade list')
        err.status = 404;
        next(err);
    }
}

exports.trade = (req, res, next) => {
    let id = req.params.id;
    let trade = model.findTradeById(id);
    if (trade)
        res.json(trade);
    else {
        let err = new Error('Cannot find Trade with id '+ id )
        err.status = 404;
        next(err);
    }
}

exports.createTrade = (req, res, next) => {
    model.saveTrade(req.body);
    res.status = 200;
    res.json({'response':'success'});
}

exports.update = (req, res, next) => {
    let status = model.updateTrade(req.body);
    console.log('req.body---> ')
    console.log(req.body)
    if (status) {
        res.status = 200;
        res.json({'response':'success'});
    } else{
        let err = new Error('Cannot update trade with id ' + id );
        err.status = 404;
        next(err);
    }

}

exports.delete = (req, res, next) => {
    let status = model.deleteTrade(req.params.id);
    if (status) {
        res.status = 200;
        res.json({'response':'success'});
    } else{
        let err = new Error('Cannot find trade with id ' + id );
        err.status = 404;
        next(err);
    }
}